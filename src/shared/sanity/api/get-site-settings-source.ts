import 'server-only';

import { client } from '@/shared/sanity/client';
import { SITE_BRAND_SETTINGS_QUERY } from '@/shared/sanity/queries/site-brand-settings.query';
import { SITE_COMPANY_SETTINGS_QUERY } from '@/shared/sanity/queries/site-company-settings.query';
import { SITE_CONTACT_SETTINGS_QUERY } from '@/shared/sanity/queries/site-contact-settings.query';
import { SITE_MARKETING_SETTINGS_QUERY } from '@/shared/sanity/queries/site-marketing-settings.query';
import { SITE_SEO_SETTINGS_QUERY } from '@/shared/sanity/queries/site-seo-settings.query';
import type {
  SanitySiteBrandSettings,
  SanitySiteCompanySettings,
  SanitySiteContactSettings,
  SanitySiteMarketingSettings,
  SanitySiteSeoSettings,
  SanitySiteSettingsSource,
} from '@/shared/sanity/types/site-settings.types';

export async function getSiteSettingsSource(): Promise<SanitySiteSettingsSource> {
  const [brand, company, contact, marketing, seo] = await Promise.all([
    client.fetch<SanitySiteBrandSettings | null>(SITE_BRAND_SETTINGS_QUERY),
    client.fetch<SanitySiteCompanySettings | null>(SITE_COMPANY_SETTINGS_QUERY),
    client.fetch<SanitySiteContactSettings | null>(SITE_CONTACT_SETTINGS_QUERY),
    client.fetch<SanitySiteMarketingSettings | null>(SITE_MARKETING_SETTINGS_QUERY),
    client.fetch<SanitySiteSeoSettings | null>(SITE_SEO_SETTINGS_QUERY),
  ]);

  return {
    brand,
    company,
    contact,
    marketing,
    seo,
  };
}
