import { client } from '@/shared/sanity/client';
import type { Locale } from '@/shared/i18n/routing';
import { WORK_REVALIDATE_SECONDS } from '../lib/work.constants';
import type { WorkProject } from '../lib/work.types';
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

const revalidateOptions = {
  next: { revalidate: WORK_REVALIDATE_SECONDS },
} as const;

export async function getWorkProjects(locale: Locale) {
  const items = await client.fetch<RawWorkProject[]>(
    WORK_PROJECTS_QUERY,
    { locale },
    revalidateOptions,
  );

  return mapRawWorkProjectsToWorkProjects(items);
}

export async function getWorkProjectBySlug(locale: Locale, slug: string) {
  const item = await client.fetch<RawWorkProject | null>(
    WORK_PROJECT_BY_SLUG_QUERY,
    { locale, slug },
    revalidateOptions,
  );

  return item ? mapRawWorkProjectToWorkProject(item) : null;
}

export async function getWorkProjectSlugs(locale: Locale) {
  const items = await client.fetch<RawWorkProjectSlug[]>(
    WORK_PROJECT_SLUGS_QUERY,
    { locale },
    revalidateOptions,
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
