import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import {
  blogCategories,
  blogPosts,
  featuredBlogPost,
  formatBlogPostDate,
  getLocalizedValue,
} from '@/lib/data/blog-posts';

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

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
            Insights, proces, design i rzeczy,
            <br />
            które naprawdę mają znaczenie.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Pisujemy o brandingu, stronach internetowych, contentcie i o tym, jak budować marki bez
            plastikowego marketingowego bełkotu.
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
              {getLocalizedValue(category.label, locale)}
            </button>
          ))}
        </div>

        <Link
          href={{
            pathname: '/blog/[slug]',
            params: { slug: featuredBlogPost.slug[locale] ?? featuredBlogPost.slug.pl },
          }}
          className="group mb-14 block overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/7 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                <span>{getLocalizedValue(featuredBlogPost.category, locale)}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>
                  {formatBlogPostDate(
                    featuredBlogPost.publishedAt,
                    locale === 'en' ? 'en-US' : 'pl-PL',
                  )}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{getLocalizedValue(featuredBlogPost.readTime, locale)}</span>
              </div>

              <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                {getLocalizedValue(featuredBlogPost.title, locale)}
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                {getLocalizedValue(featuredBlogPost.excerpt, locale)}
              </p>
            </div>

            <div className="flex h-full min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
              <div>
                <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                  Featured post
                </span>

                <p className="text-sm leading-relaxed text-slate-300">
                  Kliknij i przeczytaj pełny wpis.
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => {
            const slug = post.slug[locale] ?? post.slug.pl;

            return (
              <Link
                key={`${slug}-${post.publishedAt}`}
                href={{
                  pathname: '/blog/[slug]',
                  params: { slug },
                }}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                  <span>{getLocalizedValue(post.category, locale)}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-500" />
                  <span>
                    {formatBlogPostDate(post.publishedAt, locale === 'en' ? 'en-US' : 'pl-PL')}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                  {getLocalizedValue(post.title, locale)}
                </h3>

                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                  {getLocalizedValue(post.excerpt, locale)}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm text-slate-500">
                    {getLocalizedValue(post.readTime, locale)}
                  </span>

                  <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                    Czytaj więcej
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
