import { defineQuery } from 'next-sanity';

const linkedCaseStudyProjection = `{
  _id,
  _type,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "description": excerpt[language == $locale][0].value
}`;

const linkedPostProjection = `{
  _id,
  _type,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "description": excerpt[language == $locale][0].value
}`;

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[
    _type == "teamMember" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, _createdAt asc) {
    _id,
    name,
    "slug": slug[language == $locale][0].value.current,
    "memberKey": key,
    "role": role[language == $locale][0].value,
    "tagline": tagline[language == $locale][0].value,
    avatar,
    "avatarAlt": avatar.alt[language == $locale][0].value,
    "shortBio": shortBio[language == $locale][0].value,
    featured,
    isActive
  }
`);

export const TEAM_MEMBER_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "teamMember" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current) &&
    slug[language == $locale][0].value.current == $slug
  ][0] {
    _id,
    name,
    "slug": slug[language == $locale][0].value.current,
    "memberKey": key,
    "role": role[language == $locale][0].value,
    "tagline": tagline[language == $locale][0].value,
    avatar,
    "avatarAlt": avatar.alt[language == $locale][0].value,
    "shortBio": shortBio[language == $locale][0].value,
    "intro": intro[language == $locale][0].value,
    "specialties": specialties[language == $locale][0].value,
    "experience": experience[language == $locale][0].value,
    "quote": quote[language == $locale][0].value,
    "email": links.email,
    "links": {
      "website": links.website,
      "instagram": links.socialLinks[platform == "instagram"][0].url,
      "x": links.socialLinks[platform == "x"][0].url,
      "youtube": links.socialLinks[platform == "youtube"][0].url,
      "tiktok": links.socialLinks[platform == "tiktok"][0].url,
      "github": links.socialLinks[platform == "github"][0].url,
      "linkedin": links.socialLinks[platform == "linkedin"][0].url
    },
    featured,
    isActive,
    "translations": slug[]{
      language,
      "slug": value.current
    },
    "featuredCaseStudies": featuredCaseStudies[]->${linkedCaseStudyProjection},
    "featuredPosts": featuredPosts[]->${linkedPostProjection},
    "seo": {
      "title": seo.title[language == $locale][0].value,
      "description": seo.description[language == $locale][0].value,
      "socialImage": seo.socialImage,
      "socialImageAlt": seo.socialImage.alt[language == $locale][0].value
    }
  }
`);

export const TEAM_MEMBER_SLUGS_QUERY = defineQuery(`
  *[
    _type == "teamMember" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] {
    "slug": slug[language == $locale][0].value.current
  }
`);

export const TEAM_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "teamMember" &&
    isActive == true
  ] {
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
