import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import type { Service } from '@/entities/service/model/service.types';
import { ServiceBackground } from '@/entities/service/ui/ServiceBackground';
import { ServiceMeta } from '@/entities/service/ui/ServiceMeta';
import { ServiceRelatedContentSection } from './ServiceRelatedContentSection';

type ServiceDetailCopy = {
  backToServices: string;
  deliverablesTitle: string;
  deliverablesEmpty: string;
  introTitle: string;
  introEmpty: string;
  relatedWorkTitle: string;
  relatedWorkEmpty: string;
  relatedCaseStudiesTitle: string;
  relatedCaseStudiesEmpty: string;
  viewProject: string;
  viewCaseStudy: string;
  notFound: string;
};

type ServiceDetailPageViewProps = {
  locale: Locale;
  service: Service;
  copy: ServiceDetailCopy;
};

export function ServiceDetailPageView({ locale, service, copy }: ServiceDetailPageViewProps) {
  const coverImageUrl = service.coverImage
    ? urlFor(service.coverImage).width(1400).height(800).fit('crop').url()
    : null;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <ServiceBackground />

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/services"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            {copy.backToServices}
          </Link>
        </div>

        <article className="mx-auto max-w-5xl">
          <header className="mb-12">
            <ServiceMeta
              locale={locale}
              serviceKey={service.serviceKey}
              featured={service.featured}
            />

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {service.title}
            </h1>

            {service.shortDescription ? (
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
                {service.shortDescription}
              </p>
            ) : null}

            {service.deliverables?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {coverImageUrl ? (
            <div className="mb-12 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <Image
                src={coverImageUrl}
                alt={service.coverImageAlt || service.title}
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {copy.introTitle}
            </p>

            <div className="max-w-3xl text-sm leading-relaxed text-slate-300">
              {service.intro?.length ? (
                <PortableText value={service.intro} />
              ) : (
                <p>{copy.introEmpty}</p>
              )}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ServiceRelatedContentSection
              locale={locale}
              title={copy.relatedWorkTitle}
              emptyLabel={copy.relatedWorkEmpty}
              viewLabel={copy.viewProject}
              items={service.relatedWorkProjects}
              hrefPathname="/work/[slug]"
            />

            <ServiceRelatedContentSection
              locale={locale}
              title={copy.relatedCaseStudiesTitle}
              emptyLabel={copy.relatedCaseStudiesEmpty}
              viewLabel={copy.viewCaseStudy}
              items={service.relatedCaseStudies}
              hrefPathname="/case-studies/[slug]"
            />
          </div>
        </article>
      </Container>
    </section>
  );
}
