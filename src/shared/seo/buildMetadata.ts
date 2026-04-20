import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/routing';
import { routing } from '@/shared/i18n/routing';
import { absoluteUrl, getLocaleAlternates, routes } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import {
  resolveDefaultSocialImage,
  resolveLocalizedSiteMetadata,
  resolvePublicSiteConfig,
} from '@/shared/config/site/site-config.resolver';

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

function uniqueKeywords(values: Array<string | null | undefined>) {
  return [
    ...new Set(
      values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)),
    ),
  ];
}

function getAlternateOpenGraphLocales(locale: Locale, localeMap: Record<Locale, string>) {
  return routing.locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => localeMap[candidate]);
}

function isRoutePath(value: string): value is RoutePath {
  return Object.values(routes).includes(value as RoutePath);
}

function getCanonicalBaseUrl(noIndex: boolean) {
  return noIndex ? serverSiteConfig.url : serverSiteConfig.productionUrl;
}

function getRootLocalizedImagePath(locale: Locale, kind: 'opengraph-image' | 'twitter-image') {
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

async function getResolvedLocaleMap(): Promise<Record<Locale, string>> {
  const entries = await Promise.all(
    routing.locales.map(async (candidate) => {
      const metadata = await resolveLocalizedSiteMetadata(candidate);
      return [candidate, metadata.locale] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<Locale, string>;
}

export async function buildMetadata({
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
}: BuildMetadataInput): Promise<Metadata> {
  const [siteConfig, localizedMetadata, defaultSocialImage, resolvedLocaleMap] = await Promise.all([
    resolvePublicSiteConfig(),
    resolveLocalizedSiteMetadata(locale),
    resolveDefaultSocialImage(locale),
    getResolvedLocaleMap(),
  ]);

  const defaultTitle = localizedMetadata.title;
  const documentTitle = title ?? defaultTitle;
  const socialTitle = title ? `${title} | ${siteConfig.name}` : defaultTitle;
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
    ogImage ?? defaultSocialImage.url ?? getRootLocalizedImagePath(locale, 'opengraph-image'),
    assetBaseUrl,
  );

  const resolvedTwitterImage = absoluteUrl(
    twitterImage ?? defaultSocialImage.url ?? getRootLocalizedImagePath(locale, 'twitter-image'),
    assetBaseUrl,
  );

  const resolvedOgImageAlt = ogImageAlt ?? defaultSocialImage.alt ?? localizedMetadata.ogImageAlt;

  const resolvedTwitterImageAlt =
    twitterImageAlt ?? defaultSocialImage.alt ?? localizedMetadata.twitterImageAlt;

  const resolvedKeywords = uniqueKeywords([...localizedMetadata.keywords, ...(keywords ?? [])]);

  return {
    metadataBase: new URL(assetBaseUrl),
    title: useTitleTemplate
      ? {
          default: defaultTitle,
          template: `%s | ${siteConfig.name}`,
        }
      : documentTitle,
    description: resolvedDescription,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
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
      alternateLocale: getAlternateOpenGraphLocales(locale, resolvedLocaleMap),
      url: resolvedCanonical,
      siteName: siteConfig.name,
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
      creator: siteConfig.creator,
      site: siteConfig.creator,
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
