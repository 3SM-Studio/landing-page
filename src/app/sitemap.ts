import type { MetadataRoute } from 'next';
import { getLocaleAlternates, routes } from '@/lib/routes';

const sitemapEntries = [
  {
    path: routes.home,
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    path: routes.services,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  {
    path: routes.portfolio,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    path: routes.about,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    path: routes.contact,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: routes.serviceVideo,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: routes.servicePhotography,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: routes.serviceSocialContent,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    path: routes.serviceWebDesignDevelopment,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapEntries.map((entry) => ({
    url: getLocaleAlternates(entry.path).en,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: getLocaleAlternates(entry.path),
    },
  }));
}
