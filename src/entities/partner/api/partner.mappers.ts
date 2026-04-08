import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';
import { normalizeBrandSocialLinks, type BrandSocialLinks } from '@/shared/model/social-links';
import type { BrandLocation, BrandProfileMediaItem } from '@/entities/client/model/client.types';
import type { Partner, PartnerSlug, LinkedPartner } from '../model/partner.types';

type RawPartner = {
  _id: string;
  name: string;
  slug: string;
  partnerKey: string;
  logo?: Partner['logo'];
  logoAlt?: string | null;
  tagline?: string | null;
  partnershipType?: string | null;
  shortDescription?: string | null;
  location?: BrandLocation | null;
  collaborationSummary?: Partner['collaborationSummary'] | null;
  featuredMedia?: BrandProfileMediaItem[] | null;
  website?: string | null;
  socialLinks?: BrandSocialLinks | null;
  featured?: boolean | null;
  isActive?: boolean | null;
  showOnPublicPage?: boolean | null;
  order?: number | null;
  translations?: Partner['translations'] | null;
  seo?: Partner['seo'] | null;
  relatedCaseStudies?: CaseStudy[] | null;
};

type RawPartnerSlug = { slug: string };

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeNumber(value: number | null | undefined) {
  return typeof value === 'number' ? value : undefined;
}

function normalizePortableText<T>(value: T[] | null | undefined) {
  return Array.isArray(value) && value.length > 0 ? value : undefined;
}

function normalizeLocation(location: BrandLocation | null | undefined) {
  if (!location) {
    return undefined;
  }

  const city = cleanOptionalString(location.city);
  const country = cleanOptionalString(location.country);

  if (!city && !country) {
    return undefined;
  }

  return { city, country };
}

function normalizeFeaturedMedia(items: BrandProfileMediaItem[] | null | undefined) {
  if (!Array.isArray(items) || items.length === 0) {
    return undefined;
  }

  const normalized = items
    .map((item) => ({
      _key: item._key,
      asset: item.asset ?? null,
      alt: cleanOptionalString(item.alt),
      caption: cleanOptionalString(item.caption),
    }))
    .filter((item) => item.asset);

  return normalized.length > 0 ? normalized : undefined;
}

export function mapRawPartnerToPartner(item: RawPartner): Partner {
  return {
    _id: item._id,
    name: item.name,
    slug: item.slug,
    partnerKey: item.partnerKey,
    logo: item.logo ?? null,
    logoAlt: cleanOptionalString(item.logoAlt),
    tagline: cleanOptionalString(item.tagline),
    partnershipType: cleanOptionalString(item.partnershipType),
    shortDescription: cleanOptionalString(item.shortDescription),
    location: normalizeLocation(item.location),
    collaborationSummary: normalizePortableText(item.collaborationSummary),
    featuredMedia: normalizeFeaturedMedia(item.featuredMedia),
    website: cleanOptionalString(item.website),
    socialLinks: normalizeBrandSocialLinks(item.socialLinks),
    featured: Boolean(item.featured),
    isActive: Boolean(item.isActive),
    showOnPublicPage: Boolean(item.showOnPublicPage),
    order: normalizeNumber(item.order),
    translations:
      Array.isArray(item.translations) && item.translations.length > 0
        ? item.translations
        : undefined,
    seo: item.seo ?? undefined,
    relatedCaseStudies:
      Array.isArray(item.relatedCaseStudies) && item.relatedCaseStudies.length > 0
        ? item.relatedCaseStudies
        : undefined,
  };
}

export function mapRawPartnersToPartners(items: RawPartner[]) {
  return items.map(mapRawPartnerToPartner);
}

export function mapRawPartnerSlugsToPartnerSlugs(items: RawPartnerSlug[]): PartnerSlug[] {
  return items.map((item) => ({ slug: item.slug }));
}

export function mapRawPartnerToLinkedPartner(
  item: RawPartner | null | undefined,
): LinkedPartner | undefined {
  if (!item) {
    return undefined;
  }

  return {
    _id: item._id,
    name: item.name,
    slug: item.slug,
    logo: item.logo ?? null,
    logoAlt: cleanOptionalString(item.logoAlt),
    partnershipType: cleanOptionalString(item.partnershipType),
  };
}

export type { RawPartner, RawPartnerSlug };
