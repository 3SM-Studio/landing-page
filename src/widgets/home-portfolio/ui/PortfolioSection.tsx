import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { CaseStudy } from '@/entities/case-study/model/case-studies.types';
import { brandConfig } from '@/shared/config/brand/brand.config';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { urlFor } from '@/shared/sanity/image';

type HomeSectionCtaPathname =
  | '/'
  | '/services'
  | '/case-studies'
  | '/blog'
  | '/clients'
  | '/partners'
  | '/about'
  | '/contact'
  | '/privacy'
  | '/cookies'
  | '/legal-notice';

const HOME_SECTION_CTA_PATHNAMES: ReadonlySet<HomeSectionCtaPathname> = new Set([
  '/',
  '/services',
  '/case-studies',
  '/blog',
  '/clients',
  '/partners',
  '/about',
  '/contact',
  '/privacy',
  '/cookies',
  '/legal-notice',
]);

type PortfolioItem = {
  key?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  image: string;
  alt: string;
  href?: string;
  openInNewTab?: boolean;
};

type PortfolioSectionProps = {
  locale: Locale;
  caseStudies?: CaseStudy[];
  content?: {
    eyebrow?: string;
    title?: string;
    cta?: string;
    ctaHref?: string;
    ctaOpenInNewTab?: boolean;
    items?: PortfolioItem[];
  };
};

function isHomeSectionCtaPathname(value: string | undefined): value is HomeSectionCtaPathname {
  return Boolean(value && HOME_SECTION_CTA_PATHNAMES.has(value as HomeSectionCtaPathname));
}

function isExternalHref(value: string | undefined) {
  return Boolean(value && /^(https?:|mailto:|tel:)/.test(value));
}

function resolveArticleKey(item: PortfolioItem, index: number) {
  return item.key || item.href || item.title || `portfolio-item-${index}`;
}

function mapCaseStudiesToPortfolioItems(caseStudies: CaseStudy[] | undefined): PortfolioItem[] {
  return (caseStudies ?? [])
    .filter((item) => Boolean(item.slug))
    .map((item) => ({
      key: item._id,
      title: item.title,
      subtitle: item.client?.name,
      tag:
        item.primaryService?.title ||
        (typeof item.year === 'number' ? String(item.year) : undefined),
      image: item.coverImage
        ? urlFor(item.coverImage).width(1600).height(1000).fit('crop').url()
        : '/icon-512.png',
      alt: item.coverImageAlt || item.title,
      href: item.slug,
    }));
}

export function PortfolioSection({ locale, caseStudies, content }: PortfolioSectionProps) {
  const t = useTranslations('PortfolioSection');
  const fallbackItems = t.raw('items') as PortfolioItem[];
  const caseStudyItems = mapCaseStudiesToPortfolioItems(caseStudies);
  const portfolioItems =
    caseStudyItems.length > 0 ? caseStudyItems : content?.items || fallbackItems;
  const ctaLabel = content?.cta || t('cta');
  const ctaHref = content?.ctaHref || '/case-studies';

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
            {isHomeSectionCtaPathname(ctaHref) ? (
              <Link href={ctaHref} locale={locale}>
                {ctaLabel}
              </Link>
            ) : (
              <a
                href={ctaHref || brandConfig.href.email}
                target={content?.ctaOpenInNewTab ? '_blank' : undefined}
                rel={content?.ctaOpenInNewTab ? 'noreferrer noopener' : undefined}
              >
                {ctaLabel}
              </a>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          {portfolioItems.map((item, index) => {
            const article = (
              <article className="group cursor-pointer" aria-label={item.title}>
                <div className="relative mb-10 aspect-16/10 overflow-hidden rounded-[56px] border border-white/10 shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover opacity-80 transition-all duration-2000 ease-out group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-3sm-navy/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                  <div
                    className={[
                      'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                      index % 2 === 0
                        ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_35%)]'
                        : 'bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_35%)]',
                    ].join(' ')}
                  />

                  {item.tag ? (
                    <div className="absolute right-10 top-10">
                      <span className="glass-panel-luxe rounded-full border border-white/20 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                        {item.tag}
                      </span>
                    </div>
                  ) : null}

                  <div className="absolute inset-0 flex items-end p-14">
                    <div>
                      <h3 className="mb-2 text-4xl font-bold text-white">{item.title}</h3>

                      {item.subtitle ? (
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/80">
                          {item.subtitle}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );

            if (caseStudyItems.length > 0 && item.href) {
              return (
                <Link
                  key={resolveArticleKey(item, index)}
                  href={{ pathname: '/case-studies/[slug]', params: { slug: item.href } }}
                  locale={locale}
                  className="block"
                >
                  {article}
                </Link>
              );
            }

            if (!item.href) {
              return <div key={resolveArticleKey(item, index)}>{article}</div>;
            }

            return (
              <a
                key={resolveArticleKey(item, index)}
                href={item.href}
                className="block"
                target={item.openInNewTab || isExternalHref(item.href) ? '_blank' : undefined}
                rel={
                  item.openInNewTab || isExternalHref(item.href) ? 'noreferrer noopener' : undefined
                }
              >
                {article}
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
