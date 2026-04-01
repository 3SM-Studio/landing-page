import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import type { CaseStudy, CaseStudyDetailCopy } from '../lib/case-studies.types';
import { CaseStudyBackground } from './CaseStudyBackground';
import { CaseStudyMeta } from './CaseStudyMeta';
import { CaseStudyPortableSection } from './CaseStudyPortableSection';

type CaseStudyDetailPageViewProps = {
  locale: Locale;
  caseStudy: CaseStudy;
  copy: CaseStudyDetailCopy;
};

export function CaseStudyDetailPageView({ locale, caseStudy, copy }: CaseStudyDetailPageViewProps) {
  const coverImageUrl = caseStudy.coverImage
    ? urlFor(caseStudy.coverImage).width(1400).height(800).fit('crop').url()
    : null;

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <CaseStudyBackground />

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/case-studies"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            {copy.backToCaseStudies}
          </Link>
        </div>

        <article className="mx-auto max-w-5xl">
          <header className="mb-16 max-w-4xl">
            <CaseStudyMeta
              locale={locale}
              category={caseStudy.category}
              client={caseStudy.client}
              year={caseStudy.year}
              size="page"
            />

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {caseStudy.title}
            </h1>

            {caseStudy.excerpt ? (
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
                {caseStudy.excerpt}
              </p>
            ) : null}

            {caseStudy.scope?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {caseStudy.scope.map((scopeItem) => (
                  <span
                    key={scopeItem}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {scopeItem}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          {coverImageUrl ? (
            <div className="mb-12 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <Image
                src={coverImageUrl}
                alt={caseStudy.coverImageAlt || caseStudy.title}
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-3">
            <CaseStudyPortableSection
              title={copy.problemTitle}
              body={caseStudy.problem}
              emptyLabel={copy.problemEmpty}
            />

            <CaseStudyPortableSection
              title={copy.solutionTitle}
              body={caseStudy.solution}
              emptyLabel={copy.solutionEmpty}
            />

            <CaseStudyPortableSection
              title={copy.resultTitle}
              body={caseStudy.result}
              emptyLabel={copy.resultEmpty}
            />
          </div>

          <div className="mt-12 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {copy.galleryTitle}
            </p>

            <div className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {caseStudy.galleryIntro?.length ? (
                <CaseStudyPortableSection
                  title=""
                  body={caseStudy.galleryIntro}
                  emptyLabel={copy.galleryEmpty}
                />
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
