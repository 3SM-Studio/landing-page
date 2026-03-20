import { Resend } from 'resend';
import type { ContactFormValues } from '@/lib/validation/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

function getProjectTypeLabel(projectType: ContactFormValues['projectType']) {
  const labels: Record<ContactFormValues['projectType'], string> = {
    'video-production': 'Video Production',
    'video-editing': 'Video Editing',
    photography: 'Photography',
    'graphic-design': 'Graphic Design',
    'web-design': 'Web Design',
    'web-development': 'Web Development',
    other: 'Other',
  };

  return labels[projectType];
}

export async function sendInternalContactEmail(data: ContactFormValues) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    throw new Error('Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL');
  }

  const projectType = getProjectTypeLabel(data.projectType);

  const { data: result, error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New contact form submission - ${data.name}`,
    text: [
      'New contact form submission',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Project type: ${projectType}`,
      '',
      'Message:',
      data.message,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message || 'Failed to send internal contact email');
  }

  return result;
}

export async function sendContactConfirmationEmail(data: ContactFormValues) {
  const from = process.env.CONTACT_FROM_EMAIL;
  const replyTo = process.env.CONTACT_TO_EMAIL;

  if (!from || !replyTo) {
    throw new Error('Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL');
  }

  const { data: result, error } = await resend.emails.send({
    from,
    to: data.email,
    replyTo,
    subject: 'We received your message - 3SM Studio',
    text: [
      `Hi ${data.name},`,
      '',
      'We received your message and will get back to you as soon as possible.',
      'Usually we reply within 24-48 hours.',
      '',
      '3SM Studio',
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>We received your message</h2>
        <p>Hi ${escapeHtml(data.name)},</p>
        <p>We received your message and will get back to you as soon as possible.</p>
        <p>Usually we reply within 24-48 hours.</p>
        <p><strong>3SM Studio</strong></p>
      </div>
    `,
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
