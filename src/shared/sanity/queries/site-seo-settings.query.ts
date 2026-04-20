import { groq } from 'next-sanity';

const imageProjection = `{
  image{
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
  alt,
  caption
}`;

export const SITE_SEO_SETTINGS_QUERY = groq`
  *[_type == "siteSeoSettings"][0]{
    _id,
    _type,
    "organizationLogoSvg": organizationLogoSvg${imageProjection},
    "organizationLogoRaster": organizationLogoRaster${imageProjection},
    "defaultSocialImage": defaultSocialImage${imageProjection},
    seo{
      title,
      description,
      tagline,
      socialImageTitle,
      socialImageSubtitle,
      socialImageFooter,
      keywords
    }
  }
`;
