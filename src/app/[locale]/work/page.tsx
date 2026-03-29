import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import {
  featuredWork,
  getLocalizedValue,
  selectedWorks,
  workCategories,
  type Locale,
} from '@/lib/data/work-content';

type WorkPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

function isLocale(value: string): value is Locale {
  return value === 'pl' || value === 'en';
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'pl';

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-sky-300 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
            {locale === 'en' ? 'Work' : 'Work'}
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            {locale === 'en' ? (
              <>
                Selected work,
                <br />
                formats and things we can actually deliver.
              </>
            ) : (
              <>
                Wybrane realizacje,
                <br />
                formaty i rzeczy, które umiemy dowozić.
              </>
            )}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {locale === 'en'
              ? 'Video, photography, branding, websites and content. Everything built so the brand feels coherent instead of being stitched together from five different ideas.'
              : 'Wideo, zdjęcia, branding, strony i content. Wszystko po to, żeby marka wyglądała spójnie i nie sprawiała wrażenia sklejonej z pięciu różnych pomysłów.'}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {workCategories.map((category, index) => (
            <button
              key={category.key}
              type="button"
              className={[
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                index === 0
                  ? 'border-sky-400/40 bg-sky-400/10 text-white'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {getLocalizedValue(category.label, locale)}
            </button>
          ))}
        </div>

        <Link
          href={{
            pathname: '/work/[slug]',
            params: { slug: featuredWork.slug[locale] ?? featuredWork.slug.pl },
          }}
          className="group mb-14 block overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/7 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                <span>{getLocalizedValue(featuredWork.category, locale)}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{featuredWork.year}</span>
              </div>

              <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                {getLocalizedValue(featuredWork.title, locale)}
              </h2>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                {getLocalizedValue(featuredWork.description, locale)}
              </p>

              {featuredWork.services?.length ? (
                <div className="flex flex-wrap gap-3">
                  {featuredWork.services.map((item) => (
                    <span
                      key={getLocalizedValue(item, locale)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                    >
                      {getLocalizedValue(item, locale)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
              <div>
                <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                  {locale === 'en' ? 'Featured work' : 'Wyróżniony projekt'}
                </span>

                <p className="text-sm leading-relaxed text-slate-300">
                  {locale === 'en'
                    ? 'Open the full project breakdown.'
                    : 'Wejdź i zobacz pełny opis projektu.'}
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div className="mb-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {selectedWorks.map((item) => {
            const slug = item.slug[locale] ?? item.slug.pl;

            return (
              <Link
                key={`${slug}-${item.year}`}
                href={{
                  pathname: '/work/[slug]',
                  params: { slug },
                }}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                  <span>{getLocalizedValue(item.category, locale)}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-500" />
                  <span>{item.year}</span>
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                  {getLocalizedValue(item.title, locale)}
                </h3>

                <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                  {getLocalizedValue(item.description, locale)}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-sm text-slate-500">
                    {getLocalizedValue(item.category, locale)}
                  </span>

                  <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                    {locale === 'en' ? 'View project' : 'Zobacz projekt'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
