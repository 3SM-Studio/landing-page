import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';

export type CaseStudiesFilterItem = {
  key: string;
  label: string;
};

export type CaseStudyTranslation = {
  language: Locale;
  slug: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  client?: string;
  category?: string;
  year?: number;
  featured: boolean;
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
  notFound: string;
};

export type CaseStudiesListPresentation = {
  featuredItem?: CaseStudy;
  items: CaseStudy[];
  showFeatured: boolean;
};
