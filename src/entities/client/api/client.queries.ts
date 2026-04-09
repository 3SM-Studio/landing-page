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

const clientCardProjection = `
  _id,
  "name": name[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  clientKey,
  logo,
  "logoAlt": logoAlt[language == $locale][0].value,
  bannerImage,
  "bannerImageAlt": bannerImageAlt[language == $locale][0].value,
  "tagline": tagline[language == $locale][0].value,
  "shortDescription": shortDescription[language == $locale][0].value,
  "industry": industry[language == $locale][0].value,
  ${brandLocationProjection},
  website,
  socialLinks,
  featured,
  isActive,
  showInTrustedBy,
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

export const CLIENTS_QUERY = defineQuery(`
  *[
    _type == "client" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, order asc, _createdAt desc) {
    ${clientCardProjection}
  }
`);

export const TRUSTED_CLIENTS_QUERY = defineQuery(`
  *[
    _type == "client" &&
    isActive == true &&
    showInTrustedBy == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(order asc, featured desc, _createdAt desc)[0...12] {
    ${clientCardProjection}
  }
`);

export const CLIENT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "client" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current) &&
    slug[language == $locale][0].value.current == $slug
  ][0] {
    ${clientCardProjection},
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
      client._ref == ^._id
    ] | order(featured desc, year desc, _createdAt desc) {
      ${relatedCaseStudyProjection}
    }
  }
`);

export const CLIENT_SLUGS_QUERY = defineQuery(`
  *[
    _type == "client" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] {
    "slug": slug[language == $locale][0].value.current
  }
`);

export const CLIENT_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "client" &&
    isActive == true
  ] {
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
