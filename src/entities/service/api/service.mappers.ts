import type {
  ContactServiceOption,
  Service,
  ServiceLinkedItem,
  ServiceSlug,
} from '../model/service.types';

type RawLinkedPrimaryService = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
};

type RawLinkedItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  year?: number | null;
  featured?: boolean | null;
  primaryService?: RawLinkedPrimaryService | null;
};

type RawService = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
  shortDescription?: string | null;
  intro?: Service['intro'] | null;
  deliverables?: string[] | null;
  featured?: boolean | null;
  isActive?: boolean | null;
  contactEnabled?: boolean | null;
  order?: number | null;
  coverImage?: Service['coverImage'];
  coverImageAlt?: string | null;
  translations?: Service['translations'] | null;
  relatedWorkProjects?: RawLinkedItem[] | null;
  relatedCaseStudies?: RawLinkedItem[] | null;
};

type RawServiceSlug = {
  slug: string;
};

type RawContactServiceOption = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
};

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeNumber(value: number | null | undefined) {
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

function mapPrimaryService(value: RawLinkedPrimaryService | null | undefined) {
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

function mapLinkedItems(
  items: RawLinkedItem[] | null | undefined,
): ServiceLinkedItem[] | undefined {
  if (!Array.isArray(items) || items.length === 0) {
    return undefined;
  }

  return items.map((item) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug,
    description: cleanOptionalString(item.description),
    year: normalizeNumber(item.year),
    featured: Boolean(item.featured),
    primaryService: mapPrimaryService(item.primaryService),
  }));
}

export function mapRawServiceToService(item: RawService): Service {
  return {
    _id: item._id,
    title: item.title,
    slug: item.slug,
    serviceKey: item.serviceKey,
    shortDescription: cleanOptionalString(item.shortDescription),
    intro: normalizePortableText(item.intro),
    deliverables: normalizeStringArray(item.deliverables),
    featured: Boolean(item.featured),
    isActive: Boolean(item.isActive),
    contactEnabled: Boolean(item.contactEnabled),
    order: normalizeNumber(item.order),
    coverImage: item.coverImage ?? null,
    coverImageAlt: cleanOptionalString(item.coverImageAlt),
    translations:
      Array.isArray(item.translations) && item.translations.length > 0
        ? item.translations
        : undefined,
    relatedWorkProjects: mapLinkedItems(item.relatedWorkProjects),
    relatedCaseStudies: mapLinkedItems(item.relatedCaseStudies),
  };
}

export function mapRawServicesToServices(items: RawService[]) {
  return items.map(mapRawServiceToService);
}

export function mapRawServiceSlugsToServiceSlugs(items: RawServiceSlug[]): ServiceSlug[] {
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export function mapRawContactServiceOptions(
  items: RawContactServiceOption[],
): ContactServiceOption[] {
  return items.map((item) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug,
    serviceKey: item.serviceKey,
  }));
}

export type { RawContactServiceOption, RawService, RawServiceSlug };
