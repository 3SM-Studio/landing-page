import type { Locale } from '@/shared/i18n/routing';

type ServiceMetaProps = {
  locale: Locale;
  serviceKey: string;
  featured?: boolean;
  size?: 'card' | 'page';
};

export function ServiceMeta({
  locale,
  serviceKey,
  featured = false,
  size = 'page',
}: ServiceMetaProps) {
  const featuredLabel = locale === 'pl' ? 'Wyróżnione' : 'Featured';

  const baseClassName =
    size === 'page'
      ? 'mb-6 flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em]'
      : 'mb-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]';

  return (
    <div className={baseClassName}>
      <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sky-200">
        {serviceKey}
      </span>

      {featured ? (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
          {featuredLabel}
        </span>
      ) : null}
    </div>
  );
}
