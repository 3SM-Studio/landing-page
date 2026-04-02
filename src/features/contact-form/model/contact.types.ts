import type { Locale } from '@/shared/i18n/routing';
import type { ContactFormInput } from '@/features/contact-form/model/contact-form.shared';

export type ContactPageViewProps = {
  locale: Locale;
};

export type ContactFormResponse = {
  ok: boolean;
  message?: string;
};

export type ContactFormStatus = {
  type: 'idle' | 'success' | 'error';
  message: string;
};

export type ContactPayload = ContactFormInput & {
  locale: Locale;
};

export type ProjectOption = {
  value: ContactFormInput['projectType'];
  label: string;
};
