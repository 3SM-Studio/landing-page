import type { Locale } from '@/shared/i18n/routing';
import { MarketingPageShell } from '@/shared/ui/MarketingPageShell';
import { PageBreadcrumbs } from '@/shared/ui/PageBreadcrumbs';
import type { Service } from '@/entities/service/model/service.types';
import type { StaticPage } from '@/entities/static-page/model/static-page.types';
import { getStaticPageSection } from '@/entities/static-page/lib/static-page.selectors';
import { ServicesCtaSection } from './ServicesCtaSection';
import { ServicesGridSection } from './ServicesGridSection';
import { ServicesHeroSection } from './ServicesHeroSection';
import { ServicesIntroSection } from './ServicesIntroSection';
import { ServicesProcessSection } from './ServicesProcessSection';

type ProcessStep = {
  title: string;
  text: string;
};

type ServicesPageViewProps = {
  locale: Locale;
  services: Service[];
  copy: {
    badge: string;
    title: string;
    description: string;
    ctaBadge: string;
    ctaTitle: string;
    ctaDescription: string;
  };
  intro: {
    eyebrow: readonly [string, string];
    title: string;
    text: string;
    benefits: string[];
    noteLabel: string;
    noteText: string;
  };
  process: {
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  staticPage?: StaticPage | null;
};

function toTuple(values: string[]): readonly [string, string] {
  return [values[0] || '', values[1] || ''] as const;
}

export async function ServicesPageView({
  locale,
  services,
  copy,
  intro,
  process,
  staticPage,
}: ServicesPageViewProps) {
  const servicesGridSection = getStaticPageSection(staticPage, 'services-grid');
  const processSection = getStaticPageSection(staticPage, 'process');
  const ctaSection = getStaticPageSection(staticPage, 'cta');
  const introCard = servicesGridSection?.items?.[0];

  return (
    <MarketingPageShell>
      <PageBreadcrumbs
        locale={locale}
        items={[{ label: locale === 'pl' ? 'usługi' : 'services' }]}
      />

      <ServicesHeroSection
        badge={staticPage?.hero.badge || staticPage?.eyebrow || copy.badge}
        title={staticPage?.hero.title || copy.title}
        description={staticPage?.hero.description || staticPage?.heroSummary || copy.description}
      />

      <ServicesIntroSection
        eyebrow={
          servicesGridSection?.eyebrow
            ? toTuple(
                servicesGridSection.eyebrow.split(/\s*\/\s*|\s*•\s*|\s*\|\s*/).filter(Boolean),
              )
            : intro.eyebrow
        }
        title={servicesGridSection?.title || intro.title}
        text={servicesGridSection?.summary || intro.text}
        benefits={servicesGridSection?.highlights || intro.benefits}
        noteLabel={introCard?.title || intro.noteLabel}
        noteText={introCard?.summary || intro.noteText}
      />

      <ServicesGridSection items={services} />

      <ServicesProcessSection
        title={processSection?.title || process.title}
        description={processSection?.summary || process.description}
        steps={
          processSection?.items?.map((item) => ({
            title: item.title,
            text: item.summary || '',
          })) || process.steps
        }
      />

      <ServicesCtaSection
        badge={ctaSection?.eyebrow || copy.ctaBadge}
        title={ctaSection?.title || copy.ctaTitle}
        description={ctaSection?.summary || copy.ctaDescription}
      />
    </MarketingPageShell>
  );
}
