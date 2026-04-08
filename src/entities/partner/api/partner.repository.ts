import type { Locale } from '@/shared/i18n/routing';
import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import { PARTNERS_REVALIDATE_SECONDS } from '../model/partner.constants';
import {
  mapRawPartnerSlugsToPartnerSlugs,
  mapRawPartnerToPartner,
  mapRawPartnersToPartners,
  type RawPartner,
  type RawPartnerSlug,
} from './partner.mappers';
import { PARTNER_BY_SLUG_QUERY, PARTNER_SLUGS_QUERY, PARTNERS_QUERY } from './partner.queries';

const partnerFetchOptions = {
  revalidate: PARTNERS_REVALIDATE_SECONDS,
  tags: [sanityTags.partners],
} as const;

export async function getPartners(locale: Locale) {
  const items = await sanityFetch<RawPartner[]>(PARTNERS_QUERY, { locale }, partnerFetchOptions);
  return mapRawPartnersToPartners(items);
}

export async function getPartnerBySlug(locale: Locale, slug: string) {
  const item = await sanityFetch<RawPartner | null>(
    PARTNER_BY_SLUG_QUERY,
    { locale, slug },
    partnerFetchOptions,
  );

  return item ? mapRawPartnerToPartner(item) : null;
}

export async function getPartnerSlugs(locale: Locale) {
  const items = await sanityFetch<RawPartnerSlug[]>(
    PARTNER_SLUGS_QUERY,
    { locale },
    partnerFetchOptions,
  );

  return mapRawPartnerSlugsToPartnerSlugs(items);
}
