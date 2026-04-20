import 'server-only';

import { getSiteSettingsSource } from '@/shared/sanity/api/get-site-settings-source';
import {
  getSiteSettingsDefaultSocialImageAlt,
  getSiteSettingsDefaultSocialImageUrl,
  mapSiteSettingsSourceToLocalizedMetadata,
  mapSiteSettingsSourceToPublicSiteConfig,
} from '@/shared/sanity/mappers/site-settings.mapper';
import {
  getSiteMetadata,
  publicSiteConfig,
  type LocalizedSiteMetadata,
  type PublicSiteConfig,
} from '@/shared/config/site/site-config.public';
import type { Locale } from '@/shared/i18n/routing';

export async function resolvePublicSiteConfig(): Promise<PublicSiteConfig> {
  const settingsSource = await getSiteSettingsSource();

  if (!settingsSource.brand && !settingsSource.company && !settingsSource.contact) {
    return publicSiteConfig;
  }

  return mapSiteSettingsSourceToPublicSiteConfig(settingsSource, publicSiteConfig);
}

export async function resolveLocalizedSiteMetadata(locale: Locale): Promise<LocalizedSiteMetadata> {
  const settingsSource = await getSiteSettingsSource();
  const fallback = getSiteMetadata(locale);

  if (!settingsSource.seo) {
    return fallback;
  }

  return mapSiteSettingsSourceToLocalizedMetadata(settingsSource, locale, fallback);
}

export async function resolveDefaultSocialImage(locale: Locale) {
  const settingsSource = await getSiteSettingsSource();

  return {
    url: getSiteSettingsDefaultSocialImageUrl(settingsSource),
    alt: getSiteSettingsDefaultSocialImageAlt(settingsSource, locale),
  };
}
