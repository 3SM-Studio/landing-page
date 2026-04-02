import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import type { Locale } from '@/shared/i18n/routing';
import { SERVICES_REVALIDATE_SECONDS } from '../model/service.constants';
import type { Service } from '../model/service.types';
import {
  mapRawServiceSlugsToServiceSlugs,
  mapRawServiceToService,
  mapRawServicesToServices,
  type RawService,
  type RawServiceSlug,
} from './service.mappers';
import {
  CONTACT_ENABLED_SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_SLUGS_QUERY,
  SERVICES_QUERY,
} from './service.queries';

const serviceFetchOptions = {
  revalidate: SERVICES_REVALIDATE_SECONDS,
  tags: [sanityTags.services],
} as const;

export async function getServices(locale: Locale) {
  const items = await sanityFetch<RawService[]>(SERVICES_QUERY, { locale }, serviceFetchOptions);
  return mapRawServicesToServices(items);
}

export async function getServiceBySlug(locale: Locale, slug: string) {
  const item = await sanityFetch<RawService | null>(
    SERVICE_BY_SLUG_QUERY,
    { locale, slug },
    serviceFetchOptions,
  );

  return item ? mapRawServiceToService(item) : null;
}

export async function getServiceSlugs(locale: Locale) {
  const items = await sanityFetch<RawServiceSlug[]>(
    SERVICE_SLUGS_QUERY,
    { locale },
    serviceFetchOptions,
  );

  return mapRawServiceSlugsToServiceSlugs(items);
}

export async function getContactEnabledServices(locale: Locale) {
  const items = await sanityFetch<RawService[]>(
    CONTACT_ENABLED_SERVICES_QUERY,
    { locale },
    serviceFetchOptions,
  );

  return mapRawServicesToServices(items);
}

export async function getServiceOrThrow(locale: Locale, slug: string): Promise<Service> {
  const item = await getServiceBySlug(locale, slug);

  if (!item) {
    throw new Error(`Service not found for locale "${locale}" and slug "${slug}"`);
  }

  return item;
}
