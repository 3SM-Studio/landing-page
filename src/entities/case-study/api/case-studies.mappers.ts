import type { LinkedClient } from '@/entities/client/model/client.types';
import { mapRawClientToLinkedClient, type RawClient } from '@/entities/client/api/client.mappers';
import type { LinkedPartner } from '@/entities/partner/model/partner.types';
import {
  mapRawPartnerToLinkedPartner,
  type RawPartner,
} from '@/entities/partner/api/partner.mappers';
import type { LinkedService } from '@/entities/service/model/service.types';
import type { CaseStudy, CaseStudySlug } from '../model/case-studies.types';

type RawPrimaryService = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
};

type RawCaseStudy = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  client?: RawClient | null;
  partners?: RawPartner[] | null;
  primaryService?: RawPrimaryService | null;
  year?: number | null;
  featured?: boolean | null;
  isFeaturedGlobal?: boolean | null;
  isFeaturedInPrimaryService?: boolean | null;
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

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  const collect = (input: unknown): string[] => {
    if (typeof input === 'string') {
      const normalized = input.trim();
      return normalized ? [normalized] : [];
    }

    if (Array.isArray(input)) {
      return input.flatMap((item) => collect(item));
    }

    if (input && typeof input === 'object' && 'value' in input) {
      return collect((input as { value?: unknown }).value);
    }

    return [];
  };

  const normalized = value.flatMap((item) => collect(item));

  return normalized.length > 0 ? normalized : undefined;
}

function normalizePortableText<T>(value: T[] | null | undefined) {
  return Array.isArray(value) && value.length > 0 ? value : undefined;
}

function mapRawPrimaryService(
  value: RawPrimaryService | null | undefined,
): LinkedService | undefined {
  if (!value) {
    return undefined;
  }

  return {
    _id: value._id,
    title: cleanOptionalString(value.title) || 'Untitled service',
    slug: cleanOptionalString(value.slug) || '',
    serviceKey: value.serviceKey,
  };
}

function mapRawPartners(values: RawPartner[] | null | undefined): LinkedPartner[] | undefined {
  if (!Array.isArray(values) || values.length === 0) {
    return undefined;
  }

  const normalized = values
    .map((value) => mapRawPartnerToLinkedPartner(value))
    .filter((value): value is LinkedPartner => Boolean(value));

  return normalized.length > 0 ? normalized : undefined;
}

export function mapRawCaseStudyToCaseStudy(item: RawCaseStudy): CaseStudy {
  return {
    _id: item._id,
    title: cleanOptionalString(item.title) || 'Untitled case study',
    slug: cleanOptionalString(item.slug) || '',
    excerpt: cleanOptionalString(item.excerpt),
    client: mapRawClientToLinkedClient(item.client as RawClient | null | undefined) as
      | LinkedClient
      | undefined,
    partners: mapRawPartners(item.partners),
    primaryService: mapRawPrimaryService(item.primaryService),
    year: normalizeNumber(item.year),
    featured: Boolean(item.featured),
    isFeaturedGlobal: Boolean(item.isFeaturedGlobal),
    isFeaturedInPrimaryService: Boolean(item.isFeaturedInPrimaryService),
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
