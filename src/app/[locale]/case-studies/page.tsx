import { Container } from '@/components/ui/Container';
import { ContentCategoryFilters } from '@/components/shared/ContentCategoryFilters';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getCategoryLabel } from '@/lib/content-taxonomy';
import { client } from '@/sanity/client';
import { CASE_STUDIES_QUERY } from '@/sanity/queries';

type CaseStudiesPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    category?: string;
  }>;
};

type SanityCaseStudy = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  client?: string;
  category?: string;
  year?: number;
  featured?: boolean;
  scope?: string[];
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

const allCategoryKey = 'all';

const caseStudyFilters = [
  {
    key: allCategoryKey,
    label: {
      pl: 'Wszystkie',
      en: 'All',
    },
  },
  {
    key: 'branding',
    label: {
      pl: 'Branding',
      en: 'Branding',
    },
  },
  {
    key: 'web',
    label: {
      pl: 'Strony',
      en: 'Web',
    },
  },
  {
    key: 'content',
    label: {
      pl: 'Content',
      en: 'Content',
    },
  },
  {
    key: 'strategy',
    label: {
      pl: 'Strategia',
      en: 'Strategy',
    },
  },
] as const;

function isValidCaseStudyCategory(
  value: string | undefined,
): value is (typeof caseStudyFilters)[number]['key'] {
  if (!value) {return false;}

  return caseStudyFilters.some((filter) => filter.key === value);
}

const pageCopy = {
  badge: {
    pl: 'Case Studies',
    en: 'Case Studies',
  },
  title: {
    pl: 'Projekty, które pokazują\nco działa, a co jest tylko ozdobą.',
    en: 'Projects that show\nwhat works and what is just decoration.',
  },
  description: {
    pl: 'Konkretne realizacje, procesy i decyzje, które realnie poprawiły odbiór marki, strony albo contentu.',
    en: 'Real projects, processes and decisions that actually improved how the brand, website or content was perceived.',
  },
  featuredLabel: {
    pl: 'Wyróżniony case',
    en: 'Featured case',
  },
  featuredHint: {
    pl: 'Kliknij i zobacz pełny case study.',
    en: 'Open the full case study.',
  },
  clientLabel: {
    pl: 'Klient',
    en: 'Client',
  },
  viewCase: {
    pl: 'Zobacz case',
    en: 'View case',
  },
  empty: {
    pl: 'Nie ma jeszcze case studies w tej kategorii.',
    en: 'No case studies found in this category yet.',
  },
} as const;

export default async function CaseStudiesPage({ params, searchParams }: CaseStudiesPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawCategory = resolvedSearchParams?.category;
  const activeCategory = isValidCaseStudyCategory(rawCategory) ? rawCategory : allCategoryKey;

  const items = await client.fetch<SanityCaseStudy[]>(
    CASE_STUDIES_QUERY,
    { locale },
    { next: { revalidate: 60 } },
  );

  const filteredItems =
    activeCategory === allCategoryKey
      ? items
      : items.filter((item) => item.category === activeCategory);

  const featuredItem = filteredItems.find((item) => item.featured) ?? filteredItems[0];
  const restItems = featuredItem
    ? filteredItems.filter((item) => item._id !== featuredItem._id)
    : filteredItems;

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
            {pageCopy.badge[locale]}
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            {pageCopy.title[locale].split('\n').map((line, index, array) => (
              <span key={line}>
                {line}
                {index < array.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            {pageCopy.description[locale]}
          </p>
        </div>

        <ContentCategoryFilters
          filters={caseStudyFilters.map((filter) => ({
            key: filter.key,
            label: filter.label[locale],
          }))}
          activeKey={activeCategory}
        />

        {featuredItem ? (
          <Link
            href={{
              pathname: '/case-studies/[slug]',
              params: { slug: featuredItem.slug },
            }}
            className="group mb-14 block overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                  {featuredItem.category ? (
                    <span>{getCategoryLabel(featuredItem.category, locale)}</span>
                  ) : null}
                  {featuredItem.category && featuredItem.year ? (
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                  ) : null}
                  {featuredItem.year ? <span>{featuredItem.year}</span> : null}
                </div>

                <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                  {featuredItem.title}
                </h2>

                {featuredItem.excerpt ? (
                  <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                    {featuredItem.excerpt}
                  </p>
                ) : null}

                {featuredItem.scope?.length ? (
                  <div className="flex flex-wrap gap-3">
                    {featuredItem.scope.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex h-full min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
                <div>
                  <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                    {pageCopy.featuredLabel[locale]}
                  </span>

                  <p className="text-sm leading-relaxed text-slate-300">
                    {pageCopy.featuredHint[locale]}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        {filteredItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {restItems.map((item) => (
              <Link
                key={item._id}
                href={{
                  pathname: '/case-studies/[slug]',
                  params: { slug: item.slug },
                }}
                className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                  {item.category ? <span>{getCategoryLabel(item.category, locale)}</span> : null}
                  {item.category && item.year ? (
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                  ) : null}
                  {item.year ? <span>{item.year}</span> : null}
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                  {item.title}
                </h3>

                {item.excerpt ? (
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                    {item.excerpt}
                  </p>
                ) : null}

                <div className="mt-auto border-t border-white/10 pt-5">
                  <p className="mb-3 text-sm text-slate-500">{pageCopy.clientLabel[locale]}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-white">{item.client ?? ''}</span>
                    <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                      {pageCopy.viewCase[locale]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <p className="text-lg font-semibold text-white">{pageCopy.empty[locale]}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
