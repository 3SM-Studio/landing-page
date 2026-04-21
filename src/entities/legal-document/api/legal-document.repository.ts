import 'server-only';

import type { Locale } from '@/shared/i18n/routing';
import { client } from '@/shared/sanity/client';
import { mapRawLegalDocumentToEntry } from './legal-document.mappers';
import { LEGAL_DOCUMENT_BY_TYPE_QUERY } from './legal-document.queries';
import type { LegalDocumentEntry, LegalDocumentType } from '../model/legal-document.types';

export async function getLegalDocumentByType(
  locale: Locale,
  documentType: LegalDocumentType,
): Promise<LegalDocumentEntry | null> {
  const rawDocument = await client.fetch(LEGAL_DOCUMENT_BY_TYPE_QUERY, {
    locale,
    documentType,
  });

  return mapRawLegalDocumentToEntry(locale, rawDocument);
}
