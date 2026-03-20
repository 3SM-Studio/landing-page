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

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Podaj imię i nazwisko.')
    .max(100, 'Imię i nazwisko jest za długie.'),
  email: z
    .string()
    .trim()
    .email('Podaj poprawny adres e-mail.')
    .max(200, 'Adres e-mail jest za długi.'),
  projectType: z.enum(projectTypeValues, {
    message: 'Wybierz rodzaj projektu.',
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Wiadomość musi mieć co najmniej 20 znaków.')
    .max(5000, 'Wiadomość jest za długa.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
