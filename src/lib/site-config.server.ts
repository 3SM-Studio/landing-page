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

function withHttps(host?: string) {
  return host ? `https://${host}` : undefined;
}

function resolveRuntimeSiteUrl() {
  if (process.env.VERCEL === '1') {
    if (process.env.VERCEL_ENV === 'production') {
      return normalizeSiteUrl(
        withHttps(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? withHttps(process.env.VERCEL_URL),
      );
    }

    return normalizeSiteUrl(
      withHttps(process.env.VERCEL_BRANCH_URL) ?? withHttps(process.env.VERCEL_URL),
    );
  }

  return normalizeSiteUrl(serverEnv.SITE_URL);
}

function resolveProductionSiteUrl() {
  return normalizeSiteUrl(
    withHttps(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? serverEnv.SITE_URL,
  );
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

const runtimeUrl = resolveRuntimeSiteUrl();
const productionUrl = resolveProductionSiteUrl();
const disableIndexing = serverEnv.DISABLE_INDEXING === 'true';

export const serverSiteConfig = {
  ...publicSiteConfig,
  url: runtimeUrl,
  productionUrl,
  domain: new URL(productionUrl).host,
  shouldIndex: isProductionEnvironment() && !disableIndexing,
};
