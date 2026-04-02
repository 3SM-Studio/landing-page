import { Link } from '@/shared/i18n/navigation';
import type { WorkProject } from '../model/work.types';
import { WorkMeta } from './WorkMeta';

type WorkCardProps = {
  item: WorkProject;
  viewProjectLabel: string;
};

export function WorkCard({ item, viewProjectLabel }: WorkCardProps) {
  const serviceLabel = item.primaryService?.title;

  return (
    <Link
      href={{
        pathname: '/work/[slug]',
        params: { slug: item.slug },
      }}
      className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
    >
      <WorkMeta serviceLabel={serviceLabel} year={item.year} size="card" />

      <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
        {item.title}
      </h3>

      {item.description ? (
        <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
          {item.description}
        </p>
      ) : (
        <div className="mb-8 flex-1" />
      )}

      <div className="flex items-center justify-between border-t border-white/10 pt-5">
        <span className="text-sm text-slate-500">{serviceLabel ?? ''}</span>

        <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
          {viewProjectLabel}
        </span>
      </div>
    </Link>
  );
}
