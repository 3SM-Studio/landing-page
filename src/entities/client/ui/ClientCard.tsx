import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import type { Client } from '../model/client.types';
import { ClientLogo } from './ClientLogo';

type ClientCardProps = {
  locale: Locale;
  client: Client;
  ctaLabel: string;
};

export function ClientCard({ locale, client, ctaLabel }: ClientCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
      <div className="mb-8 flex min-h-18 items-center justify-between gap-4 rounded-[22px] border border-white/8 bg-slate-950/50 px-5 py-4">
        <ClientLogo client={client} size="md" />
        <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-sky-300" />
      </div>

      {client.industry ? (
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300">
          {client.industry}
        </p>
      ) : null}

      <h3 className="mb-3 text-2xl font-bold text-white">{client.name}</h3>

      {client.tagline ? (
        <p className="mb-3 text-sm font-medium text-slate-300">{client.tagline}</p>
      ) : null}

      {client.shortDescription ? (
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">
          {client.shortDescription}
        </p>
      ) : (
        <div className="mb-6 flex-1" />
      )}

      <Link
        href={{ pathname: '/clients/[slug]', params: { slug: client.slug } }}
        locale={locale}
        className="inline-flex items-center text-sm font-medium text-sky-300 transition hover:text-white"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
