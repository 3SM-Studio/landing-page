import Image from 'next/image';
import { Globe, MapPin, BriefcaseBusiness, Layers3 } from 'lucide-react';
import { PortableText } from 'next-sanity';
import type { Client } from '@/entities/client/model/client.types';
import { ClientLogo } from '@/entities/client/ui/ClientLogo';
import { CaseStudyCard } from '@/entities/case-study/ui/CaseStudyCard';
import { Link } from '@/shared/i18n/navigation';
import { BrandSocialLinksList } from '@/shared/ui/social-links/BrandSocialLinksList';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
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
  aboutTitle: string;
  profileTitle: string;
  locationLabel: string;
  collaborationTitle: string;
  highlightsTitle: string;
  highlightsEmpty: string;
  workCountLabel: string;
};

type ClientDetailPageViewProps = {
  locale: Locale;
  client: Client;
  copy: ClientDetailCopy;
};

function formatLocation(client: Client) {
  return [client.location?.city, client.location?.country].filter(Boolean).join(', ');
}

export function ClientDetailPageView({ locale, client, copy }: ClientDetailPageViewProps) {
  const location = formatLocation(client);
  const workCount = client.relatedCaseStudies?.length ?? 0;
  const hasAboutContent = Boolean(client.shortDescription || client.collaborationSummary?.length);
  const hasHighlights = Boolean(client.featuredMedia?.length);

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

      <article className="space-y-12">
        <header className="grid gap-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-8 flex min-h-24 items-center rounded-[24px] border border-white/8 bg-slate-950/50 px-6 py-5">
              <ClientLogo client={client} size="lg" />
            </div>

            {client.industry ? (
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-sky-300">
                {client.industry}
              </p>
            ) : null}

            <h1 className="mb-4 text-4xl font-black leading-tight text-white md:text-6xl">
              {client.name}
            </h1>

            {client.tagline ? (
              <p className="mb-5 max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
                {client.tagline}
              </p>
            ) : null}

            {client.shortDescription ? (
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
                {client.shortDescription}
              </p>
            ) : null}
          </div>

          <aside className="rounded-[28px] border border-white/10 bg-black/20 p-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {copy.profileTitle}
            </p>

            <div className="space-y-4 text-sm text-slate-300">
              {client.industry ? (
                <div className="flex items-start gap-3">
                  <BriefcaseBusiness className="mt-0.5 h-4 w-4 text-slate-500" />
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {copy.industryLabel}
                    </p>
                    <p>{client.industry}</p>
                  </div>
                </div>
              ) : null}

              {location ? (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {copy.locationLabel}
                    </p>
                    <p>{location}</p>
                  </div>
                </div>
              ) : null}

              <div className="flex items-start gap-3">
                <Layers3 className="mt-0.5 h-4 w-4 text-slate-500" />
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {copy.workCountLabel}
                  </p>
                  <p>{workCount}</p>
                </div>
              </div>

              {client.website ? (
                <div className="pt-2">
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <Globe className="h-4 w-4" />
                    {copy.websiteLabel}
                  </a>
                </div>
              ) : null}
            </div>

            {client.socialLinks ? (
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {copy.socialLinksTitle}
                </p>
                <BrandSocialLinksList links={client.socialLinks} />
              </div>
            ) : null}
          </aside>
        </header>

        {hasAboutContent ? (
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-300">
              <h2 className="text-2xl font-bold text-white">{copy.aboutTitle}</h2>

              {client.collaborationSummary?.length ? (
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
                  <PortableText value={client.collaborationSummary} />
                </div>
              ) : client.shortDescription ? (
                <p className="text-lg text-slate-300">{client.shortDescription}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {hasHighlights ? (
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-8 max-w-2xl">
              <h2 className="mb-3 text-3xl font-bold text-white">{copy.highlightsTitle}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {client.featuredMedia?.map((item, index) => {
                if (!item.asset) {
                  return null;
                }

                const imageUrl = urlFor(item.asset).width(1200).height(900).fit('crop').url();

                return (
                  <figure
                    key={item._key ?? `${client._id}-${index}`}
                    className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20"
                  >
                    <Image
                      src={imageUrl}
                      alt={item.alt || `${client.name} highlight ${index + 1}`}
                      width={1200}
                      height={900}
                      className="aspect-[4/3] h-auto w-full object-cover"
                    />
                    {item.caption ? (
                      <figcaption className="px-4 py-3 text-sm text-slate-400">
                        {item.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              })}
            </div>
          </section>
        ) : null}

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
