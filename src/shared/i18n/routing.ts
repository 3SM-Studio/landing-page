import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      pl: '/uslugi',
    },
    '/services/[slug]': {
      en: '/services/[slug]',
      pl: '/uslugi/[slug]',
    },
    '/work': {
      en: '/work',
      pl: '/realizacje',
    },
    '/work/[slug]': {
      en: '/work/[slug]',
      pl: '/realizacje/[slug]',
    },
    '/case-studies': {
      en: '/case-studies',
      pl: '/case-studies',
    },
    '/case-studies/[slug]': {
      en: '/case-studies/[slug]',
      pl: '/case-studies/[slug]',
    },
    '/blog': {
      en: '/blog',
      pl: '/blog',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      pl: '/blog/[slug]',
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
