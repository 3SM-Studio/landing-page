import type { Client } from '@/entities/client/model/client.types';
import { ClientCard } from '@/entities/client/ui/ClientCard';
import type { Locale } from '@/shared/i18n/routing';
import { MarketingPageShell } from '@/shared/ui/MarketingPageShell';
import { PageBreadcrumbs } from '@/shared/ui/PageBreadcrumbs';

type ClientsPageCopy = {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  empty: string;
};

type ClientsPageViewProps = {
  locale: Locale;
  clients: Client[];
  copy: ClientsPageCopy;
};

export function ClientsPageView({ locale, clients, copy }: ClientsPageViewProps) {
  return (
    <MarketingPageShell>
      <PageBreadcrumbs
        locale={locale}
        items={[{ label: locale === 'pl' ? 'klienci' : 'clients' }]}
      />

      <section className="mb-16 max-w-3xl">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-sky-300">
          {copy.badge}
        </p>
        <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
          {copy.title}
        </h1>
        <p className="text-lg leading-relaxed text-slate-400">{copy.description}</p>
      </section>

      {clients.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client._id} locale={locale} client={client} ctaLabel={copy.ctaLabel} />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">{copy.empty}</p>
        </div>
      )}
    </MarketingPageShell>
  );
}
