import { client } from '@/shared/sanity/client';
import type { Locale } from '@/shared/i18n/routing';
import { CASE_STUDIES_REVALIDATE_SECONDS } from '../lib/case-studies.constants';
import type { CaseStudy } from '../lib/case-studies.types';
import {
  mapRawCaseStudiesToCaseStudies,
  mapRawCaseStudySlugsToCaseStudySlugs,
  mapRawCaseStudyToCaseStudy,
  type RawCaseStudy,
  type RawCaseStudySlug,
} from './case-studies.mappers';
import {
  CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from './case-studies.queries';

const revalidateOptions = {
  next: { revalidate: CASE_STUDIES_REVALIDATE_SECONDS },
} as const;

export async function getCaseStudies(locale: Locale) {
  const items = await client.fetch<RawCaseStudy[]>(
    CASE_STUDIES_QUERY,
    { locale },
    revalidateOptions,
  );

  return mapRawCaseStudiesToCaseStudies(items);
}

export async function getCaseStudyBySlug(locale: Locale, slug: string) {
  const item = await client.fetch<RawCaseStudy | null>(
    CASE_STUDY_BY_SLUG_QUERY,
    { locale, slug },
    revalidateOptions,
  );

  return item ? mapRawCaseStudyToCaseStudy(item) : null;
}

export async function getCaseStudySlugs(locale: Locale) {
  const items = await client.fetch<RawCaseStudySlug[]>(
    CASE_STUDY_SLUGS_QUERY,
    { locale },
    revalidateOptions,
  );

  return mapRawCaseStudySlugsToCaseStudySlugs(items);
}

export async function getCaseStudyOrThrow(locale: Locale, slug: string): Promise<CaseStudy> {
  const item = await getCaseStudyBySlug(locale, slug);

  if (!item) {
    throw new Error(`Case study not found for locale "${locale}" and slug "${slug}"`);
  }

  return item;
}
