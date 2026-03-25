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
    path: routes.work,
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
    path: routes.blog,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
  {
    path: routes.caseStudies,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    path: routes.privacy,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
  {
    path: routes.cookies,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
  {
    path: routes.legalNotice,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapEntries.map((entry) => {
    const languages = getLocaleAlternates(entry.path);

    return {
      url: languages.en,
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages,
      },
    };
  });
}
