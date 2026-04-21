import { routing, type AppPathname, type Locale } from '@/shared/i18n/routing';
import { publicSiteConfig } from '@/shared/config/site/site-config.public';

export const routes = {
  home: '/',
  teamDetail: '/team/[slug]',
  services: '/services',
  serviceDetail: '/services/[slug]',
  caseStudies: '/case-studies',
  caseStudyDetail: '/case-studies/[slug]',
  blog: '/blog',
  blogDetail: '/blog/[slug]',
  clients: '/clients',
  clientDetail: '/clients/[slug]',
  partners: '/partners',
  partnerDetail: '/partners/[slug]',
  about: '/about',
  links: '/links',
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

const staticCmsPathnames = new Set<AppPathname>([
  routes.home,
  routes.services,
  routes.caseStudies,
  routes.blog,
  routes.clients,
  routes.partners,
  routes.about,
  routes.contact,
  routes.privacy,
  routes.cookies,
  routes.legalNotice,
]);

export function isStaticCmsPathname(value: string): value is AppPathname {
  return staticCmsPathnames.has(value as AppPathname);
}

export function isExternalHref(value: string) {
  return (
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    /^https?:\/\//.test(value) ||
    value.startsWith('//')
  );
}

export function resolveCmsHref(
  href: string | undefined,
  locale: Locale,
  fallbackHref: AppPathname,
) {
  const value = href?.trim();

  if (!value) {
    return getLocalizedPathname(fallbackHref, locale);
  }

  if (isExternalHref(value)) {
    return value;
  }

  if (value.startsWith(`/${locale}/`) || value === `/${locale}`) {
    return value;
  }

  if (isStaticCmsPathname(value)) {
    return getLocalizedPathname(value, locale);
  }

  return value;
}
