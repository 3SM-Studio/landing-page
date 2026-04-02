import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import type { Locale } from '@/shared/i18n/routing';
import { BLOG_REVALIDATE_SECONDS } from '../model/blog.constants';
import type { BlogCategory, BlogPost } from '../model/blog.types';
import {
  mapRawBlogCategoriesToBlogCategories,
  mapRawBlogPostToBlogPost,
  mapRawBlogPostsToBlogPosts,
  mapRawBlogSlugsToBlogSlugs,
  type RawBlogCategory,
  type RawBlogPost,
  type RawBlogPostSlug,
} from './blog.mappers';
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
} from './blog.queries';

const blogFetchOptions = {
  revalidate: BLOG_REVALIDATE_SECONDS,
  tags: [sanityTags.blog],
} as const;

export async function getBlogCategories(locale: Locale): Promise<BlogCategory[]> {
  const categories = await sanityFetch<RawBlogCategory[]>(
    BLOG_CATEGORIES_QUERY,
    { locale },
    blogFetchOptions,
  );

  return mapRawBlogCategoriesToBlogCategories(categories);
}

export async function getBlogPosts(locale: Locale) {
  const posts = await sanityFetch<RawBlogPost[]>(BLOG_POSTS_QUERY, { locale }, blogFetchOptions);

  return mapRawBlogPostsToBlogPosts(posts);
}

export async function getBlogPostBySlug(locale: Locale, slug: string) {
  const post = await sanityFetch<RawBlogPost | null>(
    BLOG_POST_BY_SLUG_QUERY,
    { locale, slug },
    blogFetchOptions,
  );

  return post ? mapRawBlogPostToBlogPost(post) : null;
}

export async function getBlogPostSlugs(locale: Locale) {
  const posts = await sanityFetch<RawBlogPostSlug[]>(
    BLOG_POST_SLUGS_QUERY,
    { locale },
    blogFetchOptions,
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
