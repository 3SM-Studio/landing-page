import { getTranslations } from 'next-intl/server';
import type { AppPathname, Locale } from '@/shared/i18n/routing';
import { buildMetadata } from '@/shared/seo/buildMetadata';

type BuildPageMetadataInput = {
  locale: Locale;
  pathname: AppPathname;
  namespace: string;
  titleKey: string;
  descriptionKey: string;
  keywords?: string[];
};

function normalizeCopy(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export async function buildPageMetadata({
  locale,
  pathname,
  namespace,
  titleKey,
  descriptionKey,
  keywords,
}: BuildPageMetadataInput) {
  const t = await getTranslations({ locale, namespace });

  return buildMetadata({
    locale,
    canonical: pathname,
    title: normalizeCopy(t(titleKey)),
    description: normalizeCopy(t(descriptionKey)),
    keywords,
  });
}
