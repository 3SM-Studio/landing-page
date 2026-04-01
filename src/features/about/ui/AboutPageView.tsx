import { getTranslations } from 'next-intl/server';
import { MarketingPageShell } from '@/features/marketing/ui/MarketingPageShell';
import { AboutCtaSection } from './AboutCtaSection';
import { AboutHeroSection } from './AboutHeroSection';
import { AboutIntroSection } from './AboutIntroSection';
import { AboutMilestonesSection } from './AboutMilestonesSection';
import { AboutPerspectiveSection } from './AboutPerspectiveSection';
import { AboutPrinciplesSection } from './AboutPrinciplesSection';

export async function AboutPageView() {
  const t = await getTranslations('about');

  return (
    <MarketingPageShell>
      <AboutHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <AboutIntroSection
        eyebrow={[t('intro.eyebrow.primary'), t('intro.eyebrow.secondary')]}
        title={t('intro.title')}
        text={t('intro.text')}
        capabilities={[
          t('intro.capabilities.0'),
          t('intro.capabilities.1'),
          t('intro.capabilities.2'),
          t('intro.capabilities.3'),
          t('intro.capabilities.4'),
          t('intro.capabilities.5'),
          t('intro.capabilities.6'),
          t('intro.capabilities.7'),
        ]}
        noteLabel={t('intro.noteLabel')}
        noteText={t('intro.noteText')}
      />

      <AboutPrinciplesSection
        items={[
          {
            title: t('principles.items.0.title'),
            text: t('principles.items.0.text'),
          },
          {
            title: t('principles.items.1.title'),
            text: t('principles.items.1.text'),
          },
          {
            title: t('principles.items.2.title'),
            text: t('principles.items.2.text'),
          },
          {
            title: t('principles.items.3.title'),
            text: t('principles.items.3.text'),
          },
        ]}
      />

      <AboutPerspectiveSection
        title={t('perspective.title')}
        description={t('perspective.description')}
        items={[
          {
            name: t('perspective.items.0.name'),
            role: t('perspective.items.0.role'),
            text: t('perspective.items.0.text'),
          },
          {
            name: t('perspective.items.1.name'),
            role: t('perspective.items.1.role'),
            text: t('perspective.items.1.text'),
          },
          {
            name: t('perspective.items.2.name'),
            role: t('perspective.items.2.role'),
            text: t('perspective.items.2.text'),
          },
        ]}
      />

      <AboutMilestonesSection
        title={t('milestones.title')}
        description={t('milestones.description')}
        items={[
          {
            year: t('milestones.items.0.year'),
            title: t('milestones.items.0.title'),
            text: t('milestones.items.0.text'),
          },
          {
            year: t('milestones.items.1.year'),
            title: t('milestones.items.1.title'),
            text: t('milestones.items.1.text'),
          },
          {
            year: t('milestones.items.2.year'),
            title: t('milestones.items.2.title'),
            text: t('milestones.items.2.text'),
          },
          {
            year: t('milestones.items.3.year'),
            title: t('milestones.items.3.title'),
            text: t('milestones.items.3.text'),
          },
        ]}
      />

      <AboutCtaSection
        badge={t('cta.badge')}
        title={t('cta.title')}
        description={t('cta.description')}
      />
    </MarketingPageShell>
  );
}
