import { groq } from 'next-sanity';

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    _type,
    siteName,
    shortName,
    legalName,
    creatorHandle,
    emailSignature,
    themeColor,
    email,
    phone,
    location,
    coordinates,
    boundaryPlaceId,
    address,
    links,
    defaultSocialImage{
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    defaultSocialImageAlt,
    seo
  }
`;
