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

export type ContactFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: ProjectType | '';
  message: string;
  company: string;
};

export type ContactRequestInput = ContactFormInput & {
  locale: 'pl' | 'en';
};
