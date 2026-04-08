import { routing, type AppPathname, type Locale } from '@/shared/i18n/routing';
import { publicSiteConfig } from '@/shared/config/site/site-config.public';

export const routes = {
  home: '/',
  services: '/services',
  caseStudies: '/case-studies',
  blog: '/blog',
  clients: '/clients',
  partners: '/partners',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  cookies: '/cookies',
  legalNotice: '/legal-notice',
} as const satisfies Record<string, AppPathname>;

function withLocalePrefix(pathname: string, locale: Locale) {
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

export function getLocalizedDynamicPathname(
  pathname: AppPathname,
  locale: Locale,
  params: Record<string, string>,
) {
  const localizedPathname = getLocalizedPathname(pathname, locale);

  return Object.entries(params).reduce((resolvedPathname, [key, value]) => {
    return resolvedPathname.replace(`[${key}]`, encodeURIComponent(value));
  }, localizedPathname);
}

export function getDynamicLocaleAlternates(
  pathname: AppPathname,
  params: Record<string, string>,
  baseUrl = publicSiteConfig.url,
) {
  return Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteUrl(getLocalizedDynamicPathname(pathname, locale, params), baseUrl),
    ]),
  ) as Record<Locale, string>;
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
