import type { Locale } from '@/shared/i18n/routing';
import { formatBlogPostDate, formatBlogReadTime } from '../model/blog.format';

type BlogPostMetaProps = {
  locale: Locale;
  categoryLabel?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
  size?: 'card' | 'hero' | 'page';
};

export function BlogPostMeta({
  locale,
  categoryLabel,
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
      {categoryLabel ? <span>{categoryLabel}</span> : null}

      {categoryLabel && formattedDate ? (
        <span className="h-1 w-1 rounded-full bg-slate-500" />
      ) : null}

      {formattedDate ? <span>{formattedDate}</span> : null}

      {formattedDate && formattedReadTime ? (
        <span className="h-1 w-1 rounded-full bg-slate-500" />
      ) : null}

      {formattedReadTime ? <span>{formattedReadTime}</span> : null}
    </div>
  );
}
