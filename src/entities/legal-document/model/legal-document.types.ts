import type { PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { Locale } from '@/shared/i18n/routing';

export type LegalDocumentType =
  | 'privacy-policy'
  | 'cookies-policy'
  | 'legal-notice'
  | 'terms-of-service';

export type LegalDocumentTranslation = {
  language: Locale;
  slug: string;
};

export type LegalDocumentSubsection = {
  key: string;
  title: string;
  body: PortableTextBlock[];
  showInTableOfContents: boolean;
};

export type LegalDocumentSection = {
  key: string;
  title: string;
  kind?: string;
  body: PortableTextBlock[];
  showInTableOfContents: boolean;
  subsections: LegalDocumentSubsection[];
};

export type LegalDocumentSeo = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  socialImage?: SanityImageSource | null;
  socialImageAlt?: string;
};

export type LegalDocumentEntry = {
  _id: string;
  documentType: LegalDocumentType;
  locale: Locale;
  title: string;
  summary?: string;
  versionLabel: string;
  effectiveDate: string;
  reviewStatus?: string;
  showTableOfContents: boolean;
  showCompanyCard: boolean;
  sections: LegalDocumentSection[];
  seo?: LegalDocumentSeo;
};
