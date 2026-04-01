import { client } from '@/shared/sanity/client';
import type { Locale } from '@/shared/i18n/routing';
import { BLOG_REVALIDATE_SECONDS } from '../lib/blog.constants';
import type { BlogPost } from '../lib/blog.types';
import {
  mapRawBlogPostToBlogPost,
  mapRawBlogPostsToBlogPosts,
  mapRawBlogSlugsToBlogSlugs,
  type RawBlogPost,
  type RawBlogPostSlug,
} from './blog.mappers';
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POST_SLUGS_QUERY, BLOG_POSTS_QUERY } from './blog.queries';

const revalidateOptions = {
  next: { revalidate: BLOG_REVALIDATE_SECONDS },
} as const;

export async function getBlogPosts(locale: Locale) {
  const posts = await client.fetch<RawBlogPost[]>(BLOG_POSTS_QUERY, { locale }, revalidateOptions);

  return mapRawBlogPostsToBlogPosts(posts);
}

export async function getBlogPostBySlug(locale: Locale, slug: string) {
  const post = await client.fetch<RawBlogPost | null>(
    BLOG_POST_BY_SLUG_QUERY,
    { locale, slug },
    revalidateOptions,
  );

  return post ? mapRawBlogPostToBlogPost(post) : null;
}

export async function getBlogPostSlugs(locale: Locale) {
  const posts = await client.fetch<RawBlogPostSlug[]>(
    BLOG_POST_SLUGS_QUERY,
    { locale },
    revalidateOptions,
  );

  return mapRawBlogSlugsToBlogSlugs(posts);
}

export async function getBlogPostOrThrow(locale: Locale, slug: string): Promise<BlogPost> {
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    throw new Error(`Blog post not found for locale "${locale}" and slug "${slug}"`);
  }

  return post;
}
