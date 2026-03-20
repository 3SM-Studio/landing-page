import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { absoluteUrl, getLocaleAlternates, routes } from '@/lib/routes';
import { getSiteMetadata, siteConfig } from '@/lib/site-config';

type BuildMetadataInput = {
  locale: Locale;
  title?: string;
  description?: string;
  canonical?: string;
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
  noIndex = !siteConfig.shouldIndex,
  ogImage = siteConfig.ogImagePath,
  ogImageAlt,
  twitterImage = siteConfig.twitterImagePath,
  twitterImageAlt,
  keywords,
  openGraphType = 'website',
  useTitleTemplate = false,
}: BuildMetadataInput): Metadata {
  const localizedMetadata = getSiteMetadata(locale);

  const defaultTitle = localizedMetadata.title;
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : defaultTitle;
  const resolvedDescription = description ?? localizedMetadata.description;
  const resolvedCanonical = absoluteUrl(canonical, locale);

  const resolvedOgImage = absoluteUrl(ogImage, locale);
  const resolvedOgImageAlt = ogImageAlt ?? localizedMetadata.ogImageAlt;

  const resolvedTwitterImage = absoluteUrl(twitterImage, locale);
  const resolvedTwitterImageAlt = twitterImageAlt ?? localizedMetadata.twitterImageAlt;

  const resolvedKeywords = uniqueKeywords([...localizedMetadata.keywords, ...(keywords ?? [])]);

  return {
    metadataBase: new URL(siteConfig.url),
    title: useTitleTemplate
      ? {
          default: defaultTitle,
          template: `%s | ${siteConfig.name}`,
        }
      : resolvedTitle,
    description: resolvedDescription,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'creative studio',
    keywords: resolvedKeywords,
    alternates: {
      canonical: resolvedCanonical,
      languages: getLocaleAlternates(canonical),
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
      siteName: siteConfig.name,
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
