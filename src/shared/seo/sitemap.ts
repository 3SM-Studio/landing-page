import type { MetadataRoute } from 'next';
import { publicSiteConfig } from '@/shared/config/site/site-config.public';
import { routing, type AppPathname, type Locale } from '@/shared/i18n/routing';

export type SitemapTranslation = {
  language?: Locale;
  slug?: string;
};

export type SitemapItem = {
  _id: string;
  translations?: SitemapTranslation[];
};

function getSiteUrl() {
  return publicSiteConfig.url.replace(/\/$/, '');
}

export function getStaticPathnames(): AppPathname[] {
  return (Object.keys(routing.pathnames) as AppPathname[]).filter(
    (pathname) => !pathname.includes('['),
  );
}

export function getLocalizedUrl(
  pathname: AppPathname,
  locale: Locale,
  params?: Record<string, string>,
) {
  const localized = routing.pathnames[pathname];

  const routePath =
    typeof localized === 'string'
      ? localized
      : (localized[locale] ?? localized[routing.defaultLocale]);

  let path: string = routePath;

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`[${key}]`, value);
    }
  }

  const prefix = `/${locale}`;

  return `${getSiteUrl()}${prefix}${path === '/' ? '' : path}`;
}

export function createAlternatesEntry(
  pathname: AppPathname,
  locales: readonly Locale[],
  paramsByLocale?: Partial<Record<Locale, Record<string, string>>>,
): MetadataRoute.Sitemap {
  const localeLanguages = Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedUrl(pathname, locale, paramsByLocale?.[locale])]),
  ) as Record<Locale, string>;

  const languages: Record<string, string> = {
    ...localeLanguages,
    'x-default': localeLanguages[routing.defaultLocale],
  };

  return locales.map((locale) => ({
    url: localeLanguages[locale],
    alternates: {
      languages,
    },
  }));
}

export function normalizeTranslationGroup(item: SitemapItem) {
  const uniqueByLanguage = new Map<Locale, { slug: string }>();

  for (const translation of item.translations ?? []) {
    if (!translation.language || !translation.slug) {
      continue;
    }

    if (uniqueByLanguage.has(translation.language)) {
      continue;
    }

    uniqueByLanguage.set(translation.language, { slug: translation.slug });
  }

  const locales = [...uniqueByLanguage.keys()].sort();

  const paramsByLocale = Object.fromEntries(
    [...uniqueByLanguage.entries()].map(([locale, value]) => [locale, { slug: value.slug }]),
  ) as Partial<Record<Locale, Record<string, string>>>;

  const groupKey = locales
    .map((locale) => `${locale}:${paramsByLocale[locale]?.slug ?? ''}`)
    .join('|');

  return {
    locales,
    paramsByLocale,
    groupKey,
  };
}

export function buildDynamicSitemapEntries(
  items: SitemapItem[],
  pathname: '/blog/[slug]' | '/case-studies/[slug]' | '/services/[slug]',
  seen: Set<string>,
) {
  return items.flatMap((item) => {
    const { locales, paramsByLocale, groupKey } = normalizeTranslationGroup(item);

    if (!groupKey || locales.length === 0 || seen.has(`${pathname}:${groupKey}`)) {
      return [];
    }

    seen.add(`${pathname}:${groupKey}`);

    return createAlternatesEntry(pathname, locales, paramsByLocale);
  });
}
