import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from 'next-sanity';
import type { Locale } from '@/shared/i18n/routing';

export type ServiceTranslation = {
  language: Locale;
  slug: string;
};

export type LinkedService = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
};

export type ServiceLinkedItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  year?: number;
  featured?: boolean;
  primaryService?: LinkedService;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
  shortDescription?: string;
  intro?: PortableTextBlock[];
  deliverables?: string[];
  featured: boolean;
  isActive: boolean;
  contactEnabled: boolean;
  order?: number;
  coverImage?: SanityImageSource | null;
  coverImageAlt?: string;
  translations?: ServiceTranslation[];
  relatedWorkProjects?: ServiceLinkedItem[];
  relatedCaseStudies?: ServiceLinkedItem[];
};

export type ServiceSlug = {
  slug: string;
};

export type ContactServiceOption = {
  _id: string;
  title: string;
  slug: string;
  serviceKey: string;
};
