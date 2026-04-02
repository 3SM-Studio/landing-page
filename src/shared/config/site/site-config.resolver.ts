import 'server-only';

import { getSiteSettings } from '@/shared/sanity/api/get-site-settings';
import {
  getSiteSettingsDefaultSocialImageAlt,
  getSiteSettingsDefaultSocialImageUrl,
  mapSiteSettingsToLocalizedMetadata,
  mapSiteSettingsToPublicSiteConfig,
} from '@/shared/sanity/mappers/site-settings.mapper';
import {
  getSiteMetadata,
  publicSiteConfig,
  type LocalizedSiteMetadata,
  type PublicSiteConfig,
} from '@/shared/config/site/site-config.public';
import type { Locale } from '@/shared/i18n/routing';

export async function resolvePublicSiteConfig(): Promise<PublicSiteConfig> {
  const settings = await getSiteSettings();

  if (!settings) {
    return publicSiteConfig;
  }

  return mapSiteSettingsToPublicSiteConfig(settings, publicSiteConfig);
}

export async function resolveLocalizedSiteMetadata(locale: Locale): Promise<LocalizedSiteMetadata> {
  const settings = await getSiteSettings();
  const fallback = getSiteMetadata(locale);

  if (!settings) {
    return fallback;
  }

  return mapSiteSettingsToLocalizedMetadata(settings, locale, fallback);
}

export async function resolveDefaultSocialImage(locale: Locale) {
  const settings = await getSiteSettings();

  return {
    url: getSiteSettingsDefaultSocialImageUrl(settings),
    alt: getSiteSettingsDefaultSocialImageAlt(settings, locale),
  };
}
