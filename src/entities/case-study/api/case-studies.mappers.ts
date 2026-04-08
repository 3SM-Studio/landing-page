import type { LinkedService } from '@/entities/service/model/service.types';
import type { LinkedClient } from '@/entities/client/model/client.types';
import type { LinkedPartner } from '@/entities/partner/model/partner.types';
import type { CaseStudy, CaseStudySlug } from '../model/case-studies.types';

type RawCaseStudy = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  client?: LinkedClient | null;
  partners?: LinkedPartner[] | null;
  primaryService?: LinkedService | null;
  year?: number | null;
  featured?: boolean | null;
  coverImage?: CaseStudy['coverImage'];
  coverImageAlt?: string | null;
  scope?: string[] | null;
  problem?: CaseStudy['problem'] | null;
  solution?: CaseStudy['solution'] | null;
  result?: CaseStudy['result'] | null;
  galleryIntro?: CaseStudy['galleryIntro'] | null;
  translations?: CaseStudy['translations'] | null;
};

type RawCaseStudySlug = {
  slug: string;
};

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

function normalizeYear(value: number | null | undefined) {
  return typeof value === 'number' ? value : undefined;
}

function normalizeStringArray(value: string[] | null | undefined) {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  const normalized = value.map((item) => item.trim()).filter(Boolean);

  return normalized.length > 0 ? normalized : undefined;
}

function normalizePortableText<T>(value: T[] | null | undefined) {
  return Array.isArray(value) && value.length > 0 ? value : undefined;
}

function mapPrimaryService(value: LinkedService | null | undefined) {
  if (!value) {
    return undefined;
  }

  return {
    _id: value._id,
    title: value.title,
    slug: value.slug,
    serviceKey: value.serviceKey,
  };
}

function mapClient(value: LinkedClient | null | undefined) {
  if (!value) {
    return undefined;
  }

  return {
    _id: value._id,
    name: value.name,
    slug: value.slug,
    logo: value.logo ?? null,
    logoAlt: cleanOptionalString(value.logoAlt),
    industry: cleanOptionalString(value.industry),
    website: cleanOptionalString(value.website),
  };
}

function mapPartners(items: LinkedPartner[] | null | undefined) {
  if (!Array.isArray(items) || items.length === 0) {
    return undefined;
  }

  const normalized = items
    .filter((item): item is LinkedPartner => Boolean(item?._id && item?.name && item?.slug))
    .map((item) => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      logo: item.logo ?? null,
      logoAlt: cleanOptionalString(item.logoAlt),
      partnershipType: cleanOptionalString(item.partnershipType),
    }));

  return normalized.length > 0 ? normalized : undefined;
}

export function mapRawCaseStudyToCaseStudy(item: RawCaseStudy): CaseStudy {
  return {
    _id: item._id,
    title: item.title,
    slug: item.slug,
    excerpt: cleanOptionalString(item.excerpt),
    client: mapClient(item.client),
    partners: mapPartners(item.partners),
    primaryService: mapPrimaryService(item.primaryService),
    year: normalizeYear(item.year),
    featured: Boolean(item.featured),
    coverImage: item.coverImage ?? null,
    coverImageAlt: cleanOptionalString(item.coverImageAlt),
    scope: normalizeStringArray(item.scope),
    problem: normalizePortableText(item.problem),
    solution: normalizePortableText(item.solution),
    result: normalizePortableText(item.result),
    galleryIntro: normalizePortableText(item.galleryIntro),
    translations:
      Array.isArray(item.translations) && item.translations.length > 0
        ? item.translations
        : undefined,
  };
}

export function mapRawCaseStudiesToCaseStudies(items: RawCaseStudy[]) {
  return items.map(mapRawCaseStudyToCaseStudy);
}

export function mapRawCaseStudySlugsToCaseStudySlugs(items: RawCaseStudySlug[]): CaseStudySlug[] {
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export type { RawCaseStudy, RawCaseStudySlug };
