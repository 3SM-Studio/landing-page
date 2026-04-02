import { defineQuery } from 'next-sanity';

export const SERVICES_QUERY = defineQuery(`
  *[
    _type == "service" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(order asc, featured desc, _createdAt desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    serviceKey,
    "shortDescription": shortDescription[language == $locale][0].value,
    featured,
    isActive,
    contactEnabled,
    order,
    coverImage,
    "coverImageAlt": coverImageAlt[language == $locale][0].value
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
    serviceKey,
    "shortDescription": shortDescription[language == $locale][0].value,
    "intro": intro[language == $locale][0].value,
    "deliverables": deliverables[language == $locale][0].value,
    featured,
    isActive,
    contactEnabled,
    order,
    coverImage,
    "coverImageAlt": coverImageAlt[language == $locale][0].value,
    "translations": slug[]{
      language,
      "slug": value.current
    },

    "relatedWorkProjects": *[
      _type == "workProject" &&
      defined(slug[language == $locale][0].value.current) &&
      (
        primaryService._ref == ^._id ||
        ^._id in relatedServices[]._ref
      )
    ] | order(featured desc, year desc, _createdAt desc) {
      _id,
      "title": title[language == $locale][0].value,
      "slug": slug[language == $locale][0].value.current,
      "description": description[language == $locale][0].value,
      year,
      featured,
      "primaryService": primaryService->{
        _id,
        "title": title[language == $locale][0].value,
        "slug": slug[language == $locale][0].value.current,
        serviceKey
      }
    },

    "relatedCaseStudies": *[
      _type == "caseStudy" &&
      defined(slug[language == $locale][0].value.current) &&
      (
        primaryService._ref == ^._id ||
        ^._id in relatedServices[]._ref
      )
    ] | order(featured desc, year desc, _createdAt desc) {
      _id,
      "title": title[language == $locale][0].value,
      "slug": slug[language == $locale][0].value.current,
      "description": excerpt[language == $locale][0].value,
      year,
      featured,
      "primaryService": primaryService->{
        _id,
        "title": title[language == $locale][0].value,
        "slug": slug[language == $locale][0].value.current,
        serviceKey
      }
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
  ] | order(order asc, featured desc, _createdAt desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    serviceKey
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
