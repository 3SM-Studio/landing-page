import type { MetadataRoute } from 'next';
import { getLocaleAlternates, routes } from '@/lib/routes';

const sitemapEntries = [
  { path: routes.home },
  { path: routes.services },
  { path: routes.work },
  { path: routes.about },
  { path: routes.contact },
  { path: routes.blog },
  { path: routes.caseStudies },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries.flatMap((entry) => {
    const languages = getLocaleAlternates(entry.path);

    return Object.values(languages).map((url) => ({
      url,
      alternates: {
        languages,
      },
    }));
  });
}
