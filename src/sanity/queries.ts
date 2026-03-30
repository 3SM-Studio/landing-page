import { defineQuery } from 'next-sanity';

export const BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, publishedAt desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "excerpt": excerpt[language == $locale][0].value,
    category,
    publishedAt,
    readTimeMinutes,
    featured,
    coverImage,
    "coverImageAlt": coverImageAlt[language == $locale][0].value
  }
`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "post" &&
    slug[language == $locale][0].value.current == $slug
  ][0]{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "excerpt": excerpt[language == $locale][0].value,
    category,
    publishedAt,
    readTimeMinutes,
    featured,
    coverImage,
    "coverImageAlt": coverImageAlt[language == $locale][0].value,
    "body": body[language == $locale][0].value,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug[language == $locale][0].value.current)
  ]{
    "slug": slug[language == $locale][0].value.current
  }
`);

export const BLOG_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "post" &&
    count(slug) > 0
  ]{
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);

export const CASE_STUDIES_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, year desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "excerpt": excerpt[language == $locale][0].value,
    "client": client[language == $locale][0].value,
    category,
    year,
    featured,
    "scope": scope[language == $locale][0].value
  }
`);

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    slug[language == $locale][0].value.current == $slug
  ][0]{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "excerpt": excerpt[language == $locale][0].value,
    "client": client[language == $locale][0].value,
    category,
    year,
    featured,
    coverImage,
    "coverImageAlt": coverImageAlt[language == $locale][0].value,
    "scope": scope[language == $locale][0].value,
    "problem": problem[language == $locale][0].value,
    "solution": solution[language == $locale][0].value,
    "result": result[language == $locale][0].value,
    "galleryIntro": galleryIntro[language == $locale][0].value,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    defined(slug[language == $locale][0].value.current)
  ]{
    "slug": slug[language == $locale][0].value.current
  }
`);

export const CASE_STUDY_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    count(slug) > 0
  ]{
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);

export const WORK_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "workProject" &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, year desc) {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "description": description[language == $locale][0].value,
    category,
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
    category,
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
