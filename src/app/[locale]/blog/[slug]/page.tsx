import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { formatBlogPostDate, formatBlogReadTime, getBlogCategoryLabel } from '@/lib/blog';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POST_SLUGS_QUERY } from '@/sanity/queries';

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type SanityBlogPostTranslation = {
  language: Locale;
  slug: string;
};

type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
  featured?: boolean;
  coverImage?: SanityImageSource | null;
  coverImageAlt?: string;
  body?: PortableTextBlock[];
  translations?: SanityBlogPostTranslation[];
};

type SanitySlug = {
  slug: string;
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const posts = await client.fetch<SanitySlug[]>(
        BLOG_POST_SLUGS_QUERY,
        { locale },
        { next: { revalidate: 60 } },
      );

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
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const post = await client.fetch<SanityBlogPost | null>(
    BLOG_POST_BY_SLUG_QUERY,
    { locale, slug },
    { next: { revalidate: 60 } },
  );

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${post.title} | Blog | 3SM`,
    description: post.excerpt ?? '',
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const post = await client.fetch<SanityBlogPost | null>(
    BLOG_POST_BY_SLUG_QUERY,
    { locale, slug },
    { next: { revalidate: 60 } },
  );

  if (!post) {
    notFound();
  }

  const formattedDate = formatBlogPostDate(post.publishedAt, locale === 'en' ? 'en-US' : 'pl-PL');

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1400).height(800).fit('crop').url()
    : null;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/blog"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            {locale === 'en' ? '← Back to blog' : '← Wróć do bloga'}
          </Link>
        </div>

        <article className="mx-auto max-w-4xl">
          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {post.category ? <span>{getBlogCategoryLabel(post.category, locale)}</span> : null}
              {post.category && formattedDate ? (
                <span className="h-1 w-1 rounded-full bg-slate-500" />
              ) : null}
              {formattedDate ? <span>{formattedDate}</span> : null}
              {formattedDate && post.readTimeMinutes ? (
                <span className="h-1 w-1 rounded-full bg-slate-500" />
              ) : null}
              {post.readTimeMinutes ? (
                <span>{formatBlogReadTime(post.readTimeMinutes, locale)}</span>
              ) : null}
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="text-lg leading-relaxed text-slate-400 md:text-xl">{post.excerpt}</p>
            ) : null}
          </header>

          {coverImageUrl ? (
            <div className="mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <Image
                src={coverImageUrl}
                alt={post.coverImageAlt || post.title}
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            {post.body?.length ? (
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-a:text-sky-300">
                <PortableText value={post.body} />
              </div>
            ) : (
              <p className="text-base leading-relaxed text-slate-300">
                {locale === 'en'
                  ? 'This post does not have content yet.'
                  : 'Ten wpis nie ma jeszcze treści.'}
              </p>
            )}
          </div>
        </article>
      </Container>
    </section>
  );
}
