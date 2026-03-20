import { Resend } from 'resend';
import type { Locale } from '@/i18n/routing';
import type { ContactFormValues } from '@/lib/validation/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

function getProjectTypeLabel(
  projectType: ContactFormValues['projectType'],
  locale: Locale,
) {
  const labels = {
    pl: {
      'video-production': 'Produkcja video',
      'video-editing': 'Montaż video',
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

export async function sendInternalContactEmail(
  data: ContactFormValues,
  locale: Locale,
) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    throw new Error('Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL');
  }

  const projectType = getProjectTypeLabel(data.projectType, locale);
  const subject =
    locale === 'pl'
      ? `Nowe zgłoszenie z formularza - ${data.name}`
      : `New contact form submission - ${data.name}`;

  const text =
    locale === 'pl'
      ? [
          'Nowe zgłoszenie z formularza',
          '',
          `Imię i nazwisko: ${data.name}`,
          `E-mail: ${data.email}`,
          `Rodzaj projektu: ${projectType}`,
          '',
          'Wiadomość:',
          data.message,
        ].join('\n')
      : [
          'New contact form submission',
          '',
          `Name: ${data.name}`,
          `Email: ${data.email}`,
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
          <p><strong>Imię i nazwisko:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Rodzaj projektu:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Wiadomość:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
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

export async function sendContactConfirmationEmail(
  data: ContactFormValues,
  locale: Locale,
) {
  const from = process.env.CONTACT_FROM_EMAIL;
  const replyTo = process.env.CONTACT_TO_EMAIL;

  if (!from || !replyTo) {
    throw new Error('Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL');
  }

  const subject =
    locale === 'pl'
      ? 'Otrzymaliśmy Twoją wiadomość - 3SM Studio'
      : 'We received your message - 3SM Studio';

  const text =
    locale === 'pl'
      ? [
          `Cześć ${data.name},`,
          '',
          'Otrzymaliśmy Twoją wiadomość i odezwiemy się tak szybko, jak to możliwe.',
          'Najczęściej odpowiadamy w ciągu 24-48 godzin.',
          '',
          '3SM Studio',
        ].join('\n')
      : [
          `Hi ${data.name},`,
          '',
          'We received your message and will get back to you as soon as possible.',
          'We usually reply within 24-48 hours.',
          '',
          '3SM Studio',
        ].join('\n');

  const html =
    locale === 'pl'
      ? `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Otrzymaliśmy Twoją wiadomość</h2>
          <p>Cześć ${escapeHtml(data.name)},</p>
          <p>Otrzymaliśmy Twoją wiadomość i odezwiemy się tak szybko, jak to możliwe.</p>
          <p>Najczęściej odpowiadamy w ciągu 24-48 godzin.</p>
          <p><strong>3SM Studio</strong></p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>We received your message</h2>
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>We received your message and will get back to you as soon as possible.</p>
          <p>We usually reply within 24-48 hours.</p>
          <p><strong>3SM Studio</strong></p>
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

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
