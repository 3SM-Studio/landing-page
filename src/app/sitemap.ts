import type { MetadataRoute } from 'next';
import { client } from '@/shared/sanity/client';
import { BLOG_SITEMAP_QUERY } from '@/features/blog/api/blog.queries';
import { CASE_STUDY_SITEMAP_QUERY } from '@/features/case-studies/api/case-studies.queries';
import { WORK_PROJECT_SITEMAP_QUERY } from '@/features/work/api/work.queries';
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

  const [blogItems, caseStudyItems, workItems] = await Promise.all([
    client.fetch<SitemapItem[]>(BLOG_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch<SitemapItem[]>(CASE_STUDY_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch<SitemapItem[]>(WORK_PROJECT_SITEMAP_QUERY, {}, { next: { revalidate: 300 } }),
  ]);

  const seen = new Set<string>();

  return [
    ...staticEntries,
    ...buildDynamicSitemapEntries(blogItems, '/blog/[slug]', seen),
    ...buildDynamicSitemapEntries(caseStudyItems, '/case-studies/[slug]', seen),
    ...buildDynamicSitemapEntries(workItems, '/work/[slug]', seen),
  ];
}
