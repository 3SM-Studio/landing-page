import { getTranslations } from 'next-intl/server';
import { MarketingPageShell } from '@/features/marketing/ui/MarketingPageShell';
import { ServicesCtaSection } from './ServicesCtaSection';
import { ServicesGridSection } from './ServicesGridSection';
import { ServicesHeroSection } from './ServicesHeroSection';
import { ServicesIntroSection } from './ServicesIntroSection';
import { ServicesProcessSection } from './ServicesProcessSection';

export async function ServicesPageView() {
  const t = await getTranslations('services');

  return (
    <MarketingPageShell>
      <ServicesHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <ServicesIntroSection
        eyebrow={[t('intro.eyebrow.primary'), t('intro.eyebrow.secondary')]}
        title={t('intro.title')}
        text={t('intro.text')}
        benefits={[
          t('intro.benefits.0'),
          t('intro.benefits.1'),
          t('intro.benefits.2'),
          t('intro.benefits.3'),
        ]}
        noteLabel={t('intro.noteLabel')}
        noteText={t('intro.noteText')}
      />

      <ServicesGridSection
        items={[
          {
            name: t('items.0.name'),
            description: t('items.0.description'),
            deliverables: [
              t('items.0.deliverables.0'),
              t('items.0.deliverables.1'),
              t('items.0.deliverables.2'),
              t('items.0.deliverables.3'),
            ],
          },
          {
            name: t('items.1.name'),
            description: t('items.1.description'),
            deliverables: [
              t('items.1.deliverables.0'),
              t('items.1.deliverables.1'),
              t('items.1.deliverables.2'),
              t('items.1.deliverables.3'),
            ],
          },
          {
            name: t('items.2.name'),
            description: t('items.2.description'),
            deliverables: [
              t('items.2.deliverables.0'),
              t('items.2.deliverables.1'),
              t('items.2.deliverables.2'),
              t('items.2.deliverables.3'),
            ],
          },
          {
            name: t('items.3.name'),
            description: t('items.3.description'),
            deliverables: [
              t('items.3.deliverables.0'),
              t('items.3.deliverables.1'),
              t('items.3.deliverables.2'),
              t('items.3.deliverables.3'),
            ],
          },
          {
            name: t('items.4.name'),
            description: t('items.4.description'),
            deliverables: [
              t('items.4.deliverables.0'),
              t('items.4.deliverables.1'),
              t('items.4.deliverables.2'),
              t('items.4.deliverables.3'),
            ],
          },
          {
            name: t('items.5.name'),
            description: t('items.5.description'),
            deliverables: [
              t('items.5.deliverables.0'),
              t('items.5.deliverables.1'),
              t('items.5.deliverables.2'),
              t('items.5.deliverables.3'),
            ],
          },
        ]}
      />

      <ServicesProcessSection
        title={t('process.title')}
        description={t('process.description')}
        steps={[
          {
            title: t('process.steps.0.title'),
            text: t('process.steps.0.text'),
          },
          {
            title: t('process.steps.1.title'),
            text: t('process.steps.1.text'),
          },
          {
            title: t('process.steps.2.title'),
            text: t('process.steps.2.text'),
          },
          {
            title: t('process.steps.3.title'),
            text: t('process.steps.3.text'),
          },
        ]}
      />

      <ServicesCtaSection
        badge={t('cta.badge')}
        title={t('cta.title')}
        description={t('cta.description')}
      />
    </MarketingPageShell>
  );
}
