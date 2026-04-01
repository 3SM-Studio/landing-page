import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/features/blog/api/blog.repository';
import { resolveLocale } from '@/features/blog/lib/blog.locale';
import { BlogPostPageView } from '@/features/blog/ui/BlogPostPageView';
import { routing } from '@/shared/i18n/routing';

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
    return {
      title: t('postNotFound'),
    };
  }

  return {
    title: `${post.title} | Blog | 3SM`,
    description: post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? '',
    },
  };
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
