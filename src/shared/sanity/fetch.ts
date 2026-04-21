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

  // Filtrujemy tagi, aby usunąć ewentualne undefined/null
  const validTags = tags?.filter((tag): tag is SanityTag => Boolean(tag)) ?? [];

  return client.fetch<TResult>(query, params, {
    next: {
      ...(typeof revalidate === 'number' ? { revalidate } : {}),
      ...(validTags.length ? { tags: validTags } : {}),
    },
  });
}
