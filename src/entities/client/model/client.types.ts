import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';
import type { BrandSocialLinks } from '@/shared/model/social-links';

export type BrandLocation = {
  city?: string;
  country?: string;
};

export type BrandProfileMediaItem = {
  _key: string;
  asset: SanityImageSource | null;
  alt?: string;
  caption?: string;
};

export type ClientTranslation = {
  language?: string;
  slug?: string;
};

export type ClientSeo = {
  title?: string;
  description?: string;
  image?: SanityImageSource | null;
};

export type Client = {
  _id: string;
  name: string;
  slug: string;
  clientKey: string;
  logo: SanityImageSource | null;
  logoAlt?: string;
  bannerImage?: SanityImageSource | null;
  bannerImageAlt?: string;
  tagline?: string;
  shortDescription?: string;
  industry?: string;
  location?: BrandLocation;
  collaborationSummary?: PortableTextBlock[];
  featuredMedia?: BrandProfileMediaItem[];
  website?: string;
  socialLinks?: BrandSocialLinks;
  featured: boolean;
  isActive: boolean;
  showInTrustedBy: boolean;
  order?: number;
  translations?: ClientTranslation[];
  seo?: ClientSeo;
  relatedCaseStudies?: CaseStudy[];
};

export type ClientSlug = {
  slug: string;
};

export type LinkedClient = {
  _id: string;
  name: string;
  slug: string;
  logo: SanityImageSource | null;
  logoAlt?: string;
  bannerImage?: SanityImageSource | null;
  bannerImageAlt?: string;
  industry?: string;
  website?: string;
  socialLinks?: BrandSocialLinks;
};
