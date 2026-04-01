import type { Locale } from '@/shared/i18n/routing';
import { getCaseStudyCategoryLabel } from '../lib/case-studies.categories';

type CaseStudyMetaProps = {
  locale: Locale;
  category?: string;
  client?: string;
  year?: number;
  size?: 'card' | 'hero' | 'page';
};

export function CaseStudyMeta({
  locale,
  category,
  client,
  year,
  size = 'card',
}: CaseStudyMetaProps) {
  const className =
    size === 'card'
      ? 'mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300'
      : 'mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300';

  return (
    <div className={className}>
      {category ? <span>{getCaseStudyCategoryLabel(category, locale)}</span> : null}

      {category && client ? <span className="h-1 w-1 rounded-full bg-slate-500" /> : null}

      {client ? <span>{client}</span> : null}

      {(category || client) && year ? <span className="h-1 w-1 rounded-full bg-slate-500" /> : null}

      {year ? <span>{year}</span> : null}
    </div>
  );
}
