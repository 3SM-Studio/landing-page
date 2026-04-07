export type ContactFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceKey: string;
  message: string;
  company: string;
};

export type ContactRequestInput = ContactFormInput & {
  locale: 'pl' | 'en';
};
