import type { MetadataRoute } from 'next';
import { routing } from '@/shared/i18n/routing';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

export default function manifest(): MetadataRoute.Manifest {
  const defaultMetadata = getSiteMetadata(routing.defaultLocale);

  return {
    name: serverSiteConfig.name,
    short_name: serverSiteConfig.shortName,
    description: defaultMetadata.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#020617',
    theme_color: serverSiteConfig.themeColor,
    lang: defaultMetadata.language,
    categories: ['business', 'design', 'marketing'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
