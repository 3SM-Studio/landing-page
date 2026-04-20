import { defineQuery } from 'next-sanity';

const primaryServiceProjection = `
  "primaryService": primaryService->{
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "serviceKey": key
  }
`;

const clientProjection = `
  "client": client->{
    _id,
    "name": name,
    "slug": slug[language == $locale][0].value.current,
    logo,
    "logoAlt": logo.alt[language == $locale][0].value,
    "industry": industry[language == $locale][0].value,
    "website": links.website,
    "socialLinks": {
      "instagram": links.socialLinks[platform == "instagram"][0].url,
      "facebook": links.socialLinks[platform == "facebook"][0].url,
      "x": links.socialLinks[platform == "x"][0].url,
      "linkedin": links.socialLinks[platform == "linkedin"][0].url,
      "youtube": links.socialLinks[platform == "youtube"][0].url,
      "tiktok": links.socialLinks[platform == "tiktok"][0].url
    }
  }
`;

const partnersProjection = `
  "partners": partners[]->{
    _id,
    "name": name,
    "slug": slug[language == $locale][0].value.current,
    logo,
    "logoAlt": logo.alt[language == $locale][0].value,
    "partnershipType": partnershipType[language == $locale][0].value
  }
`;

const caseStudyProjection = `
  _id,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "excerpt": excerpt[language == $locale][0].value,
  ${clientProjection},
  ${partnersProjection},
  ${primaryServiceProjection},
  year,
  "isFeaturedGlobal": isFeaturedGlobal,
  "isFeaturedInPrimaryService": isFeaturedInPrimaryService,
  "featured": coalesce(isFeaturedGlobal, false) || coalesce(isFeaturedInPrimaryService, false),
  "scope": scope[language == $locale][0].value
`;

export const CASE_STUDIES_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(isFeaturedGlobal desc, year desc) {
    ${caseStudyProjection}
  }
`);

export const CASE_STUDY_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    isActive == true &&
    slug[language == $locale][0].value.current == $slug
  ][0]{
    ${caseStudyProjection},
    "coverImage": coverImage.image,
    "coverImageAlt": coverImage.alt[language == $locale][0].value,
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
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ]{
    "slug": slug[language == $locale][0].value.current
  }
`);

export const CASE_STUDY_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "caseStudy" &&
    isActive == true &&
    count(slug) > 0
  ]{
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
