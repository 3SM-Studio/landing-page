import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/features/blog/api/blog.repository';
import { buildBlogFilters, resolveActiveBlogCategory } from '@/features/blog/lib/blog.filters';
import { resolveLocale } from '@/features/blog/lib/blog.locale';
import { createBlogListPresentation } from '@/features/blog/lib/blog.selectors';
import { BlogPageView } from '@/features/blog/ui/BlogPageView';

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const posts = await getBlogPosts(locale);

  const filters = buildBlogFilters(locale, {
    allLabel: t('allFilter'),
  });

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeCategory = resolveActiveBlogCategory(resolvedSearchParams?.category, filters);

  const presentation = createBlogListPresentation(posts, activeCategory);

  return (
    <BlogPageView
      locale={locale}
      filters={filters}
      activeCategory={activeCategory}
      presentation={presentation}
      copy={{
        badge: t('badge'),
        title: t('title'),
        description: t('description'),
        featuredLabel: t('featuredLabel'),
        featuredHint: t('featuredHint'),
        readMore: t('readMore'),
        empty: t('empty'),
      }}
    />
  );
}
