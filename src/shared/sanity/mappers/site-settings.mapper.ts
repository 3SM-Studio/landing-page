import type {
  LocalizedSiteMetadata,
  PublicSiteConfig,
  SiteAddress,
  SiteLinks,
} from '@/shared/config/site/site-config.public';
import type { Locale } from '@/shared/i18n/routing';
import type {
  SanityAddress,
  SanityLocalizedImage,
  SanityLocalizedValue,
  SanitySiteSettingsSource,
  SanitySocialProfile,
} from '@/shared/sanity/types/site-settings.types';

function pickLocalizedValue<T>(
  values: SanityLocalizedValue<T>[] | null | undefined,
  locale: Locale,
  fallbackLocale: Locale = 'pl',
): T | undefined {
  if (!Array.isArray(values) || values.length === 0) {
    return undefined;
  }

  const localizedValue = values.find((item) => item?.language === locale)?.value;
  if (localizedValue !== undefined) {
    return localizedValue;
  }

  return values.find((item) => item?.language === fallbackLocale)?.value;
}

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizePolishLegalForm(value: string | null | undefined) {
  const normalized = cleanOptionalString(value);

  if (!normalized) {
    return undefined;
  }

  const compact = normalized.toLowerCase().replace(/[\s_.-]+/g, '');

  switch (compact) {
    case 'spzoo':
      return 'Sp. z o.o.';
    case 'sa':
      return 'S.A.';
    case 'sj':
      return 'Sp. j.';
    case 'sk':
      return 'Sp.k.';
    case 'ska':
      return 'S.K.A.';
    case 'sc':
      return 'S.C.';
    default:
      return normalized;
  }
}

function resolveDialCode(countryCode?: string | null) {
  const normalized = cleanOptionalString(countryCode)?.replace(/^\+/, '').toUpperCase();

  if (!normalized) {
    return undefined;
  }

  switch (normalized) {
    case 'PL':
      return '48';
    default:
      return normalized;
  }
}

function formatNationalPhoneNumber(value: string) {
  if (/^\d{9}$/.test(value)) {
    return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  }

  if (/^\d{7}$/.test(value)) {
    return value.replace(/(\d{3})(\d{2})(\d{2})/, '$1 $2 $3');
  }

  return value;
}

function normalizeAddress(
  value?: SanityAddress | null,
  fallbackCountryCode?: string | null,
): SiteAddress | undefined {
  const countryCode =
    cleanOptionalString(value?.countryCode) || cleanOptionalString(fallbackCountryCode);

  if (!value?.city || !countryCode) {
    return undefined;
  }

  return {
    streetAddress: cleanOptionalString(value.streetAddress),
    postalCode: cleanOptionalString(value.postalCode),
    addressLocality: value.city,
    addressRegion: cleanOptionalString(value.region),
    addressCountry: countryCode,
  };
}

function buildLegalName(source: SanitySiteSettingsSource, fallback: PublicSiteConfig) {
  const company = source.company?.company;

  const brandName = cleanOptionalString(company?.brandName);
  const legalForm = normalizePolishLegalForm(
    company?.registrationCountryCode === 'PL'
      ? company?.customLegalForm || company?.legalFormPl
      : company?.customLegalForm || company?.legalFormGlobal,
  );

  if (brandName && legalForm) {
    return `${brandName} ${legalForm}`;
  }

  return brandName || fallback.legalName;
}

function pickPrimaryEmail(source: SanitySiteSettingsSource) {
  const emails = source.contact?.contact?.emails;

  if (!Array.isArray(emails) || emails.length === 0) {
    return undefined;
  }

  const preferred =
    emails.find((item) => item?.isPrimary && cleanOptionalString(item.email)) ??
    emails.find((item) => item?.type === 'general' && cleanOptionalString(item.email)) ??
    emails.find((item) => cleanOptionalString(item.email));

  return cleanOptionalString(preferred?.email);
}

