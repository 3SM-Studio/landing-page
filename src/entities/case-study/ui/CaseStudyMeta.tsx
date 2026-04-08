import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import type { LinkedClient } from '@/entities/client/model/client.types';

type CaseStudyMetaProps = {
  locale?: Locale;
  serviceLabel?: string;
  client?: LinkedClient;
  year?: number;
  size?: 'card' | 'hero' | 'page';
  linkClient?: boolean;
};

export function CaseStudyMeta({
  locale,
  serviceLabel,
  client,
  year,
  size = 'card',
  linkClient = false,
}: CaseStudyMetaProps) {
  const className =
    size === 'card'
      ? 'mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300'
      : 'mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300';

  const clientNode = client ? (
    linkClient && locale ? (
      <Link
        href={{ pathname: '/clients/[slug]', params: { slug: client.slug } }}
        locale={locale}
        className="transition hover:text-white"
      >
        {client.name}
      </Link>
    ) : (
      <span>{client.name}</span>
    )
  ) : null;

  return (
    <div className={className}>
      {serviceLabel ? <span>{serviceLabel}</span> : null}

      {serviceLabel && client ? <span className="h-1 w-1 rounded-full bg-slate-500" /> : null}

      {clientNode}

      {(serviceLabel || client) && year ? (
        <span className="h-1 w-1 rounded-full bg-slate-500" />
      ) : null}

      {year ? <span>{year}</span> : null}
    </div>
  );
}
