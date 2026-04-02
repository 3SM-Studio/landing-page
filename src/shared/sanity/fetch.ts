import type { QueryParams } from 'next-sanity';
import { client } from '@/shared/sanity/client';
import type { SanityTag } from '@/shared/sanity/tags';

type SanityFetchOptions = {
  revalidate?: number;
  tags?: readonly SanityTag[];
};

export async function sanityFetch<TResult>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {},
): Promise<TResult> {
  const { revalidate, tags } = options;

  return client.fetch<TResult>(query, params, {
    next: {
      ...(typeof revalidate === 'number' ? { revalidate } : {}),
      ...(tags?.length ? { tags: [...tags] } : {}),
    },
  });
}