function normalizePhoneNumber(countryCode?: string | null, nationalNumber?: string | null) {
  const normalizedCountryCode = resolveDialCode(countryCode);
  const normalizedNationalNumber = cleanOptionalString(nationalNumber)?.replace(/\D+/g, '');

  if (!normalizedCountryCode || !normalizedNationalNumber) {
    return undefined;
  }

  return `+${normalizedCountryCode} ${formatNationalPhoneNumber(normalizedNationalNumber)}`;
}

function pickPrimaryPhone(source: SanitySiteSettingsSource) {
  const phoneNumbers = source.contact?.contact?.phoneNumbers;

  if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
    return undefined;
  }

  const preferred =
    phoneNumbers.find(
      (item) => item?.isPrimary && normalizePhoneNumber(item.countryCode, item.nationalNumber),
    ) ??
    phoneNumbers.find(
      (item) =>
        item?.type === 'mobile' && normalizePhoneNumber(item.countryCode, item.nationalNumber),
    ) ??
    phoneNumbers.find((item) => normalizePhoneNumber(item.countryCode, item.nationalNumber));

  return normalizePhoneNumber(preferred?.countryCode, preferred?.nationalNumber);
}

function resolvePublicAddress(source: SanitySiteSettingsSource) {
  const mode = source.contact?.contact?.publicAddressMode;
  const company = source.company?.company;

  switch (mode) {
    case 'registered':
      return normalizeAddress(company?.registeredAddress, company?.registrationCountryCode);
    case 'operating':
      return normalizeAddress(company?.operatingAddress, company?.registrationCountryCode);
    case 'custom':
      return normalizeAddress(
        source.contact?.contact?.customPublicAddress,
        company?.registrationCountryCode,
      );
    default:
      return (
        normalizeAddress(company?.registeredAddress, company?.registrationCountryCode) ??
        normalizeAddress(company?.operatingAddress, company?.registrationCountryCode)
      );
  }
}

function resolveCoordinates(source: SanitySiteSettingsSource, fallback: PublicSiteConfig) {
  const coordinates = source.contact?.map?.coordinates;

  if (
    typeof coordinates?.lat === 'number' &&
    !Number.isNaN(coordinates.lat) &&
    typeof coordinates?.lng === 'number' &&
    !Number.isNaN(coordinates.lng)
  ) {
    return {
      lat: coordinates.lat,
      lng: coordinates.lng,
    };
  }

  return fallback.coordinates;
}

function normalizeLinks(profiles: SanitySocialProfile[] | null | undefined): SiteLinks {
  const normalized: SiteLinks = {
    instagram: '',
    x: '',
    youtube: '',
    tiktok: '',
    facebook: '',
    discord: '',
    linkedin: '',
  };

  for (const profile of profiles ?? []) {
    const platform = cleanOptionalString(profile?.platform)?.toLowerCase();
    const url = cleanOptionalString(profile?.url);

    if (!platform || !url) {
      continue;
    }

    if (platform in normalized) {
      normalized[platform as keyof SiteLinks] = url;
    }
  }

  return normalized;
}

function getCountryFromAddress(address: SiteAddress | undefined, fallback: PublicSiteConfig) {
  return address?.addressCountry || fallback.location.country;
}

function getRegionFromAddress(address: SiteAddress | undefined, fallback: PublicSiteConfig) {
  return address?.addressRegion || fallback.location.region;
}

function getCityFromAddress(address: SiteAddress | undefined, fallback: PublicSiteConfig) {
  return address?.addressLocality || fallback.location.city;
}

