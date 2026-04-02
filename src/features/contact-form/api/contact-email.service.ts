import { Resend } from 'resend';
import type { Locale } from '@/shared/i18n/routing';
import { brandConfig } from '@/shared/config/brand/brand.config';
import { hasResendEnv, serverEnv } from '@/shared/env/env.server';
import type { ContactRequestValues } from '@/shared/validation/contact';

function getResendClient() {
  if (!hasResendEnv() || !serverEnv.RESEND_API_KEY) {
    throw new Error('Missing Resend environment variables');
  }

  return new Resend(serverEnv.RESEND_API_KEY);
}

function getProjectTypeLabel(projectType: ContactRequestValues['projectType'], locale: Locale) {
  const labels = {
    pl: {
      'video-production': 'Produkcja wideo',
      'video-editing': 'Montaż wideo',
      photography: 'Fotografia',
      'graphic-design': 'Projektowanie graficzne',
      'web-design': 'Projektowanie stron',
      'web-development': 'Tworzenie stron',
      other: 'Inny projekt',
    },
    en: {
      'video-production': 'Video Production',
      'video-editing': 'Video Editing',
      photography: 'Photography',
      'graphic-design': 'Graphic Design',
      'web-design': 'Web Design',
      'web-development': 'Web Development',
      other: 'Other Project',
    },
  } as const;

  return labels[locale][projectType];
}

function getFullName(data: ContactRequestValues) {
  return `${data.firstName} ${data.lastName}`.trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendInternalContactEmail(data: ContactRequestValues, locale: Locale) {
  const resend = getResendClient();
  const to = serverEnv.CONTACT_TO_EMAIL;
  const fromEmail = serverEnv.CONTACT_FROM_EMAIL;

  if (!to || !fromEmail) {
    throw new Error('Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL');
  }

  const from = `${brandConfig.emailSignature} <${fromEmail}>`;
  const projectType = getProjectTypeLabel(data.projectType, locale);
  const fullName = getFullName(data);

  const subject =
    locale === 'pl'
      ? `Nowe zgłoszenie z formularza - ${fullName}`
      : `New contact form submission - ${fullName}`;

  const text =
    locale === 'pl'
      ? [
          'Nowe zgłoszenie z formularza',
          '',
          `Imię: ${data.firstName}`,
          `Nazwisko: ${data.lastName}`,
          `E-mail: ${data.email}`,
          `Telefon: ${data.phone}`,
          `Rodzaj projektu: ${projectType}`,
          '',
          'Wiadomość:',
          data.message,
        ].join('\n')
      : [
          'New contact form submission',
          '',
          `First name: ${data.firstName}`,
          `Last name: ${data.lastName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Project type: ${projectType}`,
          '',
          'Message:',
          data.message,
        ].join('\n');

  const html =
    locale === 'pl'
      ? `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Nowe zgłoszenie z formularza</h2>
          <p><strong>Imię:</strong> ${escapeHtml(data.firstName)}</p>
          <p><strong>Nazwisko:</strong> ${escapeHtml(data.lastName)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>Rodzaj projektu:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Wiadomość:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New contact form submission</h2>
          <p><strong>First name:</strong> ${escapeHtml(data.firstName)}</p>
          <p><strong>Last name:</strong> ${escapeHtml(data.lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `;

  const { data: result, error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || 'Failed to send internal contact email');
  }

  return result;
}

export async function sendContactConfirmationEmail(data: ContactRequestValues, locale: Locale) {
  const resend = getResendClient();
  const fromEmail = serverEnv.CONTACT_FROM_EMAIL;
  const replyTo = serverEnv.CONTACT_TO_EMAIL;

  if (!fromEmail || !replyTo) {
    throw new Error('Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL');
  }

  const from = `${brandConfig.emailSignature} <${fromEmail}>`;

  const subject =
    locale === 'pl'
      ? `Otrzymaliśmy Twoją wiadomość - ${brandConfig.name}`
      : `We received your message - ${brandConfig.name}`;

  const text =
    locale === 'pl'
      ? [
          `Cześć ${data.firstName},`,
          '',
          'Otrzymaliśmy Twoją wiadomość i odezwiemy się tak szybko, jak to możliwe.',
          'Najczęściej odpowiadamy w ciągu 24-48 godzin.',
          '',
          brandConfig.emailSignature,
        ].join('\n')
      : [
          `Hi ${data.firstName},`,
          '',
          'We received your message and will get back to you as soon as possible.',
          'We usually reply within 24-48 hours.',
          '',
          brandConfig.emailSignature,
        ].join('\n');

  const html =
    locale === 'pl'
      ? `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Otrzymaliśmy Twoją wiadomość</h2>
          <p>Cześć ${escapeHtml(data.firstName)},</p>
          <p>Otrzymaliśmy Twoją wiadomość i odezwiemy się tak szybko, jak to możliwe.</p>
          <p>Najczęściej odpowiadamy w ciągu 24-48 godzin.</p>
          <p><strong>${brandConfig.emailSignature}</strong></p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>We received your message</h2>
          <p>Hi ${escapeHtml(data.firstName)},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
          <p>We usually reply within 24-48 hours.</p>
          <p><strong>${brandConfig.emailSignature}</strong></p>
        </div>
      `;

  const { data: result, error } = await resend.emails.send({
    from,
    to: data.email,
    replyTo,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || 'Failed to send confirmation email');
  }

  return result;
}
