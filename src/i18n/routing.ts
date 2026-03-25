import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      pl: '/uslugi',
    },
    '/work': {
      en: '/work',
      pl: '/realizacje',
    },
    '/case-studies': {
      en: '/case-studies',
      pl: '/case-studies',
    },
    '/blog': {
      en: '/blog',
      pl: '/blog',
    },
    '/about': {
      en: '/about',
      pl: '/o-nas',
    },
    '/contact': {
      en: '/contact',
      pl: '/kontakt',
    },
    '/privacy': {
      en: '/privacy',
      pl: '/polityka-prywatnosci',
    },
    '/cookies': {
      en: '/cookies',
      pl: '/polityka-cookies',
    },
    '/legal-notice': {
      en: '/legal-notice',
      pl: '/nota-prawna',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
