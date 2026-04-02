import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import type { BlogPost } from '../model/blog.types';
import { BlogPostMeta } from './BlogPostMeta';

type FeaturedBlogPostCardProps = {
  locale: Locale;
  post: BlogPost;
  featuredLabel: string;
  featuredHint: string;
};

export function FeaturedBlogPostCard({
  locale,
  post,
  featuredLabel,
  featuredHint,
}: FeaturedBlogPostCardProps) {
  return (
    <Link
      href={{
        pathname: '/blog/[slug]',
        params: { slug: post.slug },
      }}
      className="group mb-14 block min-h-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 md:min-h-[380px] md:p-8"
    >
      <div className="grid h-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <BlogPostMeta
            locale={locale}
            categoryLabel={post.category?.title}
            publishedAt={post.publishedAt}
            readTimeMinutes={post.readTimeMinutes}
            size="hero"
          />

          <h2 className="mb-4 max-w-4xl text-3xl font-black leading-tight text-white md:min-h-[7rem] md:text-5xl">
            {post.title}
          </h2>

          {post.excerpt ? (
            <p className="line-clamp-3 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              {post.excerpt}
            </p>
          ) : null}
        </div>

        <div className="flex h-full min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
          <div>
            <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
              {featuredLabel}
            </span>

            <p className="text-sm leading-relaxed text-slate-300">{featuredHint}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
