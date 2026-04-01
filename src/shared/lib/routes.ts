import { routing, type AppPathname, type Locale } from '@/shared/i18n/routing';
import { publicSiteConfig } from '@/shared/config/site/site-config.public';

export const routes = {
  home: '/',
  services: '/services',
  work: '/work',
  caseStudies: '/case-studies',
  blog: '/blog',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  cookies: '/cookies',
  legalNotice: '/legal-notice',
} as const satisfies Record<string, AppPathname>;

function withLocalePrefix(pathname: string, locale: Locale) {
  const isDefaultLocale = locale === routing.defaultLocale;
  const shouldHidePrefix = routing.localePrefix === 'as-needed' && isDefaultLocale;

  if (shouldHidePrefix) {
    return pathname;
  }

  if (pathname === '/') {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

export function getLocalizedPathname(pathname: AppPathname, locale: Locale) {
  const localizedEntry = routing.pathnames[pathname];

  if (typeof localizedEntry === 'string') {
    return withLocalePrefix(localizedEntry, locale);
  }

  return withLocalePrefix(localizedEntry[locale], locale);
}

export function absoluteUrl(pathname: string, baseUrl = publicSiteConfig.url) {
  return new URL(pathname, baseUrl).toString();
}

export function getLocaleAlternates(pathname: AppPathname, baseUrl = publicSiteConfig.url) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteUrl(getLocalizedPathname(pathname, locale), baseUrl),
    ]),
  ) as Record<Locale, string>;
}
