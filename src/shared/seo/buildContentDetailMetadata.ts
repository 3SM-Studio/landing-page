import type { Metadata } from 'next';
import type { AppPathname, Locale } from '@/shared/i18n/routing';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { buildNotFoundMetadata } from '@/shared/seo/buildNotFoundMetadata';
import { getDynamicLocaleAlternates, getLocalizedDynamicPathname } from '@/shared/lib/routes';

type BuildContentDetailMetadataInput = {
  locale: Locale;
  title: string;
  description?: string;
  sectionTitle: string;
  notFoundTitle: string;
  notFoundDescription?: string;
  pathname: AppPathname;
  params: Record<string, string>;
};

export async function buildContentDetailMetadata({
  locale,
  title,
  description,
  sectionTitle,
  notFoundTitle,
  notFoundDescription,
  pathname,
  params,
}: BuildContentDetailMetadataInput): Promise<Metadata> {
  const canonical = getLocalizedDynamicPathname(pathname, locale, params);

  if (!title) {
    return buildNotFoundMetadata({
      locale,
      pathname: canonical,
      title: notFoundTitle,
      description:
        notFoundDescription ??
        (locale === 'pl'
          ? 'Ta strona nie istnieje albo została usunięta.'
          : 'This page does not exist or has been removed.'),
    });
  }

  const alternateLanguages = getDynamicLocaleAlternates(pathname, params);

  return buildMetadata({
    locale,
    title: `${title} | ${sectionTitle}`,
    description,
    canonical,
    alternateLanguages,
    openGraphType: 'article',
  });
}
