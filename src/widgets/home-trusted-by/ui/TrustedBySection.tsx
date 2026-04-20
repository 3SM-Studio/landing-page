import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/shared/i18n/routing';
import type { Client } from '@/entities/client/model/client.types';
import { ClientLogo } from '@/entities/client/ui/ClientLogo';
import { getLocalizedDynamicPathname, resolveCmsHref, routes } from '@/shared/lib/routes';
import { Container } from '@/shared/ui/Container';

type TrustedBySectionProps = {
  locale: Locale;
  clients: Client[];
  copy?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: string;
    ctaHref?: string;
  };
};

export function TrustedBySection({ locale, clients, copy }: TrustedBySectionProps) {
  const t = useTranslations('TrustedBySection');

  if (clients.length === 0) {
    return null;
  }

  const ctaHref = resolveCmsHref(copy?.ctaHref, locale, routes.clients);

  return (
    <section className="relative py-22 md:py-28">
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.35em] text-3sm-cyan">
              {copy?.eyebrow || t('eyebrow')}
            </span>
            <h2 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              {copy?.title || t('title')}
            </h2>
            <p className="text-base leading-relaxed text-slate-400 md:text-lg">
              {copy?.description || t('description')}
            </p>
          </div>

          <Link
            href={ctaHref}
            className="inline-flex items-center text-sm font-medium text-sky-300 transition hover:text-white"
          >
            {copy?.cta || t('cta')}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {clients.map((client) => (
            <Link
              key={client._id}
              href={getLocalizedDynamicPathname(routes.clientDetail, locale, { slug: client.slug })}
              className="group flex min-h-28 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
            >
              <div className="opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                <ClientLogo client={client} size="md" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
