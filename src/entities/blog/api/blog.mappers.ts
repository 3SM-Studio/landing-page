import type { BlogCategory, BlogPost, BlogPostSlug } from '../model/blog.types';

type RawBlogCategory = {
  _id: string;
  key: string;
  title: string;
  order?: number | null;
};

type RawBlogPostCategory =
  | {
      key?: string | null;
      title?: string | null;
    }
  | null
  | undefined;

type RawBlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: RawBlogPostCategory;
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

function normalizeOrder(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function mapRawBlogCategory(category: RawBlogCategory): BlogCategory {
  return {
    _id: category._id,
    key: category.key,
    title: category.title,
    order: normalizeOrder(category.order),
  };
}

function mapRawBlogPostCategory(category?: RawBlogPostCategory): BlogPost['category'] {
  if (!category) {
    return undefined;
  }

  const key = cleanOptionalString(category.key);
  const title = cleanOptionalString(category.title);

  if (!key || !title) {
    return undefined;
  }

  return {
    key,
    title,
  };
}

export function mapRawBlogPostToBlogPost(post: RawBlogPost): BlogPost {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: cleanOptionalString(post.excerpt),
    category: mapRawBlogPostCategory(post.category),
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

export function mapRawBlogPostsToBlogPosts(posts: RawBlogPost[]): BlogPost[] {
  return posts.map(mapRawBlogPostToBlogPost);
}

export function mapRawBlogSlugsToBlogSlugs(posts: RawBlogPostSlug[]): BlogPostSlug[] {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function mapRawBlogCategoriesToBlogCategories(
  categories: RawBlogCategory[],
): BlogCategory[] {
  return categories.map(mapRawBlogCategory);
}

export type { RawBlogCategory, RawBlogPost, RawBlogPostSlug };
