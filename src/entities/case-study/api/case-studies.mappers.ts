import type { LinkedService } from '@/entities/service/model/service.types';
import type { CaseStudy, CaseStudySlug } from '../model/case-studies.types';

type RawCaseStudy = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  client?: string | null;
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

export function mapRawCaseStudyToCaseStudy(item: RawCaseStudy): CaseStudy {
  return {
    _id: item._id,
    title: item.title,
    slug: item.slug,
    excerpt: cleanOptionalString(item.excerpt),
    client: cleanOptionalString(item.client),
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
