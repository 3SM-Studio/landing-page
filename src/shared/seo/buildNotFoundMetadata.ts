import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/routing';
import { buildMetadata } from '@/shared/seo/buildMetadata';

type BuildNotFoundMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
};

export async function buildNotFoundMetadata({
  locale,
  pathname,
  title,
  description,
}: BuildNotFoundMetadataInput): Promise<Metadata> {
  return buildMetadata({
    locale,
    title,
    description,
    canonical: pathname,
    noIndex: true,
    ogImage: `/${locale}/opengraph-image-404`,
    twitterImage: `/${locale}/twitter-image-404`,
  });
}
