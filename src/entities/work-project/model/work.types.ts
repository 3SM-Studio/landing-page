import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';
import type { ServiceFilterItem } from '@/entities/service/model/service.filters';
import type { LinkedService } from '@/entities/service/model/service.types';

export type WorkFilterItem = ServiceFilterItem;

export type WorkProjectTranslation = {
  language: Locale;
  slug: string;
};

export type WorkProject = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  primaryService?: LinkedService;
  year?: number;
  featured: boolean;
  coverImage?: SanityImageSource | null;
  coverImageAlt?: string;
  services?: string[];
  intro?: PortableTextBlock[];
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  outcome?: PortableTextBlock[];
  translations?: WorkProjectTranslation[];
};

export type WorkProjectSlug = {
  slug: string;
};

export type WorkListCopy = {
  badge: string;
  title: string;
  description: string;
  featuredLabel: string;
  featuredHint: string;
  viewProject: string;
  empty: string;
};

export type WorkDetailCopy = {
  backToWork: string;
  challengeTitle: string;
  challengeEmpty: string;
  solutionTitle: string;
  solutionEmpty: string;
  outcomeTitle: string;
  outcomeEmpty: string;
  galleryTitle: string;
  galleryEmpty: string;
  notFound: string;
};

export type WorkListPresentation = {
  featuredItem?: WorkProject;
  items: WorkProject[];
  showFeatured: boolean;
};
