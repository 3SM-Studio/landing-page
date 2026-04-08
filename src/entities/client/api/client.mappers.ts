import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';
import { normalizeBrandSocialLinks, type BrandSocialLinks } from '@/shared/model/social-links';
import type { Client, ClientSlug, LinkedClient } from '../model/client.types';

type RawClient = {
  _id: string;
  name: string;
  slug: string;
  clientKey: string;
  logo?: Client['logo'];
  logoAlt?: string | null;
  shortDescription?: string | null;
  industry?: string | null;
  website?: string | null;
  socialLinks?: BrandSocialLinks | null;
  featured?: boolean | null;
  isActive?: boolean | null;
  showInTrustedBy?: boolean | null;
  order?: number | null;
  translations?: Client['translations'] | null;
  seo?: Client['seo'] | null;
  relatedCaseStudies?: CaseStudy[] | null;
};

type RawClientSlug = { slug: string };

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeNumber(value: number | null | undefined) {
  return typeof value === 'number' ? value : undefined;
}

export function mapRawClientToClient(item: RawClient): Client {
  return {
    _id: item._id,
    name: item.name,
    slug: item.slug,
    clientKey: item.clientKey,
    logo: item.logo ?? null,
    logoAlt: cleanOptionalString(item.logoAlt),
    shortDescription: cleanOptionalString(item.shortDescription),
    industry: cleanOptionalString(item.industry),
    website: cleanOptionalString(item.website),
    socialLinks: normalizeBrandSocialLinks(item.socialLinks),
    featured: Boolean(item.featured),
    isActive: Boolean(item.isActive),
    showInTrustedBy: Boolean(item.showInTrustedBy),
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
    name: item.name,
    slug: item.slug,
    logo: item.logo ?? null,
    logoAlt: cleanOptionalString(item.logoAlt),
    industry: cleanOptionalString(item.industry),
    website: cleanOptionalString(item.website),
    socialLinks: normalizeBrandSocialLinks(item.socialLinks),
  };
}

export type { RawClient, RawClientSlug };
