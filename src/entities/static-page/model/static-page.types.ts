import type { PortableTextBlock } from 'next-sanity';
import type { Locale } from '@/shared/i18n/routing';

export type StaticPageKey =
  | 'home'
  | 'about'
  | 'contact'
  | 'services'
  | 'case-studies'
  | 'blog'
  | 'clients'
  | 'partners';

export type StaticPageSeo = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export type StaticPageCta = {
  label: string;
  href: string;
  openInNewTab: boolean;
};

export type StaticPageFeatureItem = {
  key: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  summary?: string;
  listItems?: string[];
  href?: string;
  isHighlighted: boolean;
};

export type StaticPageSection = {
  key: string;
  variant: string;
  eyebrow?: string;
  title: string;
  summary?: string;
  body?: PortableTextBlock[];
  highlights?: string[];
  showInPageNavigation: boolean;
  items?: StaticPageFeatureItem[];
};

export type StaticPage = {
  pageKey: StaticPageKey;
  locale: Locale;
  title: string;
  eyebrow?: string;
  hero: {
    badge?: string;
    title: string;
    description: string;
    primaryCta?: StaticPageCta;
    secondaryCta?: StaticPageCta;
  };
  heroSummary?: string;
  intro?: PortableTextBlock[];
  sections: StaticPageSection[];
  seo?: StaticPageSeo;
  showPageNavigation: boolean;
};
