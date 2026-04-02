import type { Locale } from '@/shared/i18n/routing';
import {
  projectTypeValues,
  type ContactFormInput,
} from '@/features/contact-form/model/contact-form.shared';
import type { ContactPayload, ProjectOption } from './contact.types';

export function buildProjectOptions(
  labels: Record<(typeof projectTypeValues)[number], string>,
): ProjectOption[] {
  return projectTypeValues.map((value) => ({
    value,
    label: labels[value],
  }));
}

export function normalizeContactPayload(values: ContactFormInput, locale: Locale): ContactPayload {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    projectType: values.projectType,
    message: values.message.trim(),
    company: values.company.trim(),
    locale,
  };
}
