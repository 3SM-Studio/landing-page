import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';
import type { BrandSocialLinks } from '@/shared/model/social-links';
import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';

export type ClientTranslation = {
  language: Locale;
  slug: string;
};

export type Client = {
  _id: string;
  name: string;
  slug: string;
  clientKey: string;
  logo?: SanityImageSource | null;
  logoAlt?: string;
  shortDescription?: string;
  industry?: string;
  website?: string;
  socialLinks?: BrandSocialLinks;
  featured: boolean;
  isActive: boolean;
  showInTrustedBy?: boolean;
  order?: number;
  translations?: ClientTranslation[];
  seo?: {
    title?: string;
    description?: string;
  };
  relatedCaseStudies?: CaseStudy[];
};

export type ClientSlug = {
  slug: string;
};

export type LinkedClient = Pick<
  Client,
  '_id' | 'name' | 'slug' | 'logo' | 'logoAlt' | 'industry' | 'website' | 'socialLinks'
>;
