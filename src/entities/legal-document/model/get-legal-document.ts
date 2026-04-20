import type { Locale } from '@/shared/i18n/routing';
import { getLegalDocumentByType } from '@/entities/legal-document/api/legal-document.repository';
import type { LegalDocumentEntry, LegalDocumentType } from './legal-document.types';

const LEGAL_DOCUMENT_TYPE_BY_SLUG = {
  'privacy-policy': 'privacy-policy',
  'cookies-policy': 'cookies-policy',
  'legal-notice': 'legal-notice',
  'terms-of-service': 'terms-of-service',
} as const satisfies Record<string, LegalDocumentType>;

export async function getLegalDocument(
  locale: Locale,
  slug: string,
): Promise<LegalDocumentEntry | null> {
  const documentType =
    LEGAL_DOCUMENT_TYPE_BY_SLUG[slug as keyof typeof LEGAL_DOCUMENT_TYPE_BY_SLUG];

  if (!documentType) {
    return null;
  }

  return getLegalDocumentByType(locale, documentType);
}
