import type { Locale } from '@/shared/i18n/routing';
import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import { CLIENTS_REVALIDATE_SECONDS } from '../model/client.constants';
import {
  mapRawClientSlugsToClientSlugs,
  mapRawClientToClient,
  mapRawClientsToClients,
  type RawClient,
  type RawClientSlug,
} from './client.mappers';
import {
  CLIENT_BY_SLUG_QUERY,
  CLIENT_SLUGS_QUERY,
  CLIENTS_QUERY,
  TRUSTED_CLIENTS_QUERY,
} from './client.queries';

const clientFetchOptions = {
  revalidate: CLIENTS_REVALIDATE_SECONDS,
  tags: [sanityTags.clients],
} as const;

export async function getClients(locale: Locale) {
  const items = await sanityFetch<RawClient[]>(CLIENTS_QUERY, { locale }, clientFetchOptions);
  return mapRawClientsToClients(items);
}

export async function getTrustedClients(locale: Locale) {
  const items = await sanityFetch<RawClient[]>(
    TRUSTED_CLIENTS_QUERY,
    { locale },
    clientFetchOptions,
  );

  return mapRawClientsToClients(items);
}

export async function getClientBySlug(locale: Locale, slug: string) {
  const item = await sanityFetch<RawClient | null>(
    CLIENT_BY_SLUG_QUERY,
    { locale, slug },
    clientFetchOptions,
  );

  return item ? mapRawClientToClient(item) : null;
}

export async function getClientSlugs(locale: Locale) {
  const items = await sanityFetch<RawClientSlug[]>(
    CLIENT_SLUGS_QUERY,
    { locale },
    clientFetchOptions,
  );

  return mapRawClientSlugsToClientSlugs(items);
}
