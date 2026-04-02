import { defineQuery } from 'next-sanity';

const primaryServiceProjection = `
  "primaryService": primaryService->{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    serviceKey
  }
`;

export const WORK_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "workProject" &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, year desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "description": description[language == $locale][0].value,
    ${primaryServiceProjection},
    year,
    featured,
    "services": services[language == $locale][0].value
  }
`);

export const WORK_PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "workProject" &&
    slug[language == $locale][0].value.current == $slug
  ][0]{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "description": description[language == $locale][0].value,
    ${primaryServiceProjection},
    year,
    featured,
    coverImage,
    "coverImageAlt": coverImageAlt[language == $locale][0].value,
    "services": services[language == $locale][0].value,
    "intro": intro[language == $locale][0].value,
    "challenge": challenge[language == $locale][0].value,
    "solution": solution[language == $locale][0].value,
    "outcome": outcome[language == $locale][0].value,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);

export const WORK_PROJECT_SLUGS_QUERY = defineQuery(`
  *[
    _type == "workProject" &&
    defined(slug[language == $locale][0].value.current)
  ]{
    "slug": slug[language == $locale][0].value.current
  }
`);

export const WORK_PROJECT_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "workProject" &&
    count(slug) > 0
  ]{
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
