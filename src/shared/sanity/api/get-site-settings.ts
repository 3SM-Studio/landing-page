import 'server-only';

import { client } from '@/shared/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/shared/sanity/queries/site-settings.query';
import type { SanitySiteSettings } from '@/shared/sanity/types/site-settings.types';

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY);
}
