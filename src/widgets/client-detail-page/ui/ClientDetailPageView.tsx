import { Globe } from 'lucide-react';
import type { Client } from '@/entities/client/model/client.types';
import { ClientLogo } from '@/entities/client/ui/ClientLogo';
import { CaseStudyCard } from '@/entities/case-study/ui/CaseStudyCard';
import { Link } from '@/shared/i18n/navigation';
import { BrandSocialLinksList } from '@/shared/ui/social-links/BrandSocialLinksList';
import type { Locale } from '@/shared/i18n/routing';
import { MarketingPageShell } from '@/shared/ui/MarketingPageShell';

export type ClientDetailCopy = {
  backToClients: string;
  industryLabel: string;
  websiteLabel: string;
  socialLinksTitle: string;
  relatedCaseStudiesTitle: string;
  relatedCaseStudiesEmpty: string;
  viewCase: string;
  clientLabel: string;
};

type ClientDetailPageViewProps = {
  locale: Locale;
  client: Client;
  copy: ClientDetailCopy;
};

export function ClientDetailPageView({ locale, client, copy }: ClientDetailPageViewProps) {
  return (
    <MarketingPageShell>
      <div className="mb-10">
        <Link
          href="/clients"
          locale={locale}
          className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
        >
          {copy.backToClients}
        </Link>
      </div>

      <article>
        <header className="mb-12 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
          <div className="mb-8 flex min-h-24 items-center rounded-[24px] border border-white/8 bg-slate-950/50 px-6 py-5">
            <ClientLogo client={client} size="lg" />
          </div>

          {client.industry ? (
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-sky-300">
              {client.industry}
            </p>
          ) : null}

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl">
            {client.name}
          </h1>

          {client.shortDescription ? (
            <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {client.shortDescription}
            </p>
          ) : null}

          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="flex flex-wrap gap-4">
              {client.industry ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="mr-2 text-slate-500">{copy.industryLabel}</span>
                  {client.industry}
                </span>
              ) : null}

              {client.website ? (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-white/20 hover:bg-white/10"
                >
                  <Globe className="h-4 w-4" />
                  {copy.websiteLabel}
                </a>
              ) : null}
            </div>

            {client.socialLinks ? (
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  {copy.socialLinksTitle}
                </p>
                <BrandSocialLinksList links={client.socialLinks} />
              </div>
            ) : null}
          </div>
        </header>

        <section>
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold text-white">{copy.relatedCaseStudiesTitle}</h2>
          </div>

          {client.relatedCaseStudies?.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {client.relatedCaseStudies.map((item) => (
                <CaseStudyCard
                  key={item._id}
                  item={item}
                  clientLabel={copy.clientLabel}
                  viewCaseLabel={copy.viewCase}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
              <p className="text-lg font-semibold text-white">{copy.relatedCaseStudiesEmpty}</p>
            </div>
          )}
        </section>
      </article>
    </MarketingPageShell>
  );
}
