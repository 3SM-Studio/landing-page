import type { Metadata } from 'next';
import { absoluteUrl, routes } from '@/lib/routes';
import { siteConfig } from '@/lib/site-config';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  image?: string;
  imageAlt?: string;
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
  image = siteConfig.ogImage,
  imageAlt,
  keywords = siteConfig.keywords,
  openGraphType = 'website',
}: BuildMetadataInput = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  const resolvedCanonical = absoluteUrl(canonical);
  const resolvedImage = absoluteUrl(image);
  const resolvedImageAlt = imageAlt ?? title ?? siteConfig.ogImageAlt;

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
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      creator: siteConfig.creator,
      images: [resolvedImage],
    },
  };
}
