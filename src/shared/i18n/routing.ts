import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/team/[slug]': {
      en: '/team/[slug]',
      pl: '/zespol/[slug]',
    },
    '/services': {
      en: '/services',
      pl: '/uslugi',
    },
    '/services/[slug]': {
      en: '/services/[slug]',
      pl: '/uslugi/[slug]',
    },
    '/case-studies': {
      en: '/case-studies',
      pl: '/realizacje',
    },
    '/case-studies/[slug]': {
      en: '/case-studies/[slug]',
      pl: '/realizacje/[slug]',
    },
    '/blog': {
      en: '/blog',
      pl: '/blog',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      pl: '/blog/[slug]',
    },
    '/clients': {
      en: '/clients',
      pl: '/klienci',
    },
    '/clients/[slug]': {
      en: '/clients/[slug]',
      pl: '/klienci/[slug]',
    },
    '/partners': {
      en: '/partners',
      pl: '/partnerzy',
    },
    '/partners/[slug]': {
      en: '/partners/[slug]',
      pl: '/partnerzy/[slug]',
    },
    '/links': {
      pl: '/linki',
      en: '/links',
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
