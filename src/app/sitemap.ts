import type { MetadataRoute } from 'next';
import { routing, type AppPathname, type Locale } from '@/i18n/routing';
import { blogPosts, getBlogPostAvailableLocales } from '@/lib/data/blog-posts';
import { caseStudies, getCaseStudyAvailableLocales } from '@/lib/data/case-studies';
import { getWorkAvailableLocales, selectedWorks } from '@/lib/data/work-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedUrl(pathname, locale, paramsByLocale?.[locale])]),
  ) as Record<string, string>;

  return locales.map((locale) => ({
    url: languages[locale],
    alternates: {
      languages,
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = getStaticPathnames().flatMap((pathname) =>
    createAlternatesEntry(pathname, routing.locales),
  );

  const blogEntries = blogPosts.flatMap((post) => {
    const locales = getBlogPostAvailableLocales(post);

    return createAlternatesEntry('/blog/[slug]', locales, {
      pl: { slug: post.slug.pl },
      en: post.slug.en ? { slug: post.slug.en } : undefined,
    });
  });

  const caseStudyEntries = caseStudies.flatMap((item) => {
    const locales = getCaseStudyAvailableLocales(item);

    return createAlternatesEntry('/case-studies/[slug]', locales, {
      pl: { slug: item.slug.pl },
      en: item.slug.en ? { slug: item.slug.en } : undefined,
    });
  });

  const workEntries = selectedWorks.flatMap((item) => {
    const locales = getWorkAvailableLocales(item);

    return createAlternatesEntry('/work/[slug]', locales, {
      pl: { slug: item.slug.pl },
      en: item.slug.en ? { slug: item.slug.en } : undefined,
    });
  });

  return [...staticEntries, ...blogEntries, ...caseStudyEntries, ...workEntries];
}
