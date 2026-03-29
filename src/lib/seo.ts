import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { absoluteUrl, getLocaleAlternates, routes } from '@/lib/routes';
import { getSiteMetadata, publicSiteConfig } from '@/lib/site-config.public';
import { serverSiteConfig } from '@/lib/site-config.server';

type RoutePath = (typeof routes)[keyof typeof routes];

type BuildMetadataInput = {
  locale: Locale;
  title?: string;
  description?: string;
  canonical?: RoutePath;
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

export function buildMetadata({
  locale,
  title,
  description,
  canonical = routes.home,
  noIndex = !serverSiteConfig.shouldIndex,
  ogImage = publicSiteConfig.ogImagePath,
  ogImageAlt,
  twitterImage = publicSiteConfig.twitterImagePath,
  twitterImageAlt,
  keywords,
  openGraphType = 'website',
  useTitleTemplate = false,
}: BuildMetadataInput): Metadata {
  const localizedMetadata = getSiteMetadata(locale);

  const defaultTitle = localizedMetadata.title;
  const resolvedTitle = title ? `${title} | ${publicSiteConfig.name}` : defaultTitle;
  const resolvedDescription = description ?? localizedMetadata.description;

  const canonicalBaseUrl = serverSiteConfig.productionUrl;
  const assetBaseUrl = serverSiteConfig.url;

  const resolvedCanonical = absoluteUrl(canonical, canonicalBaseUrl);
  const resolvedOgImage = absoluteUrl(ogImage, assetBaseUrl);
  const resolvedTwitterImage = absoluteUrl(twitterImage, assetBaseUrl);

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
      : resolvedTitle,
    description: resolvedDescription,
    applicationName: publicSiteConfig.name,
    authors: [{ name: publicSiteConfig.name }],
    creator: publicSiteConfig.name,
    publisher: publicSiteConfig.name,
    category: 'creative studio',
    keywords: resolvedKeywords,
    alternates: {
      canonical: resolvedCanonical,
      languages: getLocaleAlternates(canonical, canonicalBaseUrl),
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
      title: resolvedTitle,
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
      title: resolvedTitle,
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
