import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';

export type BlogFilterItem = {
  key: string;
  label: string;
};

export type BlogCategory = {
  _id: string;
  key: string;
  title: string;
  order?: number;
};

export type BlogPostCategory = Pick<BlogCategory, 'key' | 'title'>;

export type BlogPostTranslation = {
  language: Locale;
  slug: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: BlogPostCategory;
  publishedAt?: string;
  readTimeMinutes?: number;
  featured: boolean;
  coverImage?: SanityImageSource | null;
  coverImageAlt?: string;
  body?: PortableTextBlock[];
  translations?: BlogPostTranslation[];
};

export type BlogPostSlug = {
  slug: string;
};

export type BlogListCopy = {
  badge: string;
  title: string;
  description: string;
  featuredLabel: string;
  featuredHint: string;
  readMore: string;
  empty: string;
};

export type BlogDetailCopy = {
  backToBlog: string;
  emptyBody: string;
};

export type BlogListPresentation = {
  featuredPost?: BlogPost;
  posts: BlogPost[];
  showFeatured: boolean;
};
