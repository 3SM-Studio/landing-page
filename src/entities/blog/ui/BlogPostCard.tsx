import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import type { BlogPost } from '../model/blog.types';
import { BlogPostMeta } from './BlogPostMeta';
import { formatBlogReadTime } from '../model/blog.format';

type BlogPostCardProps = {
  locale: Locale;
  post: BlogPost;
  readMoreLabel: string;
};

export function BlogPostCard({ locale, post, readMoreLabel }: BlogPostCardProps) {
  return (
    <Link
      href={{
        pathname: '/blog/[slug]',
        params: { slug: post.slug },
      }}
      className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    >
      <BlogPostMeta
        locale={locale}
        categoryLabel={post.category?.title}
        publishedAt={post.publishedAt}
        readTimeMinutes={post.readTimeMinutes}
        size="card"
      />

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
          {formatBlogReadTime(post.readTimeMinutes, locale)}
        </span>

        <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
          {readMoreLabel}
        </span>
      </div>
    </Link>
  );
}
