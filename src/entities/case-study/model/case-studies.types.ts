import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';
import type { ServiceFilterItem } from '@/entities/service/model/service.filters';
import type { LinkedService } from '@/entities/service/model/service.types';
import type { LinkedClient } from '@/entities/client/model/client.types';
import type { LinkedPartner } from '@/entities/partner/model/partner.types';

export type CaseStudiesFilterItem = ServiceFilterItem;

export type CaseStudyTranslation = {
  language: Locale;
  slug: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  client?: LinkedClient;
  partners?: LinkedPartner[];
  primaryService?: LinkedService;
  year?: number;
  featured: boolean;
  isFeaturedGlobal?: boolean;
  isFeaturedInPrimaryService?: boolean;
  coverImage?: SanityImageSource | null;
  coverImageAlt?: string;
  scope?: string[];
  problem?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  result?: PortableTextBlock[];
  galleryIntro?: PortableTextBlock[];
  translations?: CaseStudyTranslation[];
};

export type CaseStudySlug = {
  slug: string;
};

export type CaseStudiesListCopy = {
  badge: string;
  title: string;
  description: string;
  featuredLabel: string;
  featuredHint: string;
  clientLabel: string;
  viewCase: string;
  empty: string;
};

export type CaseStudyDetailCopy = {
  backToCaseStudies: string;
  problemTitle: string;
  problemEmpty: string;
  solutionTitle: string;
  solutionEmpty: string;
  resultTitle: string;
  resultEmpty: string;
  galleryTitle: string;
  galleryEmpty: string;
  clientTitle: string;
  partnersTitle: string;
  websiteLabel: string;
  viewClient: string;
  viewPartner: string;
  notFound: string;
};

export type CaseStudiesListPresentation = {
  featuredItem?: CaseStudy;
  items: CaseStudy[];
  showFeatured: boolean;
};
