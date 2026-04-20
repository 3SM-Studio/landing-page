import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';
import type { Locale } from '@/shared/i18n/routing';
import { getLocalizedDynamicPathname, resolveCmsHref, routes } from '@/shared/lib/routes';
import { urlFor } from '@/shared/sanity/image';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';

type PortfolioFallbackItem = {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  alt: string;
  href?: string;
};

type PortfolioSectionProps = {
  locale: Locale;
  caseStudies?: CaseStudy[];
  content?: {
    eyebrow?: string;
    title?: string;
    cta?: string;
    ctaHref?: string;
    items?: PortfolioFallbackItem[];
  };
};

type PortfolioDisplayItem = {
  key: string;
  title: string;
  subtitle: string;
  tag: string;
  image?: string;
  alt: string;
  href: string;
};

function mapCaseStudiesToPortfolioItems(
  locale: Locale,
  items: CaseStudy[],
): PortfolioDisplayItem[] {
  return items.flatMap((item) => {
    const image = item.coverImage
      ? urlFor(item.coverImage).width(1600).height(1000).fit('crop').url()
      : undefined;
    const subtitleParts = [item.client?.name, item.year ? String(item.year) : undefined].filter(
      Boolean,
    );

    if (!item.slug) {
      return [];
    }

    return [
      {
        key: item._id,
        title: item.title,
        subtitle: subtitleParts.join(' - '),
        tag: item.primaryService?.title || 'Case study',
        image,
        alt: item.coverImageAlt || item.title,
        href: getLocalizedDynamicPathname(routes.caseStudyDetail, locale, { slug: item.slug }),
      },
    ];
  });
}

export function PortfolioSection({ locale, caseStudies = [], content }: PortfolioSectionProps) {
  const t = useTranslations('PortfolioSection');

  const fallbackItems = (content?.items || (t.raw('items') as PortfolioFallbackItem[])).map(
    (item, index) => ({
      key: `${item.title}-${index}`,
      title: item.title,
      subtitle: item.subtitle,
      tag: item.tag,
      image: item.image,
      alt: item.alt,
      href: item.href || '#contact',
    }),
  );

  const portfolioItems =
    caseStudies.length > 0 ? mapCaseStudiesToPortfolioItems(locale, caseStudies) : fallbackItems;
  const ctaHref = resolveCmsHref(content?.ctaHref, locale, routes.caseStudies);

  return (
    <section id="portfolio" className="relative py-40">
      <Container>
        <div className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
              {content?.eyebrow || t('eyebrow')}
            </span>

            <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              {content?.title || t('title')}
            </h2>
          </div>

          <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
            <Link href={ctaHref}>{content?.cta || t('cta')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <Link
              key={item.key}
              href={item.href}
              className="group block cursor-pointer"
              aria-label={item.title}
            >
              <article>
                <div className="relative mb-10 aspect-16/10 overflow-hidden rounded-[56px] border border-white/10 shadow-2xl">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover opacity-80 transition-all duration-2000 ease-out group-hover:scale-105 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.35)_0%,rgba(15,23,42,0.8)_100%)]" />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-3sm-navy/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                  <div
                    className={[
                      'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                      index % 2 === 0
                        ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_35%)]'
                        : 'bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_35%)]',
                    ].join(' ')}
                  />

                  <div className="absolute right-10 top-10">
                    <span className="glass-panel-luxe rounded-full border border-white/20 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-end p-14">
                    <div>
                      <h3 className="mb-2 text-4xl font-bold text-white">{item.title}</h3>

                      <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/80">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
