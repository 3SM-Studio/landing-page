import Image from 'next/image';
import { Globe, MapPin, Handshake, Layers3 } from 'lucide-react';
import { PortableText } from 'next-sanity';
import { FaHome } from 'react-icons/fa';
import type { Partner } from '@/entities/partner/model/partner.types';
import { PartnerLogo } from '@/entities/partner/ui/PartnerLogo';
import { CaseStudyCard } from '@/entities/case-study/ui/CaseStudyCard';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import { MarketingPageShell } from '@/shared/ui/MarketingPageShell';
import { BrandSocialLinksList } from '@/shared/ui/social-links/BrandSocialLinksList';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/Breadcrumb';

export type PartnerDetailCopy = {
  backToPartners: string;
  partnershipTypeLabel: string;
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

type PartnerDetailPageViewProps = {
  locale: Locale;
  partner: Partner;
  copy: PartnerDetailCopy;
};

type PartnerWithBanner = Partner & {
  bannerImage?: Partner['logo'];
  bannerImageAlt?: string;
};

function formatLocation(partner: Partner) {
  return [partner.location?.city, partner.location?.country].filter(Boolean).join(', ');
}

function getBannerData(partner: PartnerWithBanner) {
  if (partner.bannerImage) {
    return {
      asset: partner.bannerImage,
      alt: partner.bannerImageAlt || `${partner.name} banner`,
      usedFeaturedKey: undefined as string | undefined,
    };
  }

  const fallback = partner.featuredMedia?.find((item) => item.asset);

  if (fallback?.asset) {
    return {
      asset: fallback.asset,
      alt: fallback.alt || `${partner.name} banner`,
      usedFeaturedKey: fallback._key,
    };
  }

  return {
    asset: null,
    alt: `${partner.name} banner`,
    usedFeaturedKey: undefined as string | undefined,
  };
}

export function PartnerDetailPageView({ locale, partner, copy }: PartnerDetailPageViewProps) {
  const partnerWithBanner = partner as PartnerWithBanner;
  const location = formatLocation(partner);
  const workCount = partner.relatedCaseStudies?.length ?? 0;
  const breadcrumbSectionLabel = locale === 'pl' ? 'partnerzy' : 'partners';
  const homeLabel = locale === 'pl' ? 'Strona główna' : 'Home';
  const banner = getBannerData(partnerWithBanner);

  const visibleMedia =
    banner.usedFeaturedKey && partner.featuredMedia?.length
      ? partner.featuredMedia.filter((item) => item._key !== banner.usedFeaturedKey)
      : partner.featuredMedia;

  const primaryMedia = visibleMedia?.[0];
  const secondaryMedia = visibleMedia?.slice(1) ?? [];

  return (
    <MarketingPageShell>
      <Breadcrumb className="mb-10">
        <BreadcrumbList className="text-sm text-slate-400">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                locale={locale}
                aria-label={homeLabel}
                className="inline-flex items-center text-slate-400 transition hover:text-white"
              >
                <FaHome className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/partners"
                locale={locale}
                className="lowercase text-slate-400 transition hover:text-white"
              >
                {breadcrumbSectionLabel}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-slate-600" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white">{partner.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="space-y-12">
        <header className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl md:p-5">
          <div className="relative overflow-hidden rounded-[28px] bg-slate-950">
            {banner.asset ? (
              <Image
                src={urlFor(banner.asset).width(1600).height(520).fit('crop').url()}
                alt={banner.alt}
                width={1600}
                height={520}
                className="h-[180px] w-full object-cover md:h-[220px]"
              />
            ) : (
              <div className="h-[180px] w-full bg-slate-950 md:h-[220px]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/15" />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-[-8%] top-[-24%] h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="absolute right-[-4%] top-[8%] h-40 w-40 rounded-full bg-teal-500/15 blur-3xl" />
              <div className="absolute bottom-[-16%] left-[24%] h-56 w-56 rounded-full bg-indigo-500/18 blur-3xl" />
            </div>
          </div>

          <div className="relative z-10 -mt-12 px-3 pb-3 md:-mt-14 md:px-5 md:pb-5">
            <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-950/90 p-0 shadow-[0_20px_60px_rgba(2,6,23,0.55)] md:h-28 md:w-28">
              <PartnerLogo
                partner={partner}
                size="lg"
                className="h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover"
              />
            </div>

            {partner.partnershipType ? (
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-sky-300">
                {partner.partnershipType}
              </p>
            ) : null}
            <h1 className="mb-4 text-4xl font-black leading-tight text-white md:text-6xl">
              {partner.name}
            </h1>
            {partner.tagline ? (
              <p className="mb-5 max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
                {partner.tagline}
              </p>
            ) : null}
            {partner.shortDescription ? (
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
                {partner.shortDescription}
              </p>
            ) : null}
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] xl:items-start">
          <div className="space-y-8">
            <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-300">
                <h2 className="text-2xl font-bold text-white">{copy.aboutTitle}</h2>
                {partner.collaborationSummary?.length ? (
                  <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
                    <PortableText value={partner.collaborationSummary} />
                  </div>
                ) : partner.shortDescription ? (
                  <p>{partner.shortDescription}</p>
                ) : null}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="mb-8 max-w-2xl">
                <h2 className="mb-3 text-3xl font-bold text-white">{copy.highlightsTitle}</h2>
              </div>

              {visibleMedia?.length ? (
                <div className="space-y-6">
                  {primaryMedia?.asset ? (
                    <figure className="overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
                      <Image
                        src={urlFor(primaryMedia.asset).width(1600).height(900).fit('crop').url()}
                        alt={primaryMedia.alt || `${partner.name} highlight`}
                        width={1600}
                        height={900}
                        className="aspect-video h-auto w-full object-cover"
                      />
                      {primaryMedia.caption ? (
                        <figcaption className="px-5 py-4 text-sm text-slate-400">
                          {primaryMedia.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}

                  {secondaryMedia.length ? (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {secondaryMedia.map((item, index) => {
                        if (!item.asset) {return null;}

                        return (
                          <figure
                            key={item._key ?? `${partner._id}-media-${index}`}
                            className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20"
                          >
                            <Image
                              src={urlFor(item.asset).width(1200).height(900).fit('crop').url()}
                              alt={item.alt || `${partner.name} highlight ${index + 2}`}
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
                  ) : null}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-black/20 p-8 text-center text-slate-400">
                  {copy.highlightsEmpty}
                </div>
              )}
            </section>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl xl:sticky xl:top-28">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-sky-300">
              {copy.profileTitle}
            </p>
            <div className="space-y-4 text-sm text-slate-300">
              {partner.partnershipType ? (
                <div className="flex items-start gap-3">
                  <Handshake className="mt-0.5 h-4 w-4 text-slate-500" />
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {copy.partnershipTypeLabel}
                    </p>
                    <p>{partner.partnershipType}</p>
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
              {partner.website ? (
                <div className="pt-2">
                  <a
                    href={partner.website}
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

            {partner.socialLinks ? (
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {copy.socialLinksTitle}
                </p>
                <BrandSocialLinksList links={partner.socialLinks} />
              </div>
            ) : null}
          </aside>
        </div>

        <section>
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold text-white">{copy.relatedCaseStudiesTitle}</h2>
          </div>
          {partner.relatedCaseStudies?.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {partner.relatedCaseStudies.map((item) => (
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
