import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';

export type TeamMemberTranslation = {
  language: Locale;
  slug: string;
};

export type TeamMemberLinkSet = {
  website?: string;
  instagram?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
  github?: string;
  linkedin?: string;
};

export type TeamMemberFeaturedProject = {
  _id: string;
  _type: 'workProject' | 'caseStudy' | 'post';
  title: string;
  slug: string;
  description?: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  slug: string;
  memberKey: string;
  role: string;
  tagline: string;
  avatar?: SanityImageSource | null;
  avatarAlt?: string;
  shortBio?: string;
  intro?: PortableTextBlock[];
  specialties?: string[];
  experience?: PortableTextBlock[];
  quote?: string;
  email?: string;
  links?: TeamMemberLinkSet;
  featuredProjects?: TeamMemberFeaturedProject[];
  order?: number;
  featured: boolean;
  isActive: boolean;
  translations?: TeamMemberTranslation[];
  seo?: {
    title?: string;
    description?: string;
    socialImage?: SanityImageSource | null;
    socialImageAlt?: string;
  };
};

export type TeamMemberSlug = {
  slug: string;
};
