import 'server-only';

import { serverEnv } from '@/lib/env';
import { publicSiteConfig } from '@/lib/site-config.public';

function normalizeSiteUrl(value?: string) {
  const fallback = publicSiteConfig.url;
  const candidate = value?.trim() || fallback;

  try {
    return new URL(candidate).toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

function isProductionEnvironment() {
  const vercelEnv = process.env.VERCEL_ENV;
  const netlifyContext = process.env.CONTEXT;
  const nodeEnv = serverEnv.NODE_ENV;

  if (vercelEnv) {
    return vercelEnv === 'production';
  }

  if (netlifyContext) {
    return netlifyContext === 'production';
  }

  return nodeEnv === 'production';
}

const siteUrl = normalizeSiteUrl(serverEnv.SITE_URL);
const disableIndexing = serverEnv.DISABLE_INDEXING === 'true';

export const serverSiteConfig = {
  ...publicSiteConfig,
  url: siteUrl,
  domain: new URL(siteUrl).host,
  shouldIndex: isProductionEnvironment() && !disableIndexing,
};
