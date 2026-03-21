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

export const contactFormSchema = z.object({
  name: z.string().trim().min(2),
  email: z.email().trim().toLowerCase(),
  projectType: z
    .string()
    .refine(
      (value): value is (typeof projectTypeValues)[number] =>
        projectTypeValues.includes(value as (typeof projectTypeValues)[number]),
      {
        message: 'Invalid project type',
      },
    ),
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
