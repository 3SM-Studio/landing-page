import type { Locale } from '@/shared/i18n/routing';
import type { LegalDocumentEntry } from '../model/legal-document.types';

type RawLegalDocumentSubsection = {
  key?: string | null;
  title?: string | null;
  body?: LegalDocumentEntry['sections'][number]['body'] | null;
  showInTableOfContents?: boolean | null;
};

type RawLegalDocumentSection = {
  key?: string | null;
  title?: string | null;
  kind?: string | null;
  body?: LegalDocumentEntry['sections'][number]['body'] | null;
  showInTableOfContents?: boolean | null;
  subsections?: RawLegalDocumentSubsection[] | null;
};

type RawLegalDocument = Omit<LegalDocumentEntry, 'locale' | 'sections'> & {
  title?: string | null;
  summary?: string | null;
  effectiveDate?: string | null;
  reviewStatus?: string | null;
  versionLabel?: string | null;
  showTableOfContents?: boolean | null;
  showCompanyCard?: boolean | null;
  sections?: RawLegalDocumentSection[] | null;
};

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function mapRawLegalDocumentToEntry(
  locale: Locale,
  value: RawLegalDocument | null | undefined,
): LegalDocumentEntry | null {
  if (
    !value?._id ||
    !value.documentType ||
    !value.title ||
    !value.versionLabel ||
    !value.effectiveDate
  ) {
    return null;
  }

  const sections = (value.sections ?? []).flatMap((section) => {
    const key = cleanOptionalString(section.key);
    const title = cleanOptionalString(section.title);
    const body = Array.isArray(section.body) ? section.body : undefined;

    if (!key || !title || !body?.length) {
      return [];
    }

    const subsections = (section.subsections ?? []).flatMap((subsection) => {
      const subsectionKey = cleanOptionalString(subsection.key);
      const subsectionTitle = cleanOptionalString(subsection.title);
      const subsectionBody = Array.isArray(subsection.body) ? subsection.body : undefined;

      if (!subsectionKey || !subsectionTitle || !subsectionBody?.length) {
        return [];
      }

      return [
        {
          key: subsectionKey,
          title: subsectionTitle,
          body: subsectionBody,
          showInTableOfContents: subsection.showInTableOfContents !== false,
        },
      ];
    });

    return [
      {
        key,
        title,
        kind: cleanOptionalString(section.kind),
        body,
        showInTableOfContents: section.showInTableOfContents !== false,
        subsections,
      },
    ];
  });

  if (sections.length === 0) {
    return null;
  }

  return {
    _id: value._id,
    documentType: value.documentType,
    locale,
    title: value.title,
    summary: cleanOptionalString(value.summary),
    versionLabel: value.versionLabel,
    effectiveDate: value.effectiveDate,
    reviewStatus: cleanOptionalString(value.reviewStatus),
    showTableOfContents: value.showTableOfContents !== false,
    showCompanyCard: value.showCompanyCard === true,
    sections,
    seo: value.seo
      ? {
          title: cleanOptionalString(value.seo.title),
          description: cleanOptionalString(value.seo.description),
          ogTitle: cleanOptionalString(value.seo.ogTitle),
          ogDescription: cleanOptionalString(value.seo.ogDescription),
          canonicalUrl: cleanOptionalString(value.seo.canonicalUrl),
          noIndex: value.seo.noIndex === true,
          noFollow: value.seo.noFollow === true,
          socialImage: value.seo.socialImage ?? null,
          socialImageAlt: cleanOptionalString(value.seo.socialImageAlt),
        }
      : undefined,
  };
}
