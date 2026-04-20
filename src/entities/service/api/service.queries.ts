import { defineQuery } from 'next-sanity';

const linkedCaseStudyProjection = `
  _id,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "description": excerpt[language == $locale][0].value,
  year,
  "isFeaturedGlobal": isFeaturedGlobal,
  "isFeaturedInPrimaryService": isFeaturedInPrimaryService,
  "featured": coalesce(isFeaturedGlobal, false) || coalesce(isFeaturedInPrimaryService, false),
  "primaryService": primaryService->{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "serviceKey": key
  }
`;

export const SERVICES_QUERY = defineQuery(`
  *[
    _type == "service" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, _createdAt desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "serviceKey": key,
    "shortDescription": shortDescription[language == $locale][0].value,
    featured,
    isActive,
    contactEnabled,
    "coverImage": coverImage.image,
    "coverImageAlt": coverImage.alt[language == $locale][0].value
  }
`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "service" &&
    defined(slug[language == $locale][0].value.current) &&
    slug[language == $locale][0].value.current == $slug
  ][0]{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "serviceKey": key,
    "shortDescription": shortDescription[language == $locale][0].value,
    "intro": intro[language == $locale][0].value,
    "deliverables": deliverables[language == $locale][0].value,
    featured,
    isActive,
    contactEnabled,
    "coverImage": coverImage.image,
    "coverImageAlt": coverImage.alt[language == $locale][0].value,
    "translations": slug[]{
      language,
      "slug": value.current
    },
    "relatedCaseStudies": *[
      _type == "caseStudy" &&
      isActive == true &&
      defined(slug[language == $locale][0].value.current) &&
      (
        primaryService._ref == ^._id ||
        ^._id in relatedServices[]._ref
      )
    ] | order(isFeaturedGlobal desc, isFeaturedInPrimaryService desc, year desc, _createdAt desc) {
      ${linkedCaseStudyProjection}
    }
  }
`);

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[
    _type == "service" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ]{
    "slug": slug[language == $locale][0].value.current
  }
`);

export const CONTACT_ENABLED_SERVICES_QUERY = defineQuery(`
  *[
    _type == "service" &&
    isActive == true &&
    contactEnabled == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, _createdAt desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "serviceKey": key
  }
`);

export const SERVICE_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "service" &&
    isActive == true
  ]{
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
