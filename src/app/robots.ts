import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/routes';
import { siteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.shouldIndex) {
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
    host: siteConfig.url,
  };
}
