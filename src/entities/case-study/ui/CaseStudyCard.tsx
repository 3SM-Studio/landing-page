import { Link } from '@/shared/i18n/navigation';
import type { CaseStudy } from '../model/case-studies.types';
import { CaseStudyMeta } from './CaseStudyMeta';

type CaseStudyCardProps = {
  item: CaseStudy;
  clientLabel: string;
  viewCaseLabel: string;
};

export function CaseStudyCard({ item, clientLabel, viewCaseLabel }: CaseStudyCardProps) {
  return (
    <Link
      href={{
        pathname: '/case-studies/[slug]',
        params: { slug: item.slug },
      }}
      className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    >
      <CaseStudyMeta
        serviceLabel={item.primaryService?.title}
        client={item.client}
        year={item.year}
        size="card"
      />

      <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
        {item.title}
      </h3>

      {item.excerpt ? (
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
          {item.excerpt}
        </p>
      ) : (
        <div className="mb-6 flex-1" />
      )}

      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="mb-3 text-sm text-slate-500">{clientLabel}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-white">{item.client?.name ?? ''}</span>
          <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
            {viewCaseLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
