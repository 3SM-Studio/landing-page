import type { Locale } from '@/shared/i18n/routing';
import { getBlogCategoryLabel } from '../lib/blog.categories';
import { formatBlogPostDate, formatBlogReadTime } from '../lib/blog.format';

type BlogPostMetaProps = {
  locale: Locale;
  category?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
  size?: 'card' | 'hero' | 'page';
};

export function BlogPostMeta({
  locale,
  category,
  publishedAt,
  readTimeMinutes,
  size = 'card',
}: BlogPostMetaProps) {
  const className =
    size === 'card'
      ? 'mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300'
      : 'mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300';

  const formattedDate = formatBlogPostDate(publishedAt, locale);
  const formattedReadTime = formatBlogReadTime(readTimeMinutes, locale);

  return (
    <div className={className}>
      {category ? <span>{getBlogCategoryLabel(category, locale)}</span> : null}

      {category && formattedDate ? <span className="h-1 w-1 rounded-full bg-slate-500" /> : null}

      {formattedDate ? <span>{formattedDate}</span> : null}

      {formattedDate && formattedReadTime ? (
        <span className="h-1 w-1 rounded-full bg-slate-500" />
      ) : null}

      {formattedReadTime ? <span>{formattedReadTime}</span> : null}
    </div>
  );
}
