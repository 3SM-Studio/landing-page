import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';
import type { BrandSocialLinks } from '@/shared/model/social-links';
import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';

export type PartnerTranslation = {
  language: Locale;
  slug: string;
};

export type Partner = {
  _id: string;
  name: string;
  slug: string;
  partnerKey: string;
  logo?: SanityImageSource | null;
  logoAlt?: string;
  partnershipType?: string;
  shortDescription?: string;
  website?: string;
  socialLinks?: BrandSocialLinks;
  featured: boolean;
  isActive: boolean;
  showOnPublicPage?: boolean;
  order?: number;
  translations?: PartnerTranslation[];
  seo?: {
    title?: string;
    description?: string;
  };
  relatedCaseStudies?: CaseStudy[];
};

export type PartnerSlug = {
  slug: string;
};

export type LinkedPartner = Pick<
  Partner,
  '_id' | 'name' | 'slug' | 'logo' | 'logoAlt' | 'partnershipType'
>;
