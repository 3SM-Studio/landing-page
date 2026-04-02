import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/routing';
import { routing } from '@/shared/i18n/routing';
import { absoluteUrl, getLocaleAlternates, routes } from '@/shared/lib/routes';
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

function isRoutePath(value: string): value is RoutePath {
  return Object.values(routes).includes(value as RoutePath);
}

function getCanonicalBaseUrl(noIndex: boolean) {
  return noIndex ? serverSiteConfig.url : serverSiteConfig.productionUrl;
}

function getLocalizedImagePath(locale: Locale, kind: 'opengraph-image' | 'twitter-image') {
  return `/${locale}/${kind}`;
}

function resolveCanonicalPath(
  locale: Locale,
  canonical: RoutePath | string,
  canonicalBaseUrl: string,
  alternateLanguages?: Record<Locale, string>,
) {
  if (alternateLanguages?.[locale]) {
    return alternateLanguages[locale];
  }

  if (isRoutePath(canonical)) {
    const localizedAlternates = getLocaleAlternates(canonical, canonicalBaseUrl);

    return localizedAlternates[locale];
  }

  return absoluteUrl(canonical, canonicalBaseUrl);
}

function resolveAlternateLanguages(
  canonical: RoutePath | string,
  alternateLanguages: Record<Locale, string> | undefined,
  canonicalBaseUrl: string,
) {
  if (alternateLanguages) {
    return alternateLanguages;
  }

  if (isRoutePath(canonical)) {
    return getLocaleAlternates(canonical, canonicalBaseUrl);
  }

  return undefined;
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

  const canonicalBaseUrl = getCanonicalBaseUrl(noIndex);
  const assetBaseUrl = serverSiteConfig.url;

  const resolvedCanonical = resolveCanonicalPath(
    locale,
    canonical,
    canonicalBaseUrl,
    alternateLanguages,
  );

  const resolvedAlternates = resolveAlternateLanguages(
    canonical,
    alternateLanguages,
    canonicalBaseUrl,
  );

  const resolvedOgImage = absoluteUrl(
    ogImage ?? getLocalizedImagePath(locale, 'opengraph-image'),
    assetBaseUrl,
  );

  const resolvedTwitterImage = absoluteUrl(
    twitterImage ?? getLocalizedImagePath(locale, 'twitter-image'),
    assetBaseUrl,
  );

  const resolvedOgImageAlt = ogImageAlt ?? localizedMetadata.ogImageAlt;
  const resolvedTwitterImageAlt = twitterImageAlt ?? localizedMetadata.twitterImageAlt;

  const resolvedKeywords = uniqueKeywords([...localizedMetadata.keywords, ...(keywords ?? [])]);

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
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: resolvedOgImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: resolvedDescription,
      creator: publicSiteConfig.creator,
      site: publicSiteConfig.creator,
      images: [
        {
          url: resolvedTwitterImage,
          alt: resolvedTwitterImageAlt,
        },
      ],
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
