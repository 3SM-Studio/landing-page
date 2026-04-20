import 'server-only';

import type { Locale } from '@/shared/i18n/routing';
import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import { STATIC_PAGE_BY_KEY_QUERY } from './static-page.queries';
import { mapRawStaticPageToStaticPage, type RawStaticPage } from './static-page.mappers';
import type { StaticPage, StaticPageKey } from '../model/static-page.types';

export async function getStaticPage(
  pageKey: StaticPageKey,
  locale: Locale,
): Promise<StaticPage | null> {
  const result = await sanityFetch<RawStaticPage | null>(
    STATIC_PAGE_BY_KEY_QUERY,
    { pageKey },
    {
      revalidate: 300,
      tags: [sanityTags.staticPages],
    },
  );

  return mapRawStaticPageToStaticPage(result, locale);
}
