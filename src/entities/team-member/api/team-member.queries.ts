import { defineQuery } from 'next-sanity';

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[
    _type == "teamMember" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(order asc, featured desc, _createdAt asc) {
    _id,
    name,
    "slug": slug[language == $locale][0].value.current,
    memberKey,
    "role": role[language == $locale][0].value,
    "tagline": tagline[language == $locale][0].value,
    avatar,
    "avatarAlt": avatarAlt[language == $locale][0].value,
    "shortBio": shortBio[language == $locale][0].value,
    featured,
    isActive,
    order
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
    memberKey,
    "role": role[language == $locale][0].value,
    "tagline": tagline[language == $locale][0].value,
    avatar,
    "avatarAlt": avatarAlt[language == $locale][0].value,
    "shortBio": shortBio[language == $locale][0].value,
    "intro": intro[language == $locale][0].value,
    "specialties": specialties[language == $locale][0].value,
    "experience": experience[language == $locale][0].value,
    "quote": quote[language == $locale][0].value,
    email,
    links,
    featured,
    isActive,
    order,
    "translations": slug[]{
      language,
      "slug": value.current
    },
    "featuredProjects": featuredProjects[]-> {
      _id,
      _type,
      "title": coalesce(
        title[language == $locale][0].value,
        name
      ),
      "slug": slug[language == $locale][0].value.current,
      "description": coalesce(
        excerpt[language == $locale][0].value,
        description[language == $locale][0].value,
        shortBio[language == $locale][0].value
      )
    },
    "seo": {
      "title": seo.title[language == $locale][0].value,
      "description": seo.description[language == $locale][0].value,
      "socialImage": seo.socialImage,
      "socialImageAlt": seo.socialImageAlt[language == $locale][0].value
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
