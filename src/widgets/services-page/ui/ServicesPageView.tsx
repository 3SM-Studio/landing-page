import type { Locale } from '@/shared/i18n/routing';
import { MarketingPageShell } from '@/shared/ui/MarketingPageShell';
import type { Service } from '@/entities/service/model/service.types';
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
};

export async function ServicesPageView({ services, copy, intro, process }: ServicesPageViewProps) {
  return (
    <MarketingPageShell>
      <ServicesHeroSection badge={copy.badge} title={copy.title} description={copy.description} />

      <ServicesIntroSection
        eyebrow={intro.eyebrow}
        title={intro.title}
        text={intro.text}
        benefits={intro.benefits}
        noteLabel={intro.noteLabel}
        noteText={intro.noteText}
      />

      <ServicesGridSection items={services} />

      <ServicesProcessSection
        title={process.title}
        description={process.description}
        steps={process.steps}
      />

      <ServicesCtaSection
        badge={copy.ctaBadge}
        title={copy.ctaTitle}
        description={copy.ctaDescription}
      />
    </MarketingPageShell>
  );
}
