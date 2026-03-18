import type { MetadataRoute } from 'next';
import { absoluteUrl, routes } from '@/lib/routes';

const staticRoutes = [
  {
    path: routes.home,
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
