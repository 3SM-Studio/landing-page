import { groq } from 'next-sanity';

export const SITE_BRAND_SETTINGS_QUERY = groq`
  *[_type == "siteBrandSettings"][0]{
    _id,
    _type,
    siteName,
    shortName,
    siteUrl,
    creatorHandle,
    emailSignature,
    themeColor
  }
`;
