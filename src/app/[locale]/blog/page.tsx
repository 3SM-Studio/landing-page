import { Container } from '@/components/ui/Container';
import { ContentCategoryFilters } from '@/components/shared/ContentCategoryFilters';
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
  searchParams?: Promise<{
    category?: string;
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

const allCategoryKey = 'all';

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

const pageCopy = {
  badge: {
    pl: 'Blog',
    en: 'Blog',
  },
  title: {
    pl: 'Insights, proces, design i rzeczy,\nktóre naprawdę mają znaczenie.',
    en: 'Insights, process, design and things\nthat actually matter.',
  },
  description: {
    pl: 'Piszemy o brandingu, stronach internetowych, contentcie i o tym, jak budować marki bez plastikowego marketingowego bełkotu.',
    en: 'We write about branding, websites, content and how to build brands without plastic marketing nonsense.',
  },
  featuredLabel: {
    pl: 'Wyróżniony wpis',
    en: 'Featured post',
  },
  featuredHint: {
    pl: 'Kliknij i przeczytaj pełny wpis.',
    en: 'Open and read the full article.',
  },
  readMore: {
    pl: 'Czytaj więcej',
    en: 'Read more',
  },
  empty: {
    pl: 'Nie ma jeszcze wpisów w tej kategorii.',
    en: 'No posts found in this category yet.',
  },
} as const;

function buildBlogFilters(locale: Locale) {
  const normalizedCategories = blogCategories.filter(
    (category, index, array) =>
      category.key !== allCategoryKey &&
      array.findIndex((item) => item.key === category.key) === index,
  );

  return [
    {
      key: allCategoryKey,
      label: locale === 'en' ? 'All' : 'Wszystkie',
    },
    ...normalizedCategories.map((category) => ({
      key: category.key,
      label: tLabel(category.label, locale),
    })),
  ] as const;
}

function isValidBlogCategory(
  value: string | undefined,
  allowedKeys: readonly string[],
): value is string {
  if (!value) {return false;}

  return allowedKeys.includes(value);
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const filters = buildBlogFilters(locale);
  const allowedKeys = filters.map((filter) => filter.key);

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawCategory = resolvedSearchParams?.category;
  const activeCategory = isValidBlogCategory(rawCategory, allowedKeys)
    ? rawCategory
    : allCategoryKey;

  const posts = await client.fetch<SanityBlogPost[]>(
    BLOG_POSTS_QUERY,
    { locale },
    { next: { revalidate: 60 } },
  );

  const filteredPosts =
    activeCategory === allCategoryKey
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const shouldShowFeatured = activeCategory === allCategoryKey && Boolean(featuredPost);

  const restPosts =
    shouldShowFeatured && featuredPost
      ? filteredPosts.filter((post) => post._id !== featuredPost._id)
      : filteredPosts;

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
            {pageCopy.badge[locale]}
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            {pageCopy.title[locale].split('\n').map((line, index, array) => (
              <span key={line}>
                {line}
                {index < array.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {pageCopy.description[locale]}
          </p>
        </div>

        <ContentCategoryFilters filters={filters} activeKey={activeCategory} />

        {shouldShowFeatured && featuredPost ? (
          <Link
            href={{
              pathname: '/blog/[slug]',
              params: { slug: featuredPost.slug },
            }}
            className="group mb-14 block min-h-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 md:min-h-[380px] md:p-8"
          >
            <div className="grid h-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
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

                <h2 className="mb-4 max-w-4xl text-3xl font-black leading-tight text-white md:min-h-[7rem] md:text-5xl">
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt ? (
                  <p className="line-clamp-3 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                ) : null}
              </div>

              <div className="flex h-full min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
                <div>
                  <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                    {pageCopy.featuredLabel[locale]}
                  </span>

                  <p className="text-sm leading-relaxed text-slate-300">
                    {pageCopy.featuredHint[locale]}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        {restPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {restPosts.map((post) => (
              <Link
                key={post._id}
                href={{
                  pathname: '/blog/[slug]',
                  params: { slug: post.slug },
                }}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                  {post.category ? (
                    <span>{getBlogCategoryLabel(post.category, locale)}</span>
                  ) : null}

                  {post.category && post.publishedAt ? (
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                  ) : null}

                  {post.publishedAt ? (
                    <span>
                      {formatBlogPostDate(post.publishedAt, locale === 'en' ? 'en-US' : 'pl-PL')}
                    </span>
                  ) : null}
                </div>

                <h3 className="mb-4 min-h-[4.5rem] text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                  {post.title}
                </h3>

                {post.excerpt ? (
                  <p className="mb-8 flex-1 line-clamp-4 text-sm leading-relaxed text-slate-400 md:text-base">
                    {post.excerpt}
                  </p>
                ) : (
                  <div className="mb-8 flex-1" />
                )}

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm text-slate-500">
                    {post.readTimeMinutes ? formatBlogReadTime(post.readTimeMinutes, locale) : ''}
                  </span>

                  <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                    {pageCopy.readMore[locale]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <p className="text-lg font-semibold text-white">{pageCopy.empty[locale]}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
