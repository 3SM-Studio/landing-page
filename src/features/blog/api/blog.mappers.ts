import type { BlogPost, BlogPostSlug } from '../lib/blog.types';

type RawBlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  readTimeMinutes?: number | null;
  featured?: boolean | null;
  coverImage?: BlogPost['coverImage'];
  coverImageAlt?: string | null;
  body?: BlogPost['body'] | null;
  translations?: BlogPost['translations'] | null;
};

type RawBlogPostSlug = {
  slug: string;
};

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

function normalizeReadTime(value: number | null | undefined) {
  return typeof value === 'number' && value > 0 ? value : undefined;
}

export function mapRawBlogPostToBlogPost(post: RawBlogPost): BlogPost {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: cleanOptionalString(post.excerpt),
    category: cleanOptionalString(post.category),
    publishedAt: cleanOptionalString(post.publishedAt),
    readTimeMinutes: normalizeReadTime(post.readTimeMinutes),
    featured: Boolean(post.featured),
    coverImage: post.coverImage ?? null,
    coverImageAlt: cleanOptionalString(post.coverImageAlt),
    body: Array.isArray(post.body) && post.body.length > 0 ? post.body : undefined,
    translations:
      Array.isArray(post.translations) && post.translations.length > 0
        ? post.translations
        : undefined,
  };
}

export function mapRawBlogPostsToBlogPosts(posts: RawBlogPost[]) {
  return posts.map(mapRawBlogPostToBlogPost);
}

export function mapRawBlogSlugsToBlogSlugs(posts: RawBlogPostSlug[]): BlogPostSlug[] {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export type { RawBlogPost, RawBlogPostSlug };
