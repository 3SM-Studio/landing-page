import { defineQuery } from 'next-sanity';

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "blogCategory" &&
    isActive == true &&
    defined(title[language == $locale][0].value) &&
    defined(key)
  ] | order(title[language == $locale][0].value asc) {
    _id,
    key,
    "title": title[language == $locale][0].value
  }
`);

const blogPostProjection = `
  _id,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "excerpt": excerpt[language == $locale][0].value,
  "category": category->{
    key,
    "title": title[language == $locale][0].value
  },
  publishedAt,
  "readTimeMinutes": readTimeMinutes[language == $locale][0].value,
  "isFeaturedGlobal": isFeaturedGlobal,
  "isFeaturedInCategory": isFeaturedInCategory,
  "featured": coalesce(isFeaturedGlobal, false) || coalesce(isFeaturedInCategory, false),
  "coverImage": coverImage.image,
  "coverImageAlt": coverImage.alt[language == $locale][0].value
`;

export const BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(isFeaturedGlobal desc, publishedAt desc) {
    ${blogPostProjection}
  }
`);

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "post" &&
    isActive == true &&
    slug[language == $locale][0].value.current == $slug
  ][0]{
    ${blogPostProjection},
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
    isActive == true &&
    defined(slug[language == $locale][0].value.current)
  ]{
    "slug": slug[language == $locale][0].value.current
  }
`);

export const BLOG_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "post" &&
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
