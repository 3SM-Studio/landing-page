import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getLocalizedValue, getWorkBySlug, selectedWorks } from '@/lib/data/work-content';

type WorkDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function generateStaticParams() {
  return selectedWorks.flatMap((item) => {
    const params = [{ locale: 'pl', slug: item.slug.pl }];

    if (item.slug.en) {
      params.push({ locale: 'en', slug: item.slug.en });
    }

    return params;
  });
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;
  const work = getWorkBySlug(slug, locale);

  if (!work) {
    return {
      title: 'Not found',
    };
  }

  const title = getLocalizedValue(work.title, locale);
  const description = getLocalizedValue(work.description, locale);

  return {
    title: `${title} | Work | 3SM`,
    description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;
  const work = getWorkBySlug(slug, locale);

  if (!work) {
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
            href="/work"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            {locale === 'en' ? '← Back to work' : '← Wróć do realizacji'}
          </Link>
        </div>

        <article className="mx-auto max-w-5xl">
          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              <span>{getLocalizedValue(work.category, locale)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{work.year}</span>
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {getLocalizedValue(work.title, locale)}
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {getLocalizedValue(work.description, locale)}
            </p>

            {work.services?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {work.services.map((item) => (
                  <span
                    key={getLocalizedValue(item, locale)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {getLocalizedValue(item, locale)}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {locale === 'en' ? 'Challenge' : 'Problem'}
              </p>
              <p className="text-base leading-relaxed text-slate-300">
                {work.content
                  ? getLocalizedValue(work.content.challenge, locale)
                  : locale === 'en'
                    ? 'No challenge description yet.'
                    : 'Brak opisu problemu.'}
              </p>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {locale === 'en' ? 'Solution' : 'Rozwiązanie'}
              </p>
              <p className="text-base leading-relaxed text-slate-300">
                {work.content
                  ? getLocalizedValue(work.content.solution, locale)
                  : locale === 'en'
                    ? 'No solution description yet.'
                    : 'Brak opisu rozwiązania.'}
              </p>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {locale === 'en' ? 'Outcome' : 'Efekt'}
              </p>
              <p className="text-base leading-relaxed text-slate-300">
                {work.content
                  ? getLocalizedValue(work.content.outcome, locale)
                  : locale === 'en'
                    ? 'No outcome description yet.'
                    : 'Brak opisu efektu.'}
              </p>
            </article>
          </div>

          <div className="mt-12 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {locale === 'en'
                ? 'Placeholder for gallery / reel / mockups'
                : 'Placeholder pod galerię / reel / mockupy'}
            </p>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {work.content
                ? getLocalizedValue(work.content.intro, locale)
                : locale === 'en'
                  ? 'Here you can later add screenshots, a video reel, before/after comparisons or the full project breakdown.'
                  : 'Tutaj później możesz dodać screeny, reel, porównanie before/after albo pełny breakdown projektu.'}
            </p>
          </div>
        </article>
      </Container>
    </section>
  );
}
