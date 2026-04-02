export type SanityLocalizedValue<T> = {
  _key?: string;
  _type?: string;
  language?: string;
  value?: T;
};

export type SanityImageAsset = {
  _id?: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
};

export type SanitySiteSettings = {
  _id: string;
  _type: 'siteSettings';
  siteName?: string | null;
  shortName?: string | null;
  legalName?: string | null;
  creatorHandle?: string | null;
  emailSignature?: string | null;
  themeColor?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: {
    city?: string | null;
    region?: string | null;
    country?: string | null;
  } | null;
  coordinates?: {
    lat?: number | null;
    lng?: number | null;
  } | null;
  boundaryPlaceId?: string | null;
  address?: {
    streetAddress?: string | null;
    postalCode?: string | null;
    addressLocality?: string | null;
    addressRegion?: string | null;
    addressCountry?: string | null;
  } | null;
  links?: {
    instagram?: string | null;
    x?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
    facebook?: string | null;
    discord?: string | null;
  } | null;
  defaultSocialImage?: {
    asset?: SanityImageAsset | null;
  } | null;
  defaultSocialImageAlt?: SanityLocalizedValue<string>[] | null;
  seo?: {
    title?: SanityLocalizedValue<string>[] | null;
    description?: SanityLocalizedValue<string>[] | null;
    tagline?: SanityLocalizedValue<string>[] | null;
    ogImageAlt?: SanityLocalizedValue<string>[] | null;
    twitterImageAlt?: SanityLocalizedValue<string>[] | null;
    socialImageTitle?: SanityLocalizedValue<string>[] | null;
    socialImageSubtitle?: SanityLocalizedValue<string>[] | null;
    socialImageFooter?: SanityLocalizedValue<string>[] | null;
    keywords?: SanityLocalizedValue<string[]>[] | null;
  } | null;
};
