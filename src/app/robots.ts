import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/routes';
import { serverSiteConfig } from '@/lib/site-config.server';

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl('/sitemap.xml');

  return {
    rules: {
      userAgent: '*',
      allow: serverSiteConfig.shouldIndex ? '/' : undefined,
      disallow: serverSiteConfig.shouldIndex ? undefined : '/',
    },
    sitemap,
  };
}
