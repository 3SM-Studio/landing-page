import type {
  LocalizedSiteMetadata,
  PublicSiteConfig,
  SiteAddress,
  SiteLinks,
} from '@/shared/config/site/site-config.public';
import type { Locale } from '@/shared/i18n/routing';
import type {
  SanityLocalizedValue,
  SanitySiteSettings,
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

function normalizeLinks(value?: SanitySiteSettings['links']): SiteLinks {
  return {
    instagram: value?.instagram || '',
    x: value?.x || '',
    youtube: value?.youtube || '',
    tiktok: value?.tiktok || '',
    facebook: value?.facebook || '',
    discord: value?.discord || '',
  };
}

function normalizeAddress(value?: SanitySiteSettings['address']): SiteAddress | undefined {
  if (!value?.addressLocality || !value?.addressCountry) {
    return undefined;
  }

  return {
    streetAddress: value.streetAddress || undefined,
    postalCode: value.postalCode || undefined,
    addressLocality: value.addressLocality,
    addressRegion: value.addressRegion || undefined,
    addressCountry: value.addressCountry,
  };
}

export function mapSiteSettingsToPublicSiteConfig(
  settings: SanitySiteSettings,
  fallback: PublicSiteConfig,
): PublicSiteConfig {
  return {
    ...fallback,
    name: settings.siteName || fallback.name,
    shortName: settings.shortName || fallback.shortName,
    legalName: settings.legalName || fallback.legalName,
    themeColor: settings.themeColor || fallback.themeColor,
    email: settings.email || fallback.email,
    phone: settings.phone || fallback.phone,
    creator: settings.creatorHandle || fallback.creator,
    location: {
      city: settings.location?.city || fallback.location.city,
      region: settings.location?.region || fallback.location.region,
      country: settings.location?.country || fallback.location.country,
    },
    coordinates:
      settings.coordinates?.lat !== null &&
      settings.coordinates?.lat !== undefined &&
      settings.coordinates?.lng !== null &&
      settings.coordinates?.lng !== undefined
        ? {
            lat: settings.coordinates.lat,
            lng: settings.coordinates.lng,
          }
        : fallback.coordinates,
    boundaryPlaceId: settings.boundaryPlaceId || fallback.boundaryPlaceId,
    address: normalizeAddress(settings.address) || fallback.address,
    links: {
      ...fallback.links,
      ...normalizeLinks(settings.links),
    },
  };
}

export function mapSiteSettingsToLocalizedMetadata(
  settings: SanitySiteSettings,
  locale: Locale,
  fallback: LocalizedSiteMetadata,
): LocalizedSiteMetadata {
  return {
    ...fallback,
    title: pickLocalizedValue(settings.seo?.title, locale) || fallback.title,
    description: pickLocalizedValue(settings.seo?.description, locale) || fallback.description,
    tagline: pickLocalizedValue(settings.seo?.tagline, locale) || fallback.tagline,
    ogImageAlt: pickLocalizedValue(settings.seo?.ogImageAlt, locale) || fallback.ogImageAlt,
    twitterImageAlt:
      pickLocalizedValue(settings.seo?.twitterImageAlt, locale) || fallback.twitterImageAlt,
    socialImageTitle:
      pickLocalizedValue(settings.seo?.socialImageTitle, locale) || fallback.socialImageTitle,
    socialImageSubtitle:
      pickLocalizedValue(settings.seo?.socialImageSubtitle, locale) || fallback.socialImageSubtitle,
    socialImageFooter:
      pickLocalizedValue(settings.seo?.socialImageFooter, locale) || fallback.socialImageFooter,
    keywords: pickLocalizedValue(settings.seo?.keywords, locale) || fallback.keywords,
  };
}

export function getSiteSettingsDefaultSocialImageUrl(
  settings?: SanitySiteSettings | null,
): string | undefined {
  return settings?.defaultSocialImage?.asset?.url || undefined;
}

export function getSiteSettingsDefaultSocialImageAlt(
  settings: SanitySiteSettings | null | undefined,
  locale: Locale,
): string | undefined {
  return pickLocalizedValue(settings?.defaultSocialImageAlt, locale);
}
