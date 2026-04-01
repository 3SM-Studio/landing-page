import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import type { CaseStudy } from '../lib/case-studies.types';
import { CaseStudyMeta } from './CaseStudyMeta';

type CaseStudyFeaturedCardProps = {
  locale: Locale;
  item: CaseStudy;
  featuredLabel: string;
  featuredHint: string;
};

export function CaseStudyFeaturedCard({
  locale,
  item,
  featuredLabel,
  featuredHint,
}: CaseStudyFeaturedCardProps) {
  return (
    <Link
      href={{
        pathname: '/case-studies/[slug]',
        params: { slug: item.slug },
      }}
      className="group mb-14 block overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <CaseStudyMeta
            locale={locale}
            category={item.category}
            client={item.client}
            year={item.year}
            size="hero"
          />

          <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
            {item.title}
          </h2>

          {item.excerpt ? (
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              {item.excerpt}
            </p>
          ) : null}

          {item.scope?.length ? (
            <div className="flex flex-wrap gap-3">
              {item.scope.map((scopeItem) => (
                <span
                  key={scopeItem}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                >
                  {scopeItem}
                </span>
              ))}
            </div>
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
