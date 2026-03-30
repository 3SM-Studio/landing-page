import type { MetadataRoute } from 'next';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import { client } from '@/sanity/client';
import {
  BLOG_SITEMAP_QUERY,
  CASE_STUDY_SITEMAP_QUERY,
  WORK_PROJECT_SITEMAP_QUERY,
} from '@/sanity/queries';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

type SanityTranslation = {
  language?: Locale;
  slug?: string;
};

type SanitySitemapItem = {
  _id: string;
  translations?: SanityTranslation[];
};

function getStaticPathnames(): AppPathname[] {
  return (Object.keys(routing.pathnames) as AppPathname[]).filter(
    (pathname) => !pathname.includes('['),
  );
}

function getLocalizedUrl(pathname: AppPathname, locale: Locale, params?: Record<string, string>) {
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

  const prefix =
    locale === routing.defaultLocale && routing.localePrefix === 'as-needed' ? '' : `/${locale}`;

  return `${SITE_URL}${prefix}${path === '/' ? '' : path}`;
}

function createAlternatesEntry(
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

function normalizeTranslationGroup(item: SanitySitemapItem) {
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = getStaticPathnames().flatMap((pathname) =>
    createAlternatesEntry(pathname, routing.locales),
  );

  const [blogItems, caseStudyItems, workItems] = await Promise.all([
    client.fetch<SanitySitemapItem[]>(BLOG_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch<SanitySitemapItem[]>(CASE_STUDY_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch<SanitySitemapItem[]>(
      WORK_PROJECT_SITEMAP_QUERY,
      {},
      { next: { revalidate: 300 } },
    ),
  ]);

  const seen = new Set<string>();

  const buildEntries = (
    items: SanitySitemapItem[],
    pathname: '/blog/[slug]' | '/case-studies/[slug]' | '/work/[slug]',
  ) =>
    items.flatMap((item) => {
      const { locales, paramsByLocale, groupKey } = normalizeTranslationGroup(item);

      if (!groupKey || locales.length === 0 || seen.has(`${pathname}:${groupKey}`)) {
        return [];
      }

      seen.add(`${pathname}:${groupKey}`);

      return createAlternatesEntry(pathname, locales, paramsByLocale);
    });

  return [
    ...staticEntries,
    ...buildEntries(blogItems, '/blog/[slug]'),
    ...buildEntries(caseStudyItems, '/case-studies/[slug]'),
    ...buildEntries(workItems, '/work/[slug]'),
  ];
}
