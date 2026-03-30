import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import {
  blogCategories,
  formatBlogPostDate,
  formatBlogReadTime,
  getBlogCategoryLabel,
  tLabel,
} from '@/lib/blog';
import { client } from '@/sanity/client';
import { BLOG_POSTS_QUERY } from '@/sanity/queries';

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
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
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const posts = await client.fetch<SanityBlogPost[]>(
    BLOG_POSTS_QUERY,
    { locale },
    { next: { revalidate: 60 } },
  );

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const restPosts = featuredPost ? posts.filter((post) => post._id !== featuredPost._id) : posts;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-sky-300 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
            Blog
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            {locale === 'en' ? (
              <>
                Insights, process, design and things
                <br />
                that actually matter.
              </>
            ) : (
              <>
                Insights, proces, design i rzeczy,
                <br />
                które naprawdę mają znaczenie.
              </>
            )}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {locale === 'en'
              ? 'We write about branding, websites, content and how to build brands without plastic marketing nonsense.'
              : 'Piszemy o brandingu, stronach internetowych, contentcie i o tym, jak budować marki bez plastikowego marketingowego bełkotu.'}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {blogCategories.map((category, index) => (
            <button
              key={category.key}
              type="button"
              className={[
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                index === 0
                  ? 'border-sky-400/40 bg-sky-400/10 text-white'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {tLabel(category.label, locale)}
            </button>
          ))}
        </div>

        {featuredPost ? (
          <Link
            href={{
              pathname: '/blog/[slug]',
              params: { slug: featuredPost.slug },
            }}
            className="group mb-14 block overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/7 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                  {featuredPost.category ? (
                    <span>{getBlogCategoryLabel(featuredPost.category, locale)}</span>
                  ) : null}
                  {featuredPost.category && featuredPost.publishedAt ? (
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                  ) : null}
                  {featuredPost.publishedAt ? (
                    <span>
                      {formatBlogPostDate(
                        featuredPost.publishedAt,
                        locale === 'en' ? 'en-US' : 'pl-PL',
                      )}
                    </span>
                  ) : null}
                  {featuredPost.publishedAt && featuredPost.readTimeMinutes ? (
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                  ) : null}
                  {featuredPost.readTimeMinutes ? (
                    <span>{formatBlogReadTime(featuredPost.readTimeMinutes, locale)}</span>
                  ) : null}
                </div>

                <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt ? (
                  <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                ) : null}
              </div>

              <div className="flex h-full min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
                <div>
                  <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                    {locale === 'en' ? 'Featured post' : 'Wyróżniony wpis'}
                  </span>

                  <p className="text-sm leading-relaxed text-slate-300">
                    {locale === 'en'
                      ? 'Open and read the full article.'
                      : 'Kliknij i przeczytaj pełny wpis.'}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {restPosts.map((post) => (
            <Link
              key={post._id}
              href={{
                pathname: '/blog/[slug]',
                params: { slug: post.slug },
              }}
              className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                {post.category ? <span>{getBlogCategoryLabel(post.category, locale)}</span> : null}
                {post.category && post.publishedAt ? (
                  <span className="h-1 w-1 rounded-full bg-slate-500" />
                ) : null}
                {post.publishedAt ? (
                  <span>
                    {formatBlogPostDate(post.publishedAt, locale === 'en' ? 'en-US' : 'pl-PL')}
                  </span>
                ) : null}
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                {post.title}
              </h3>

              {post.excerpt ? (
                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-slate-500">
                  {formatBlogReadTime(post.readTimeMinutes, locale)}
                </span>

                <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                  {locale === 'en' ? 'Read more' : 'Czytaj więcej'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
