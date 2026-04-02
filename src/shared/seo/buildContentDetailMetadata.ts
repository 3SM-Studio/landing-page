import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/routing';
import type { AppPathname } from '@/shared/i18n/routing';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { getDynamicLocaleAlternates, getLocalizedDynamicPathname } from '@/shared/lib/routes';

type BuildContentDetailMetadataInput = {
  locale: Locale;
  title: string;
  description?: string;
  sectionTitle: string;
  notFoundTitle: string;
  pathname: AppPathname;
  params: Record<string, string>;
};

export function buildContentDetailMetadata({
  locale,
  title,
  description,
  sectionTitle,
  notFoundTitle,
  pathname,
  params,
}: BuildContentDetailMetadataInput): Metadata {
  const canonical = getLocalizedDynamicPathname(pathname, locale, params);
  const alternateLanguages = getDynamicLocaleAlternates(pathname, params);

  if (!title) {
    return buildMetadata({
      locale,
      title: notFoundTitle,
      canonical,
      alternateLanguages,
      noIndex: true,
    });
  }

  return buildMetadata({
    locale,
    title: `${title} | ${sectionTitle}`,
    description,
    canonical,
    alternateLanguages,
    openGraphType: 'article',
  });
}
