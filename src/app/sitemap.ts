import type { MetadataRoute } from 'next';
import { client } from '@/shared/sanity/client';
import { BLOG_SITEMAP_QUERY } from '@/entities/blog/api/blog.queries';
import { CASE_STUDY_SITEMAP_QUERY } from '@/entities/case-study/api/case-studies.queries';
import { SERVICE_SITEMAP_QUERY } from '@/entities/service/api/service.queries';
import { routing } from '@/shared/i18n/routing';
import {
  buildDynamicSitemapEntries,
  createAlternatesEntry,
  getStaticPathnames,
  type SitemapItem,
} from '@/shared/seo/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = getStaticPathnames().flatMap((pathname) =>
    createAlternatesEntry(pathname, routing.locales),
  );

  const [blogItems, caseStudyItems, serviceItems] = await Promise.all([
    client.fetch<SitemapItem[]>(BLOG_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch<SitemapItem[]>(CASE_STUDY_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch<SitemapItem[]>(SERVICE_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
  ]);

  const seen = new Set<string>();

  return [
    ...staticEntries,
    ...buildDynamicSitemapEntries(blogItems, '/blog/[slug]', seen),
    ...buildDynamicSitemapEntries(caseStudyItems, '/case-studies/[slug]', seen),
    ...buildDynamicSitemapEntries(serviceItems, '/services/[slug]', seen),
  ];
}
