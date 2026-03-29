import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { caseStudies, getCaseStudyBySlug } from '@/lib/data/case-studies';

type CaseStudyDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case study not found',
    };
  }

  return {
    title: `${caseStudy.title} | Case Studies | 3SM`,
    description: caseStudy.excerpt,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/case-studies"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Wróć do case studies
          </Link>
        </div>

        <header className="mb-16 max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
            <span>{caseStudy.category}</span>
            <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span>{caseStudy.client}</span>
            <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span>{caseStudy.year}</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
            {caseStudy.title}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {caseStudy.excerpt}
          </p>

          {caseStudy.scope?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {caseStudy.scope.map((item) => (
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

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              Problem
            </p>
            <p className="text-base leading-relaxed text-slate-300">{caseStudy.problem}</p>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              Rozwiązanie
            </p>
            <p className="text-base leading-relaxed text-slate-300">{caseStudy.solution}</p>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Efekt</p>
            <p className="text-base leading-relaxed text-slate-300">{caseStudy.result}</p>
          </article>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
            Placeholder pod mockup / galerię / screeny
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
            Tu później wrzucasz mockupy, screeny strony, materiały video albo breakdown procesu. Na
            teraz ważne jest to, że architektura działa i możesz to bez bólu rozwijać.
          </p>
        </div>
      </Container>
    </section>
  );
}
