import { Resend } from 'resend';
import { getContactEnabledServices } from '@/entities/service/api/service.repository';
import { brandConfig } from '@/shared/config/brand/brand.config';
import { hasResendEnv, serverEnv } from '@/shared/env/env.server';
import type { Locale } from '@/shared/i18n/routing';
import type { ContactRequestValues } from '@/shared/validation/contact';
import { OTHER_SERVICE_KEY } from '@/features/contact-form/model/contact.constants';

function getResendClient() {
  if (!hasResendEnv() || !serverEnv.RESEND_API_KEY) {
    throw new Error('Missing Resend environment variables');
  }

  return new Resend(serverEnv.RESEND_API_KEY);
}

async function getServiceLabel(serviceKey: ContactRequestValues['serviceKey'], locale: Locale) {
  if (serviceKey === OTHER_SERVICE_KEY) {
    return locale === 'pl' ? 'Inne' : 'Other';
  }

  const services = await getContactEnabledServices(locale);
  const service = services.find((item) => item.serviceKey === serviceKey);

  if (!service) {
    throw new Error(`Service not found for key "${serviceKey}" and locale "${locale}"`);
  }

  return service.title;
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
  const serviceLabel = await getServiceLabel(data.serviceKey, locale);
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
          `Rodzaj projektu: ${serviceLabel}`,
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
          `Project type: ${serviceLabel}`,
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
          <p><strong>Rodzaj projektu:</strong> ${escapeHtml(serviceLabel)}</p>
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
          <p><strong>Project type:</strong> ${escapeHtml(serviceLabel)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `;

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

export async function sendContactConfirmationEmail(data: ContactRequestValues, locale: Locale) {
  const resend = getResendClient();
  const fromEmail = serverEnv.CONTACT_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error('Missing CONTACT_FROM_EMAIL');
  }

  const from = `${brandConfig.emailSignature} <${fromEmail}>`;
  const fullName = getFullName(data);
  const subject = locale === 'pl' ? 'Potwierdzenie otrzymania wiadomości' : 'Message received';

  const text =
    locale === 'pl'
      ? [
          `Cześć ${fullName},`,
          '',
          'dziękujemy za wiadomość. Otrzymaliśmy Twoje zgłoszenie i wrócimy z odpowiedzią tak szybko, jak to możliwe.',
          '',
          `${brandConfig.name}`,
        ].join('\n')
      : [
          `Hi ${fullName},`,
          '',
          'thank you for your message. We have received your inquiry and will get back to you as soon as possible.',
          '',
          `${brandConfig.name}`,
        ].join('\n');

  const html =
    locale === 'pl'
      ? `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <p>Cześć ${escapeHtml(fullName)},</p>
          <p>dziękujemy za wiadomość. Otrzymaliśmy Twoje zgłoszenie i wrócimy z odpowiedzią tak szybko, jak to możliwe.</p>
          <p>${escapeHtml(brandConfig.name)}</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <p>Hi ${escapeHtml(fullName)},</p>
          <p>thank you for your message. We have received your inquiry and will get back to you as soon as possible.</p>
          <p>${escapeHtml(brandConfig.name)}</p>
        </div>
      `;

  await resend.emails.send({
    from,
    to: data.email,
    subject,
    text,
    html,
  });
}
