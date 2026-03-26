import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/routes';
import { serverSiteConfig } from '@/lib/site-config.server';

export default function robots(): MetadataRoute.Robots {
  if (!serverSiteConfig.shouldIndex) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: serverSiteConfig.url,
  };
}
