import { z } from 'zod';

export const projectTypeValues = [
  'video-production',
  'video-editing',
  'photography',
  'graphic-design',
  'web-design',
  'web-development',
  'other',
] as const;

export type ProjectType = (typeof projectTypeValues)[number];

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{6,20}$/;

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

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: optionalLastNameSchema,
  email: z.email().trim().toLowerCase(),
  phone: optionalPhoneSchema,
  projectType: projectTypeSchema,
  message: z.string().trim().min(20),
  company: z.string().trim(),
});

export const contactRequestSchema = contactFormSchema.extend({
  locale: z.enum(['pl', 'en']),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;

export type ContactRequestInput = z.input<typeof contactRequestSchema>;
export type ContactRequestValues = z.output<typeof contactRequestSchema>;
