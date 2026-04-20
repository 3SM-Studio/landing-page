import { defineQuery } from 'next-sanity';

export const LEGAL_DOCUMENT_BY_TYPE_QUERY = defineQuery(`
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
    },
    "seo": {
      "title": seo.title[language == $locale][0].value,
      "description": seo.description[language == $locale][0].value,
      "ogTitle": seo.ogTitle[language == $locale][0].value,
      "ogDescription": seo.ogDescription[language == $locale][0].value,
      "canonicalUrl": seo.canonicalUrl,
      "noIndex": seo.noIndex,
      "noFollow": seo.noFollow,
      "socialImage": seo.socialImage,
      "socialImageAlt": seo.socialImage.alt[language == $locale][0].value
    }
  }
`);
