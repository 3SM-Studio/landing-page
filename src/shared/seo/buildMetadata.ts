import type { Metadata } from 'next';
import type { AppPathname, Locale } from '@/shared/i18n/routing';
import { routing } from '@/shared/i18n/routing';
import {
  absoluteUrl,
  getLocaleAlternates,
  getLocalizedPathname,
  routes,
} from '@/shared/lib/routes';
import { getSiteMetadata, publicSiteConfig } from '@/shared/config/site/site-config.public';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';

type RoutePath = (typeof routes)[keyof typeof routes];

type BuildMetadataInput = {
  locale: Locale;
  title?: string;
  description?: string;
  canonical?: RoutePath | string;
  alternateLanguages?: Record<Locale, string>;
  noIndex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  keywords?: string[];
  openGraphType?: 'website' | 'article';
  useTitleTemplate?: boolean;
};

function uniqueKeywords(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function getAlternateOpenGraphLocales(locale: Locale) {
  return routing.locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => getSiteMetadata(candidate).locale);
}

function isAppPathname(value: string): value is AppPathname {
  return value in routing.pathnames;
}

function resolveCanonicalPath(locale: Locale, canonical: RoutePath | string) {
  if (isAppPathname(canonical)) {
    return getLocalizedPathname(canonical, locale);
  }

  return canonical;
}

function resolveAlternateLanguages(
  locale: Locale,
  canonical: RoutePath | string,
  alternateLanguages: Record<Locale, string> | undefined,
  canonicalBaseUrl: string,
) {
  if (alternateLanguages) {
    return alternateLanguages;
  }

  if (isAppPathname(canonical)) {
    return getLocaleAlternates(canonical, canonicalBaseUrl);
  }

  const localizedCanonical = resolveCanonicalPath(locale, canonical);

  return {
    [locale]: absoluteUrl(localizedCanonical, canonicalBaseUrl),
  } as Record<Locale, string>;
}

export function buildMetadata({
  locale,
  title,
  description,
  canonical = routes.home,
  alternateLanguages,
  noIndex = !serverSiteConfig.shouldIndex,
  ogImage,
  ogImageAlt,
  twitterImage,
  twitterImageAlt,
  keywords,
  openGraphType = 'website',
  useTitleTemplate = false,
}: BuildMetadataInput): Metadata {
  const localizedMetadata = getSiteMetadata(locale);

  const defaultTitle = localizedMetadata.title;
  const documentTitle = title ?? defaultTitle;
  const socialTitle = title ? `${title} | ${publicSiteConfig.name}` : defaultTitle;
  const resolvedDescription = description ?? localizedMetadata.description;

  const canonicalBaseUrl = serverSiteConfig.productionUrl;
  const assetBaseUrl = serverSiteConfig.url;

  const canonicalPath = resolveCanonicalPath(locale, canonical);
  const resolvedCanonical = absoluteUrl(canonicalPath, canonicalBaseUrl);
  const resolvedAlternates = resolveAlternateLanguages(
    locale,
    canonical,
    alternateLanguages,
    canonicalBaseUrl,
  );

  const resolvedOgImageAlt = ogImageAlt ?? localizedMetadata.ogImageAlt;
  const resolvedTwitterImageAlt = twitterImageAlt ?? localizedMetadata.twitterImageAlt;

  const resolvedKeywords = uniqueKeywords([...localizedMetadata.keywords, ...(keywords ?? [])]);

  const openGraphImages = ogImage
    ? [
        {
          url: absoluteUrl(ogImage, assetBaseUrl),
          width: 1200,
          height: 630,
          alt: resolvedOgImageAlt,
        },
      ]
    : undefined;

  const twitterImages = twitterImage
    ? [
        {
          url: absoluteUrl(twitterImage, assetBaseUrl),
          alt: resolvedTwitterImageAlt,
        },
      ]
    : undefined;

  return {
    metadataBase: new URL(assetBaseUrl),
    title: useTitleTemplate
      ? {
          default: defaultTitle,
          template: `%s | ${publicSiteConfig.name}`,
        }
      : documentTitle,
    description: resolvedDescription,
    applicationName: publicSiteConfig.name,
    authors: [{ name: publicSiteConfig.name }],
    creator: publicSiteConfig.name,
    publisher: publicSiteConfig.name,
    category: 'creative studio',
    keywords: resolvedKeywords,
    alternates: {
      canonical: resolvedCanonical,
      languages: resolvedAlternates,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: openGraphType,
      locale: localizedMetadata.locale,
      alternateLocale: getAlternateOpenGraphLocales(locale),
      url: resolvedCanonical,
      siteName: publicSiteConfig.name,
      title: socialTitle,
      description: resolvedDescription,
      images: openGraphImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: resolvedDescription,
      creator: publicSiteConfig.creator,
      site: publicSiteConfig.creator,
      images: twitterImages,
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.webmanifest',
  };
}
