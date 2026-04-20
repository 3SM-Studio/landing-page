import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ContactSection } from '@/widgets/home-contact-cta/ui/ContactCtaSection';
import { getTrustedClients } from '@/entities/client/api/client.repository';
import { getCaseStudies } from '@/entities/case-study/api/case-studies.repository';
import { getStaticPage } from '@/entities/static-page/api/static-page.repository';
import { getStaticPageSection } from '@/entities/static-page/lib/static-page.selectors';
import { HeroSection } from '@/widgets/home-hero/ui/HeroSection';
import { PortfolioSection } from '@/widgets/home-portfolio/ui/PortfolioSection';
import { ProcessSection } from '@/widgets/home-process/ui/ProcessSection';
import { ServicesSection } from '@/widgets/home-services/ui/ServicesSection';
import { TrustedBySection } from '@/widgets/home-trusted-by/ui/TrustedBySection';
import { StudioSection } from '@/widgets/home-studio/ui/StudioSection';
import { type Locale, routing } from '@/shared/i18n/routing';
import { buildMetadata } from '@/shared/seo/buildMetadata';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ locale: string }>;
};

function splitHeadline(value: string | undefined) {
  if (!value) {
    return {
      line1: undefined,
      line2: undefined,
    };
  }

  const normalized = value.replace(/\s+/g, ' ').trim();
  const punctuationSplit = normalized
    .split(/[,|:]/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (punctuationSplit.length >= 2) {
    return {
      line1: punctuationSplit[0],
      line2: punctuationSplit.slice(1).join(', '),
    };
  }

  const words = normalized.split(' ');
  const middle = Math.ceil(words.length / 2);

  return {
    line1: words.slice(0, middle).join(' '),
    line2: words.slice(middle).join(' '),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale as Locale;
  const staticPage = await getStaticPage('home', resolvedLocale);

  return buildMetadata({
    locale: resolvedLocale,
    canonical: '/',
    title: staticPage?.seo?.title || staticPage?.hero.title,
    description: staticPage?.seo?.description || staticPage?.hero.description,
    keywords: staticPage?.seo?.keywords,
    noIndex: staticPage?.seo?.noIndex,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const resolvedLocale = locale as Locale;
  const [trustedClients, caseStudies, staticPage] = await Promise.all([
    getTrustedClients(resolvedLocale),
    getCaseStudies(resolvedLocale),
    getStaticPage('home', resolvedLocale),
  ]);

  const heroHeadline = splitHeadline(staticPage?.hero.title);
  const servicesSection = getStaticPageSection(staticPage, 'services-overview');
  const studioSection = getStaticPageSection(staticPage, 'studio-story');
  const trustedBySection = getStaticPageSection(staticPage, 'trusted-by');
  const portfolioSection = getStaticPageSection(staticPage, 'portfolio');
  const processSection = getStaticPageSection(staticPage, 'process');
  const contactSection = getStaticPageSection(staticPage, 'contact-cta');

  return (
    <>
      <HeroSection
        locale={resolvedLocale}
        content={
          staticPage
            ? {
                badge: staticPage.hero.badge || staticPage.eyebrow,
                titleLine1: heroHeadline.line1,
                titleLine2: heroHeadline.line2,
                descriptionBefore: staticPage.hero.description,
                descriptionAccent: staticPage.heroSummary,
                descriptionAfter: '',
                primaryCta: staticPage.hero.primaryCta?.label || servicesSection?.items?.[0]?.title,
                primaryHref: staticPage.hero.primaryCta?.href,
                primaryOpenInNewTab: staticPage.hero.primaryCta?.openInNewTab,
                secondaryCta:
                  staticPage.hero.secondaryCta?.label || servicesSection?.items?.[1]?.title,
                secondaryHref: staticPage.hero.secondaryCta?.href,
                secondaryOpenInNewTab: staticPage.hero.secondaryCta?.openInNewTab,
              }
            : undefined
        }
      />
      <ServicesSection
        locale={resolvedLocale}
        content={
          servicesSection
            ? {
                eyebrow: servicesSection.eyebrow,
                title: servicesSection.title,
                services: servicesSection.items?.map((item, index) => ({
                  eyebrow: item.eyebrow || item.subtitle || '',
                  title: item.title,
                  description: item.summary || '',
                  size: index === 0 || index === 3 ? 'large' : 'small',
                  accent: (['cyan', 'teal', 'indigo', 'white'][index % 4] || 'cyan') as
                    | 'cyan'
                    | 'teal'
                    | 'indigo'
                    | 'white',
                  items: item.listItems,
                  cta: item.title,
                  href: item.href,
                })),
              }
            : undefined
        }
      />
      <StudioSection
        content={
          studioSection
            ? {
                titleLine1: splitHeadline(studioSection.title).line1,
                titleLine2: splitHeadline(studioSection.title).line2,
                description: studioSection.summary,
                quote: studioSection.body ? undefined : studioSection.items?.[0]?.summary,
                stats: studioSection.items?.map((item, index) => ({
                  value: item.title,
                  label: item.subtitle || item.eyebrow || '',
                  accent: (['cyan', 'cyan-strong', 'teal', 'white'][index % 4] || 'cyan') as
                    | 'cyan'
                    | 'cyan-strong'
                    | 'teal'
                    | 'white',
                })),
              }
            : undefined
        }
      />
      <TrustedBySection
        locale={resolvedLocale}
        clients={trustedClients}
        copy={
          trustedBySection
            ? {
                eyebrow: trustedBySection.eyebrow,
                title: trustedBySection.title,
                description: trustedBySection.summary,
                cta: trustedBySection.items?.[0]?.title,
                ctaHref: trustedBySection.items?.[0]?.href,
              }
            : undefined
        }
      />
      <PortfolioSection
        locale={resolvedLocale}
        caseStudies={caseStudies}
        content={
          portfolioSection
            ? {
                eyebrow: portfolioSection.eyebrow,
                title: portfolioSection.title,
                cta: portfolioSection.items?.[0]?.title,
                ctaHref: portfolioSection.items?.[0]?.href,
              }
            : undefined
        }
      />
      <ProcessSection
        content={
          processSection
            ? {
                eyebrow: processSection.eyebrow,
                title: processSection.title,
                description: processSection.summary,
                steps: processSection.items?.map((item, index) => ({
                  number: item.eyebrow || item.subtitle || String(index + 1).padStart(2, '0'),
                  title: item.title,
                  description: item.summary || '',
                  featured: item.isHighlighted,
                })),
              }
            : undefined
        }
      />
      <ContactSection
        locale={resolvedLocale}
        content={
          contactSection
            ? {
                titleLine1: splitHeadline(contactSection.title).line1,
                titleLine2: splitHeadline(contactSection.title).line2,
                description: contactSection.summary,
                primaryCta: contactSection.items?.[0]?.title,
                primaryHref: contactSection.items?.[0]?.href,
                primaryOpenInNewTab: false,
                secondaryCta: contactSection.items?.[1]?.title,
                secondaryHref: contactSection.items?.[1]?.href,
                secondaryOpenInNewTab: false,
              }
            : undefined
        }
      />
    </>
  );
}
