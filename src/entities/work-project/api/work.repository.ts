import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import type { Locale } from '@/shared/i18n/routing';
import { WORK_REVALIDATE_SECONDS } from '../model/work.constants';
import type { WorkProject } from '../model/work.types';
import {
  mapRawWorkProjectSlugsToWorkProjectSlugs,
  mapRawWorkProjectToWorkProject,
  mapRawWorkProjectsToWorkProjects,
  type RawWorkProject,
  type RawWorkProjectSlug,
} from './work.mappers';
import {
  WORK_PROJECT_BY_SLUG_QUERY,
  WORK_PROJECT_SLUGS_QUERY,
  WORK_PROJECTS_QUERY,
} from './work.queries';

const workFetchOptions = {
  revalidate: WORK_REVALIDATE_SECONDS,
  tags: [sanityTags.work],
} as const;

export async function getWorkProjects(locale: Locale) {
  const items = await sanityFetch<RawWorkProject[]>(
    WORK_PROJECTS_QUERY,
    { locale },
    workFetchOptions,
  );

  return mapRawWorkProjectsToWorkProjects(items);
}

export async function getWorkProjectBySlug(locale: Locale, slug: string) {
  const item = await sanityFetch<RawWorkProject | null>(
    WORK_PROJECT_BY_SLUG_QUERY,
    { locale, slug },
    workFetchOptions,
  );

  return item ? mapRawWorkProjectToWorkProject(item) : null;
}

export async function getWorkProjectSlugs(locale: Locale) {
  const items = await sanityFetch<RawWorkProjectSlug[]>(
    WORK_PROJECT_SLUGS_QUERY,
    { locale },
    workFetchOptions,
  );

  return mapRawWorkProjectSlugsToWorkProjectSlugs(items);
}

export async function getWorkProjectOrThrow(locale: Locale, slug: string): Promise<WorkProject> {
  const item = await getWorkProjectBySlug(locale, slug);

  if (!item) {
    throw new Error(`Work project not found for locale "${locale}" and slug "${slug}"`);
  }

  return item;
}
