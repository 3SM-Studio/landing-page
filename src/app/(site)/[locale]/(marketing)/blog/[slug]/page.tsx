import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/entities/blog/api/blog.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { BlogPostPageView } from '@/widgets/blog-post-page/ui/BlogPostPageView';
import { routing } from '@/shared/i18n/routing';
import { routes } from '@/shared/lib/routes';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';
import { buildMetadata } from '@/shared/seo/buildMetadata';

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

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
    return buildMetadata({
      locale,
      canonical: `${routes.blog}/${slug}`,
      title: t('postNotFound'),
      description: t('postNotFoundDescription'),
      ogImage: '/opengraph-image-404',
      twitterImage: '/twitter-image-404',
      noIndex: true,
      keywords: ['404', 'not found', 'blog'],
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: post.title,
    description: post.excerpt ?? '',
    sectionTitle: 'Blog',
    notFoundTitle: t('postNotFound'),
    pathname: '/blog/[slug]',
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
