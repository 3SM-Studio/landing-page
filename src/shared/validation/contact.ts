import { z } from 'zod';
import { projectTypeValues, type ProjectType } from '@/shared/contact-form.shared';

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{6,20}$/;
const asciiEmailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

const projectTypeSchema = z
  .union([z.literal(''), z.enum(projectTypeValues)])
  .refine((value) => value !== '', {
    message: 'Invalid project type',
  })
  .transform((value) => value as ProjectType);

const optionalLastNameSchema = z
  .string()
  .trim()
  .refine((value) => value === '' || value.length >= 2, {
    message: 'Invalid last name',
  });

const optionalPhoneSchema = z
  .string()
  .trim()
  .refine((value) => value === '' || phoneRegex.test(value), {
    message: 'Invalid phone number',
  });

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { message: 'Invalid email address' })
  .max(254, { message: 'Invalid email address' })
  .refine((value) => asciiEmailRegex.test(value), {
    message: 'Invalid email address',
  });

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: optionalLastNameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
  projectType: projectTypeSchema,
  message: z.string().trim().min(20),
  company: z.string().trim(),
});

export const contactRequestSchema = contactFormSchema.extend({
  locale: z.enum(['pl', 'en']),
});

export type ContactFormValues = z.output<typeof contactFormSchema>;
export type ContactRequestValues = z.output<typeof contactRequestSchema>;