export function mapSiteSettingsSourceToPublicSiteConfig(
  source: SanitySiteSettingsSource,
  fallback: PublicSiteConfig,
): PublicSiteConfig {
  const address = resolvePublicAddress(source) || fallback.address;
  const company = source.company?.company;
  const defaultSocialImageUrl = source.seo?.defaultSocialImage?.image?.asset?.url;
  const organizationLogoUrl =
    source.seo?.organizationLogoSvg?.image?.asset?.url ||
    source.seo?.organizationLogoRaster?.image?.asset?.url;

  return {
    ...fallback,
    name:
      cleanOptionalString(source.brand?.siteName) ||
      cleanOptionalString(company?.brandName) ||
      fallback.name,
    shortName: cleanOptionalString(source.brand?.shortName) || fallback.shortName,
    legalName: buildLegalName(source, fallback),
    url: cleanOptionalString(source.brand?.siteUrl) || fallback.url,
    themeColor: cleanOptionalString(source.brand?.themeColor) || fallback.themeColor,
    email: pickPrimaryEmail(source) || fallback.email,
    phone: pickPrimaryPhone(source) || fallback.phone,
    creator: cleanOptionalString(source.brand?.creatorHandle) || fallback.creator,
    location: {
      city: getCityFromAddress(address, fallback),
      region: getRegionFromAddress(address, fallback),
      country: getCountryFromAddress(address, fallback),
    },
    coordinates: resolveCoordinates(source, fallback),
    boundaryPlaceId: cleanOptionalString(source.contact?.map?.placeId) || fallback.boundaryPlaceId,
    address,
    links: {
      ...fallback.links,
      ...normalizeLinks(source.marketing?.socialProfiles),
    },
    company: {
      registrationCountryCode: cleanOptionalString(company?.registrationCountryCode),
      organizationType: cleanOptionalString(company?.organizationType),
      foundedYear: typeof company?.foundedYear === 'number' ? company.foundedYear : undefined,
      nip: cleanOptionalString(company?.nip),
      krs: cleanOptionalString(company?.krs),
      regon: cleanOptionalString(company?.regon),
      registrationNumber: cleanOptionalString(company?.registrationNumber),
      taxId: cleanOptionalString(company?.taxId),
      vatId: cleanOptionalString(company?.vatId),
    },
    map: {
      source: source.contact?.map?.source || undefined,
      label: pickLocalizedValue(source.contact?.map?.customLabel, 'pl') || undefined,
      zoom:
        typeof source.contact?.map?.zoom === 'number' && !Number.isNaN(source.contact.map.zoom)
          ? source.contact.map.zoom
          : undefined,
    },
    images: {
      defaultSocialImageUrl: cleanOptionalString(defaultSocialImageUrl),
      organizationLogoUrl: cleanOptionalString(organizationLogoUrl),
    },
  };
}

export function mapSiteSettingsSourceToLocalizedMetadata(
  source: SanitySiteSettingsSource,
  locale: Locale,
  fallback: LocalizedSiteMetadata,
): LocalizedSiteMetadata {
  const seo = source.seo?.seo;
  const defaultSocialImageAlt = pickLocalizedValue(source.seo?.defaultSocialImage?.alt, locale);

  return {
    ...fallback,
    title: pickLocalizedValue(seo?.title, locale) || fallback.title,
    description: pickLocalizedValue(seo?.description, locale) || fallback.description,
    tagline: pickLocalizedValue(seo?.tagline, locale) || fallback.tagline,
    ogImageAlt: defaultSocialImageAlt || fallback.ogImageAlt,
    twitterImageAlt: defaultSocialImageAlt || fallback.twitterImageAlt,
    socialImageTitle:
      pickLocalizedValue(seo?.socialImageTitle, locale) || fallback.socialImageTitle,
    socialImageSubtitle:
      pickLocalizedValue(seo?.socialImageSubtitle, locale) || fallback.socialImageSubtitle,
    socialImageFooter:
      pickLocalizedValue(seo?.socialImageFooter, locale) || fallback.socialImageFooter,
    keywords: pickLocalizedValue(seo?.keywords, locale) || fallback.keywords,
  };
}

export function getSiteSettingsDefaultSocialImageUrl(
  source?: SanitySiteSettingsSource | null,
): string | undefined {
  return cleanOptionalString(source?.seo?.defaultSocialImage?.image?.asset?.url);
}

export function getSiteSettingsDefaultSocialImageAlt(
  source: SanitySiteSettingsSource | null | undefined,
  locale: Locale,
): string | undefined {
  return pickLocalizedValue(source?.seo?.defaultSocialImage?.alt, locale);
}

export function getLocalizedImageAlt(
  image: SanityLocalizedImage | null | undefined,
  locale: Locale,
): string | undefined {
  return pickLocalizedValue(image?.alt, locale);
}
