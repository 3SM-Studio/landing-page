import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/entities/blog/api/blog.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { BlogPostPageView } from '@/widgets/blog-post-page/ui/BlogPostPageView';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const blogDetailPathname: AppPathname = '/blog/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const posts = await getBlogPostSlugs(locale);

      return posts.map((post) => ({
        locale,
        slug: post.slug,
      }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'blogPostPage' });
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: 'Blog',
      notFoundTitle: t('postNotFound'),
      pathname: blogDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: post.title,
    description: post.excerpt ?? '',
    sectionTitle: 'Blog',
    notFoundTitle: t('postNotFound'),
    pathname: blogDetailPathname,
    params: { slug },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'blogPostPage' });
  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostPageView
      locale={locale}
      post={post}
      copy={{
        backToBlog: t('backToBlog'),
        emptyBody: t('emptyBody'),
      }}
    />
  );
}
