import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getBlogCategories, getBlogPosts } from '@/entities/blog/api/blog.repository';
import { buildBlogFilters } from '@/entities/blog/model/blog.filters';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { BlogPageView } from '@/widgets/blog-list-page/ui/BlogPageView';

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/blog',
    namespace: 'blogPage',
    titleKey: 'title',
    descriptionKey: 'description',
    keywords: ['blog', 'branding insights', 'web design insights'],
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const [posts, categories] = await Promise.all([getBlogPosts(locale), getBlogCategories(locale)]);

  const filters = buildBlogFilters(locale, categories, {
    allLabel: t('allFilter'),
  });

  return (
    <BlogPageView
      locale={locale}
      filters={filters}
      posts={posts}
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
