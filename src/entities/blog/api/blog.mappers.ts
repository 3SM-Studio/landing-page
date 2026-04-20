import type { BlogCategory, BlogPost, BlogPostSlug } from '../model/blog.types';

export type RawBlogCategory = {
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

export type RawBlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: RawBlogPostCategory;
  publishedAt?: string | null;
  readTimeMinutes?: number | null;
  featured?: boolean | null;
  isFeaturedGlobal?: boolean | null;
  isFeaturedInCategory?: boolean | null;
  coverImage?: BlogPost['coverImage'];
  coverImageAlt?: string | null;
  body?: BlogPost['body'] | null;
  translations?: BlogPost['translations'] | null;
};

export type RawBlogPostSlug = {
  slug: string;
};

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeNumber(value: number | null | undefined) {
  return typeof value === 'number' ? value : undefined;
}

function mapRawBlogPostCategory(category: RawBlogPostCategory): BlogPost['category'] {
  if (!category?.key || !category.title) {
    return undefined;
  }

  return {
    key: category.key,
    title: category.title,
  };
}

export function mapRawBlogCategoryToBlogCategory(item: RawBlogCategory): BlogCategory {
  return {
    _id: item._id,
    key: item.key,
    title: item.title,
    order: normalizeNumber(item.order),
  };
}

export function mapRawBlogCategoriesToBlogCategories(items: RawBlogCategory[]) {
  return items.map(mapRawBlogCategoryToBlogCategory);
}

export function mapRawBlogPostToBlogPost(post: RawBlogPost): BlogPost {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: cleanOptionalString(post.excerpt),
    category: mapRawBlogPostCategory(post.category),
    publishedAt: cleanOptionalString(post.publishedAt),
    readTimeMinutes: normalizeNumber(post.readTimeMinutes),
    featured: Boolean(post.featured),
    isFeaturedGlobal: Boolean(post.isFeaturedGlobal),
    isFeaturedInCategory: Boolean(post.isFeaturedInCategory),
    coverImage: post.coverImage ?? null,
    coverImageAlt: cleanOptionalString(post.coverImageAlt),
    body: Array.isArray(post.body) && post.body.length > 0 ? post.body : undefined,
    translations:
      Array.isArray(post.translations) && post.translations.length > 0
        ? post.translations
        : undefined,
  };
}

export function mapRawBlogPostsToBlogPosts(items: RawBlogPost[]) {
  return items.map(mapRawBlogPostToBlogPost);
}

export function mapRawBlogPostSlugsToBlogPostSlugs(items: RawBlogPostSlug[]): BlogPostSlug[] {
  return items.map((item) => ({
    slug: item.slug,
  }));
}
