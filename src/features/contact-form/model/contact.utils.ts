import type { Locale } from '@/shared/i18n/routing';
import type { ContactFormInput } from '@/features/contact-form/model/contact-form.shared';
import { OTHER_SERVICE_KEY } from './contact.constants';
import type { ContactPayload, ServiceOption } from './contact.types';

function getOtherServiceLabel(locale: Locale) {
  return locale === 'pl' ? 'Inne' : 'Other';
}

export function buildServiceOptions(services: ServiceOption[], locale: Locale) {
  return [
    ...services.map((service) => ({
      value: service.serviceKey,
      label: service.title,
    })),
    {
      value: OTHER_SERVICE_KEY,
      label: getOtherServiceLabel(locale),
    },
  ];
}

export function normalizeContactPayload(values: ContactFormInput, locale: Locale): ContactPayload {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    serviceKey: values.serviceKey.trim(),
    message: values.message.trim(),
    company: values.company.trim(),
    locale,
  };
}
