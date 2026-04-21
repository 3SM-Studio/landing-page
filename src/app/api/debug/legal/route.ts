import { NextResponse } from 'next/server';
import { defineQuery } from 'next-sanity';

import { client, liveClient } from '@/shared/sanity/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DEBUG_LEGAL_QUERY = defineQuery(`
  *[
    _type == "legalDocument" &&
    documentType == $documentType
  ] | order(_updatedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    isActive,
    documentType,
    reviewStatus,
    versionLabel,
    effectiveDate,
    showTableOfContents,
    showCompanyCard,
    "titlePl": title[language == "pl"][0].value,
    "titleEn": title[language == "en"][0].value,
    "summaryPl": summary[language == "pl"][0].value,
    "summaryEn": summary[language == "en"][0].value,
    "slugPl": slug[language == "pl"][0].value.current,
    "slugEn": slug[language == "en"][0].value.current,
    "sectionCount": count(sections),
    "sectionsPl": sections[]{
      _key,
      key,
      kind,
      "title": title[language == "pl"][0].value,
      "body": body[language == "pl"][0].value
    },
    "sectionsEn": sections[]{
      _key,
      key,
      kind,
      "title": title[language == "en"][0].value,
      "body": body[language == "en"][0].value
    }
  }
`);

const DEBUG_MAPPED_QUERY = defineQuery(`
  *[
    _type == "legalDocument" &&
    isActive == true &&
    documentType == $documentType
  ][0]{
    _id,
    documentType,
    "title": title[language == $locale][0].value,
    "summary": summary[language == $locale][0].value,
    versionLabel,
    effectiveDate,
    reviewStatus,
    showTableOfContents,
    showCompanyCard,
    "sections": sections[]{
      "key": key,
      "title": title[language == $locale][0].value,
      kind,
      "body": body[language == $locale][0].value,
      showInTableOfContents
    }
  }
`);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentType = searchParams.get('documentType') ?? 'cookies-policy';
  const locale = searchParams.get('locale') ?? 'pl';

  const [cdnRaw, liveRaw, cdnMapped, liveMapped] = await Promise.all([
    client.fetch(DEBUG_LEGAL_QUERY, { documentType }),
    liveClient.fetch(DEBUG_LEGAL_QUERY, { documentType }),
    client.fetch(DEBUG_MAPPED_QUERY, { documentType, locale }),
    liveClient.fetch(DEBUG_MAPPED_QUERY, { documentType, locale }),
  ]);

  return NextResponse.json({
    query: { documentType, locale },
    sanity: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? null,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? null,
      nodeEnv: process.env.NODE_ENV ?? null,
    },
    cdnClient: {
      useCdn: true,
      rawMatches: cdnRaw,
      mappedResult: cdnMapped,
    },
    liveClient: {
      useCdn: false,
      rawMatches: liveRaw,
      mappedResult: liveMapped,
    },
  });
}
