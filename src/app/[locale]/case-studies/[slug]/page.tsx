import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextBlock } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getCategoryLabel } from '@/lib/content-taxonomy';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { CASE_STUDY_BY_SLUG_QUERY, CASE_STUDY_SLUGS_QUERY } from '@/sanity/queries';

type CaseStudyDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type SanitySlug = {
  slug: string;
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
  coverImage?: SanityImageSource | null;
  coverImageAlt?: string;
  scope?: string[];
  problem?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  result?: PortableTextBlock[];
  galleryIntro?: PortableTextBlock[];
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await client.fetch<SanitySlug[]>(
        CASE_STUDY_SLUGS_QUERY,
        { locale },
        { next: { revalidate: 60 } },
      );

      return items.map((item) => ({
        locale,
        slug: item.slug,
      }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const caseStudy = await client.fetch<SanityCaseStudy | null>(
    CASE_STUDY_BY_SLUG_QUERY,
    { locale, slug },
    { next: { revalidate: 60 } },
  );

  if (!caseStudy) {
    return {
      title: 'Case study not found',
    };
  }

  return {
    title: `${caseStudy.title} | Case Studies | 3SM`,
    description: caseStudy.excerpt ?? '',
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const caseStudy = await client.fetch<SanityCaseStudy | null>(
    CASE_STUDY_BY_SLUG_QUERY,
    { locale, slug },
    { next: { revalidate: 60 } },
  );

  if (!caseStudy) {
    notFound();
  }

  const coverImageUrl = caseStudy.coverImage
    ? urlFor(caseStudy.coverImage).width(1400).height(800).fit('crop').url()
    : null;

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
            {locale === 'en' ? '← Back to case studies' : '← Wróć do case studies'}
          </Link>
        </div>

        <article className="mx-auto max-w-5xl">
          <header className="mb-16 max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {caseStudy.category ? (
                <span>{getCategoryLabel(caseStudy.category, locale)}</span>
              ) : null}
              {caseStudy.category && caseStudy.client ? (
                <span className="h-1 w-1 rounded-full bg-slate-500" />
              ) : null}
              {caseStudy.client ? <span>{caseStudy.client}</span> : null}
              {caseStudy.client && caseStudy.year ? (
                <span className="h-1 w-1 rounded-full bg-slate-500" />
              ) : null}
              {caseStudy.year ? <span>{caseStudy.year}</span> : null}
            </div>

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
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {locale === 'en' ? 'Problem' : 'Problem'}
              </p>
              <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
                {caseStudy.problem?.length ? (
                  <PortableText value={caseStudy.problem} />
                ) : (
                  <p>{locale === 'en' ? 'No problem description yet.' : 'Brak opisu problemu.'}</p>
                )}
              </div>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {locale === 'en' ? 'Solution' : 'Rozwiązanie'}
              </p>
              <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
                {caseStudy.solution?.length ? (
                  <PortableText value={caseStudy.solution} />
                ) : (
                  <p>
                    {locale === 'en' ? 'No solution description yet.' : 'Brak opisu rozwiązania.'}
                  </p>
                )}
              </div>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-1">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {locale === 'en' ? 'Outcome' : 'Efekt'}
              </p>
              <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
                {caseStudy.result?.length ? (
                  <PortableText value={caseStudy.result} />
                ) : (
                  <p>{locale === 'en' ? 'No result description yet.' : 'Brak opisu efektu.'}</p>
                )}
              </div>
            </article>
          </div>

          <div className="mt-12 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              {locale === 'en' ? 'Gallery / reel / mockups' : 'Galeria / reel / mockupy'}
            </p>

            <div className="max-w-2xl text-sm leading-relaxed text-slate-300">
              {caseStudy.galleryIntro?.length ? (
                <PortableText value={caseStudy.galleryIntro} />
              ) : (
                <p>
                  {locale === 'en'
                    ? 'Here you can later add mockups, screenshots, videos or a full project breakdown.'
                    : 'Tutaj później możesz dodać mockupy, screeny, video albo pełny breakdown projektu.'}
                </p>
              )}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
