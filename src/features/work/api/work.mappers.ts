import type { WorkProject, WorkProjectSlug } from '../lib/work.types';

type RawWorkProject = {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  year?: number | null;
  featured?: boolean | null;
  coverImage?: WorkProject['coverImage'];
  coverImageAlt?: string | null;
  services?: string[] | null;
  intro?: WorkProject['intro'] | null;
  challenge?: WorkProject['challenge'] | null;
  solution?: WorkProject['solution'] | null;
  outcome?: WorkProject['outcome'] | null;
  translations?: WorkProject['translations'] | null;
};

type RawWorkProjectSlug = {
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

export function mapRawWorkProjectToWorkProject(item: RawWorkProject): WorkProject {
  return {
    _id: item._id,
    title: item.title,
    slug: item.slug,
    description: cleanOptionalString(item.description),
    category: cleanOptionalString(item.category),
    year: normalizeYear(item.year),
    featured: Boolean(item.featured),
    coverImage: item.coverImage ?? null,
    coverImageAlt: cleanOptionalString(item.coverImageAlt),
    services: normalizeStringArray(item.services),
    intro: normalizePortableText(item.intro),
    challenge: normalizePortableText(item.challenge),
    solution: normalizePortableText(item.solution),
    outcome: normalizePortableText(item.outcome),
    translations:
      Array.isArray(item.translations) && item.translations.length > 0
        ? item.translations
        : undefined,
  };
}

export function mapRawWorkProjectsToWorkProjects(items: RawWorkProject[]) {
  return items.map(mapRawWorkProjectToWorkProject);
}

export function mapRawWorkProjectSlugsToWorkProjectSlugs(
  items: RawWorkProjectSlug[],
): WorkProjectSlug[] {
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export type { RawWorkProject, RawWorkProjectSlug };
