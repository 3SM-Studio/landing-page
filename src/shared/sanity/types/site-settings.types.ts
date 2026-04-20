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

export type SanityLocalizedImage = {
  image?: {
    asset?: SanityImageAsset | null;
  } | null;
  alt?: SanityLocalizedValue<string>[] | null;
  caption?: SanityLocalizedValue<string>[] | null;
};

export type SanitySiteBrandSettings = {
  _id: string;
  _type: 'siteBrandSettings';
  siteName?: string | null;
  shortName?: string | null;
  siteUrl?: string | null;
  creatorHandle?: string | null;
  emailSignature?: string | null;
  themeColor?: string | null;
};

export type SanitySiteCompanySettings = {
  _id: string;
  _type: 'siteCompanySettings';
  company?: {
    brandName?: string | null;
    registrationCountryCode?: string | null;
    legalFormPl?: string | null;
    legalFormGlobal?: string | null;
    customLegalForm?: string | null;
    organizationType?: string | null;
    foundedYear?: number | null;
    nip?: string | null;
    krs?: string | null;
    regon?: string | null;
    registrationNumber?: string | null;
    taxId?: string | null;
    vatId?: string | null;
    registeredAddress?: SanityAddress | null;
    hasSeparateOperatingAddress?: boolean | null;
    operatingAddress?: SanityAddress | null;
  } | null;
};

export type SanityAddress = {
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  region?: string | null;
  countryCode?: string | null;
};

export type SanitySiteContactSettings = {
  _id: string;
  _type: 'siteContactSettings';
  contact?: {
    emails?: Array<{
      type?: string | null;
      email?: string | null;
      isPrimary?: boolean | null;
    }> | null;
    phoneNumbers?: Array<{
      type?: string | null;
      countryCode?: string | null;
      nationalNumber?: string | null;
      isPrimary?: boolean | null;
    }> | null;
    publicAddressMode?: 'none' | 'registered' | 'operating' | 'custom' | null;
    customPublicAddress?: SanityAddress | null;
    businessHours?: Array<{
      days?: string[] | null;
      opensAt?: string | null;
      closesAt?: string | null;
      closesNextDay?: boolean | null;
    }> | null;
  } | null;
  map?: {
    source?: 'address' | 'coordinates' | 'placeId' | null;
    coordinates?: {
      lat?: number | null;
      lng?: number | null;
    } | null;
    placeId?: string | null;
    useCustomLabel?: boolean | null;
    customLabel?: SanityLocalizedValue<string>[] | null;
    zoom?: number | null;
  } | null;
};

export type SanitySocialProfile = {
  platform?: string | null;
  url?: string | null;
};

export type SanitySiteMarketingSettings = {
  _id: string;
  _type: 'siteMarketingSettings';
  areasOfOperation?: Array<{
    key?: string | null;
    label?: SanityLocalizedValue<string>[] | null;
  }> | null;
  primaryCta?: SanityCta | null;
  hasSecondaryCta?: boolean | null;
  secondaryCta?: SanityCta | null;
  socialProfiles?: SanitySocialProfile[] | null;
};

export type SanityCta = {
  label?: SanityLocalizedValue<string>[] | null;
  linkKind?: 'internal' | 'external' | null;
  internalHref?: string | null;
  externalUrl?: string | null;
};

export type SanitySiteSeoSettings = {
  _id: string;
  _type: 'siteSeoSettings';
  organizationLogoSvg?: SanityLocalizedImage | null;
  organizationLogoRaster?: SanityLocalizedImage | null;
  defaultSocialImage?: SanityLocalizedImage | null;
  seo?: {
    title?: SanityLocalizedValue<string>[] | null;
    description?: SanityLocalizedValue<string>[] | null;
    tagline?: SanityLocalizedValue<string>[] | null;
    socialImageTitle?: SanityLocalizedValue<string>[] | null;
    socialImageSubtitle?: SanityLocalizedValue<string>[] | null;
    socialImageFooter?: SanityLocalizedValue<string>[] | null;
    keywords?: SanityLocalizedValue<string[]>[] | null;
  } | null;
};

export type SanitySiteSettingsSource = {
  brand: SanitySiteBrandSettings | null;
  company: SanitySiteCompanySettings | null;
  contact: SanitySiteContactSettings | null;
  marketing: SanitySiteMarketingSettings | null;
  seo: SanitySiteSeoSettings | null;
};
