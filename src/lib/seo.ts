import type { Metadata } from 'next';
import { absoluteUrl, routes } from '@/lib/routes';
import { siteConfig } from '@/lib/site-config';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
  twitterImage?: string;
  ogImageAlt?: string;
  twitterImageAlt?: string;
  keywords?: string[];
  openGraphType?: 'website' | 'article';
};

function uniqueKeywords(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  canonical = routes.home,
  noIndex = !siteConfig.shouldIndex,
  ogImage = siteConfig.ogImagePath,
  twitterImage = siteConfig.twitterImagePath,
  ogImageAlt,
  twitterImageAlt,
  keywords = siteConfig.keywords,
  openGraphType = 'website',
}: BuildMetadataInput = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  const resolvedCanonical = absoluteUrl(canonical);
  const resolvedOgImage = absoluteUrl(ogImage);
  const resolvedOgImageAlt = ogImageAlt ?? title ?? siteConfig.ogImageAlt;
  const resolvedTwitterImage = absoluteUrl(twitterImage);
  const resolvedTwitterImageAlt =
    twitterImageAlt ?? title ?? siteConfig.twitterImageAlt;

  return {
    title: resolvedTitle,
    description,
    keywords: uniqueKeywords(keywords),
    alternates: {
      canonical: resolvedCanonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: openGraphType,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      url: resolvedCanonical,
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
      description,
      creator: siteConfig.creator,
      images: [resolvedTwitterImage],
    },
  };
}
