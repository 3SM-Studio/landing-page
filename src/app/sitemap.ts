import type { MetadataRoute } from 'next';
import { getLocaleAlternates, routes } from '@/lib/routes';

const sitemapEntries = [
  {
    path: routes.home,
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries.map((entry) => ({
    url: getLocaleAlternates(entry.path).en,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: getLocaleAlternates(entry.path),
    },
  }));
}
