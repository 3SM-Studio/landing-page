import { defineQuery } from 'next-sanity';

const brandLocationProjection = `
  "location": {
    "city": location.city,
    "country": location.country
  }
`;

const featuredMediaProjection = `
  "featuredMedia": featuredMedia[]{
    _key,
    asset,
    alt,
    caption
  }
`;

const partnerCardProjection = `
  _id,
  "name": name[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  partnerKey,
  logo,
  "logoAlt": logoAlt[language == $locale][0].value,
  bannerImage,
  "bannerImageAlt": bannerImageAlt[language == $locale][0].value,
  "tagline": tagline[language == $locale][0].value,
  "partnershipType": partnershipType[language == $locale][0].value,
  "shortDescription": shortDescription[language == $locale][0].value,
  ${brandLocationProjection},
  website,
  socialLinks,
  featured,
  isActive,
  showOnPublicPage,
  order
`;

const relatedCaseStudyProjection = `
  _id,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "excerpt": excerpt[language == $locale][0].value,
  "client": client-> {
    _id,
    "name": name[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    logo,
    "logoAlt": logoAlt[language == $locale][0].value,
    "industry": industry[language == $locale][0].value,
    website,
    socialLinks
  },
  "primaryService": primaryService-> {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    serviceKey
  },
  year,
  featured,
  "scope": scope[language == $locale][0].value
`;

export const PARTNERS_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showOnPublicPage == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, order asc, _createdAt desc) {
    ${partnerCardProjection}
  }
`);

export const PARTNER_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showOnPublicPage == true &&
    defined(slug[language == $locale][0].value.current) &&
    slug[language == $locale][0].value.current == $slug
  ][0] {
    ${partnerCardProjection},
    "collaborationSummary": collaborationSummary[language == $locale][0].value,
    ${featuredMediaProjection},
    "translations": slug[]{
      language,
      "slug": value.current
    },
    "seo": {
      "title": seo.title[language == $locale][0].value,
      "description": seo.description[language == $locale][0].value
    },
    "relatedCaseStudies": *[
      _type == "caseStudy" &&
      defined(slug[language == $locale][0].value.current) &&
      ^._id in partners[]._ref
    ] | order(featured desc, year desc, _createdAt desc) {
      ${relatedCaseStudyProjection}
    }
  }
`);

export const PARTNER_SLUGS_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showOnPublicPage == true &&
    defined(slug[language == $locale][0].value.current)
  ] {
    "slug": slug[language == $locale][0].value.current
  }
`);

export const PARTNER_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showOnPublicPage == true
  ] {
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
