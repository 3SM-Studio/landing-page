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
    "asset": image,
    "alt": alt[language == $locale][0].value,
    "caption": caption[language == $locale][0].value
  }
`;

const socialLinksProjection = `
  "socialLinks": {
    "instagram": links.socialLinks[platform == "instagram"][0].url,
    "facebook": links.socialLinks[platform == "facebook"][0].url,
    "x": links.socialLinks[platform == "x"][0].url,
    "linkedin": links.socialLinks[platform == "linkedin"][0].url,
    "youtube": links.socialLinks[platform == "youtube"][0].url,
    "tiktok": links.socialLinks[platform == "tiktok"][0].url
  }
`;

const partnerCardProjection = `
  _id,
  "name": name,
  "slug": slug[language == $locale][0].value.current,
  "partnerKey": key,
  logo,
  "logoAlt": logo.alt[language == $locale][0].value,
  bannerImage,
  "bannerImageAlt": bannerImage.alt[language == $locale][0].value,
  "tagline": tagline[language == $locale][0].value,
  "partnershipType": partnershipType[language == $locale][0].value,
  "shortDescription": shortDescription[language == $locale][0].value,
  ${brandLocationProjection},
  "website": links.website,
  ${socialLinksProjection},
  featured,
  isActive,
  "showOnPublicPage": showInPublicSections
`;

const relatedCaseStudyProjection = `
  _id,
  "title": title[language == $locale][0].value,
  "slug": slug[language == $locale][0].value.current,
  "excerpt": excerpt[language == $locale][0].value,
  "client": client-> {
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
  },
  "primaryService": primaryService-> {
    _id,
    "title": title[language == $locale][0].value,
    "slug": slug[language == $locale][0].value.current,
    "serviceKey": key
  },
  year,
  "isFeaturedGlobal": isFeaturedGlobal,
  "isFeaturedInPrimaryService": isFeaturedInPrimaryService,
  "featured": coalesce(isFeaturedGlobal, false) || coalesce(isFeaturedInPrimaryService, false),
  "scope": scope[language == $locale][0].value
`;

export const PARTNERS_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showInPublicSections == true &&
    defined(slug[language == $locale][0].value.current)
  ] | order(featured desc, _createdAt desc) {
    ${partnerCardProjection}
  }
`);

export const PARTNER_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showInPublicSections == true &&
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
      isActive == true &&
      defined(slug[language == $locale][0].value.current) &&
      ^._id in partners[]._ref
    ] | order(isFeaturedGlobal desc, year desc, _createdAt desc) {
      ${relatedCaseStudyProjection}
    }
  }
`);

export const PARTNER_SLUGS_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showInPublicSections == true &&
    defined(slug[language == $locale][0].value.current)
  ] {
    "slug": slug[language == $locale][0].value.current
  }
`);

export const PARTNER_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "partner" &&
    isActive == true &&
    showInPublicSections == true
  ] {
    _id,
    "translations": slug[]{
      language,
      "slug": value.current
    }
  }
`);
