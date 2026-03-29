import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import {
  blogPosts,
  formatBlogPostDate,
  getBlogPostBySlug,
  getLocalizedValue,
} from '@/lib/data/blog-posts';

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function generateStaticParams() {
  return blogPosts.flatMap((post) => {
    const params = [{ locale: 'pl', slug: post.slug.pl }];

    if (post.slug.en) {
      params.push({ locale: 'en', slug: post.slug.en });
    }

    return params;
  });
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;
  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${getLocalizedValue(post.title, locale)} | Blog | 3SM`,
    description: getLocalizedValue(post.excerpt, locale),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;
  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const formattedDate = formatBlogPostDate(post.publishedAt, locale === 'en' ? 'en-US' : 'pl-PL');

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
            ← Wróć do bloga
          </Link>
        </div>

        <article className="mx-auto max-w-4xl">
          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              <span>{getLocalizedValue(post.category, locale)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{formattedDate}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{getLocalizedValue(post.readTime, locale)}</span>
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {getLocalizedValue(post.title, locale)}
            </h1>

            <p className="text-lg leading-relaxed text-slate-400 md:text-xl">
              {getLocalizedValue(post.excerpt, locale)}
            </p>
          </header>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <p className="mb-8 text-lg leading-relaxed text-slate-300">
              {getLocalizedValue(post.content.intro, locale)}
            </p>

            <div className="space-y-10">
              {post.content.sections.map((section) => (
                <section key={getLocalizedValue(section.title, locale)}>
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    {getLocalizedValue(section.title, locale)}
                  </h2>
                  <p className="text-base leading-relaxed text-slate-300 md:text-lg">
                    {getLocalizedValue(section.body, locale)}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Podsumowanie</h2>
              <p className="text-base leading-relaxed text-slate-300 md:text-lg">
                {getLocalizedValue(post.content.summary, locale)}
              </p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
