import { groq } from 'next-sanity';

export const SITE_MARKETING_SETTINGS_QUERY = groq`
  *[_type == "siteMarketingSettings"][0]{
    _id,
    _type,
    areasOfOperation[]{
      key,
      label
    },
    primaryCta{
      label,
      linkKind,
      internalHref,
      externalUrl
    },
    hasSecondaryCta,
    secondaryCta{
      label,
      linkKind,
      internalHref,
      externalUrl
    },
    socialProfiles[]{
      platform,
      url
    }
  }
`;
