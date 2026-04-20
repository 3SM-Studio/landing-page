import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';
import { normalizeBrandSocialLinks, type BrandSocialLinks } from '@/shared/model/social-links';
import type {
  BrandLocation,
  BrandProfileMediaItem,
  Client,
  ClientSlug,
  LinkedClient,
} from '../model/client.types';

type RawClient = {
  _id: string;
  name: string;
  slug: string;
  clientKey: string;
  logo?: Client['logo'];
  logoAlt?: string | null;
  bannerImage?: Client['bannerImage'];
  bannerImageAlt?: string | null;
  tagline?: string | null;
  shortDescription?: string | null;
  industry?: string | null;
  location?: BrandLocation | null;
  collaborationSummary?: Client['collaborationSummary'] | null;
  featuredMedia?: BrandProfileMediaItem[] | null;
  website?: string | null;
  socialLinks?: BrandSocialLinks | null;
  featured?: boolean | null;
  isActive?: boolean | null;
  showInTrustedBy?: boolean | null;
  showInListing?: boolean | null;
  hasPublicPage?: boolean | null;
  order?: number | null;
  translations?: Client['translations'] | null;
  seo?: Client['seo'] | null;
  relatedCaseStudies?: CaseStudy[] | null;
};

type RawClientSlug = { slug: string };

function cleanOptionalString(value: string | { value?: string | null } | null | undefined) {
  const normalized =
    typeof value === 'string'
      ? value.trim()
      : typeof value?.value === 'string'
        ? value.value.trim()
        : undefined;

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

export function mapRawClientToClient(item: RawClient): Client {
  return {
    _id: item._id,
    name: cleanOptionalString(item.name) || 'Untitled client',
    slug: cleanOptionalString(item.slug) || '',
    clientKey: item.clientKey,
    logo: item.logo ?? null,
    logoAlt: cleanOptionalString(item.logoAlt),
    bannerImage: item.bannerImage ?? null,
    bannerImageAlt: cleanOptionalString(item.bannerImageAlt),
    tagline: cleanOptionalString(item.tagline),
    shortDescription: cleanOptionalString(item.shortDescription),
    industry: cleanOptionalString(item.industry),
    location: normalizeLocation(item.location),
    collaborationSummary: normalizePortableText(item.collaborationSummary),
    featuredMedia: normalizeFeaturedMedia(item.featuredMedia),
    website: cleanOptionalString(item.website),
    socialLinks: normalizeBrandSocialLinks(item.socialLinks),
    featured: Boolean(item.featured),
    isActive: Boolean(item.isActive),
    showInTrustedBy: Boolean(item.showInTrustedBy),
    showInListing: Boolean(item.showInListing),
    hasPublicPage: Boolean(item.hasPublicPage),
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

export function mapRawClientsToClients(items: RawClient[]) {
  return items.map(mapRawClientToClient);
}

export function mapRawClientSlugsToClientSlugs(items: RawClientSlug[]): ClientSlug[] {
  return items.map((item) => ({ slug: item.slug }));
}

export function mapRawClientToLinkedClient(
  item: RawClient | null | undefined,
): LinkedClient | undefined {
  if (!item) {
    return undefined;
  }

  return {
    _id: item._id,
    name: cleanOptionalString(item.name) || 'Untitled client',
    slug: cleanOptionalString(item.slug) || '',
    logo: item.logo ?? null,
    logoAlt: cleanOptionalString(item.logoAlt),
    bannerImage: item.bannerImage ?? null,
    bannerImageAlt: cleanOptionalString(item.bannerImageAlt),
    industry: cleanOptionalString(item.industry),
    website: cleanOptionalString(item.website),
    socialLinks: normalizeBrandSocialLinks(item.socialLinks),
  };
}

export type { RawClient, RawClientSlug };
