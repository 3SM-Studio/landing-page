import { getTranslations } from 'next-intl/server';
import type { AppPathname, Locale } from '@/shared/i18n/routing';
import { buildMetadata } from '@/shared/seo/buildMetadata';

type BuildPageMetadataInput = {
  locale: Locale;
  pathname: AppPathname;
  namespace: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
  keywords?: string[];
  ogImage?: string;
  twitterImage?: string;
};

function normalizeCopy(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export async function buildPageMetadata({
  locale,
  pathname,
  namespace,
  seoTitleKey,
  seoDescriptionKey,
  keywords,
  ogImage,
  twitterImage,
}: BuildPageMetadataInput) {
  const t = await getTranslations({ locale, namespace });

  return buildMetadata({
    locale,
    canonical: pathname,
    title: normalizeCopy(t(seoTitleKey)),
    description: normalizeCopy(t(seoDescriptionKey)),
    keywords,
    ogImage,
    twitterImage,
  });
}
