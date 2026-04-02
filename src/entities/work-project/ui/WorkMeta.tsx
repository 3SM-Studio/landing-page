type WorkMetaProps = {
  serviceLabel?: string;
  year?: number;
  size?: 'card' | 'hero' | 'page';
};

export function WorkMeta({ serviceLabel, year, size = 'card' }: WorkMetaProps) {
  const className =
    size === 'card'
      ? 'mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300'
      : 'mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300';

  return (
    <div className={className}>
      {serviceLabel ? <span>{serviceLabel}</span> : null}

      {serviceLabel && year ? <span className="h-1 w-1 rounded-full bg-slate-500" /> : null}

      {year ? <span>{year}</span> : null}
    </div>
  );
}
