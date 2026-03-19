import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';

export const routes = {
  home: '/',
  services: '/services',
  portfolio: '/portfolio',
  about: '/about',
  contact: '/contact',
  serviceVideo: '/services/video-production',
  servicePhotography: '/services/photography',
  serviceSocialContent: '/services/social-content',
  serviceWebDesignDevelopment: '/services/web-design-development',
} as const;

function normalizePath(path: string = routes.home): string {
  if (!path) return routes.home;
  if (/^https?:\/\//.test(path)) return path;

  return path.startsWith('/') ? path : `/${path}`;
}

export function localizePath(
  path: string = routes.home,
  locale: Locale = routing.defaultLocale,
): string {
  const normalizedPath = normalizePath(path);

  if (/^https?:\/\//.test(normalizedPath)) {
    return normalizedPath;
  }

  if (locale === routing.defaultLocale) {
    return normalizedPath;
  }

  return normalizedPath === routes.home
    ? `/${locale}`
    : `/${locale}${normalizedPath}`;
}

export function absoluteUrl(
  path: string = routes.home,
  locale?: Locale,
): string {
  const resolvedPath = locale
    ? localizePath(path, locale)
    : normalizePath(path);

  if (/^https?:\/\//.test(resolvedPath)) {
    return resolvedPath;
  }

  return new URL(resolvedPath, `${siteConfig.url}/`).toString();
}

export function getLocaleAlternates(path: string = routes.home) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(path, locale)]),
  ) as Record<Locale, string>;
}
