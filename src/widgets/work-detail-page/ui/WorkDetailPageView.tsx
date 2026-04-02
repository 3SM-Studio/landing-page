import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import type { WorkDetailCopy, WorkProject } from '@/entities/work-project/model/work.types';
import { WorkBackground } from '@/entities/work-project/ui/WorkBackground';
import { WorkMeta } from '@/entities/work-project/ui/WorkMeta';
import { WorkPortableSection } from '@/entities/work-project/ui/WorkPortableSection';

type WorkDetailPageViewProps = {
  locale: Locale;
  work: WorkProject;
  copy: WorkDetailCopy;
};

export function WorkDetailPageView({ locale, work, copy }: WorkDetailPageViewProps) {
  const coverImageUrl = work.coverImage
    ? urlFor(work.coverImage).width(1400).height(800).fit('crop').url()
    : null;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <WorkBackground />

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/work"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            {copy.backToWork}
          </Link>
        </div>

        <article className="mx-auto max-w-5xl">
          <header className="mb-12">
            <WorkMeta serviceLabel={work.primaryService?.title} year={work.year} size="page" />

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {work.title}
            </h1>

            {work.description ? (
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
                {work.description}
              </p>
            ) : null}

            {work.services?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {work.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {service}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {coverImageUrl ? (
            <div className="mb-12 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <Image
                src={coverImageUrl}
                alt={work.coverImageAlt || work.title}
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-3">
            <WorkPortableSection
              title={copy.challengeTitle}
              body={work.challenge}
              emptyLabel={copy.challengeEmpty}
            />

            <WorkPortableSection
              title={copy.solutionTitle}
              body={work.solution}
              emptyLabel={copy.solutionEmpty}
            />

            <WorkPortableSection
              title={copy.outcomeTitle}
              body={work.outcome}
              emptyLabel={copy.outcomeEmpty}
            />
          </div>

          <div className="mt-12 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {copy.galleryTitle}
            </p>

            <div className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {work.intro?.length ? (
                <PortableText value={work.intro} />
              ) : (
                <p>{copy.galleryEmpty}</p>
              )}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
