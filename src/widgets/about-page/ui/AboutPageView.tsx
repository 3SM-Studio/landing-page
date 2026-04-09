import { getTranslations } from 'next-intl/server';
import type { TeamMember } from '@/entities/team-member/model/team-member.types';
import type { Locale } from '@/shared/i18n/routing';
import { indexedMessagesToArray } from '@/shared/i18n/message-utils';
import { MarketingPageShell } from '@/shared/ui/MarketingPageShell';
import { PageBreadcrumbs } from '@/shared/ui/PageBreadcrumbs';
import { AboutCtaSection } from './AboutCtaSection';
import { AboutHeroSection } from './AboutHeroSection';
import { AboutIntroSection } from './AboutIntroSection';
import { AboutMilestonesSection } from './AboutMilestonesSection';
import { AboutPerspectiveSection } from './AboutPerspectiveSection';
import { AboutPrinciplesSection } from './AboutPrinciplesSection';
import { AboutTeamSection } from './AboutTeamSection';

type PrincipleItem = {
  title: string;
  text: string;
};

type PerspectiveItem = {
  name: string;
  role: string;
  text: string;
};

type MilestoneItem = {
  year: string;
  title: string;
  text: string;
};

type AboutPageViewProps = {
  locale: Locale;
  teamMembers: TeamMember[];
};

export async function AboutPageView({ locale, teamMembers }: AboutPageViewProps) {
  const t = await getTranslations('about');

  return (
    <MarketingPageShell>
      <PageBreadcrumbs locale={locale} items={[{ label: locale === 'pl' ? 'o nas' : 'about' }]} />

      <AboutHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <AboutIntroSection
        eyebrow={[t('intro.eyebrow.primary'), t('intro.eyebrow.secondary')]}
        title={t('intro.title')}
        text={t('intro.text')}
        capabilities={indexedMessagesToArray(t.raw('intro.capabilities') as Record<string, string>)}
        noteLabel={t('intro.noteLabel')}
        noteText={t('intro.noteText')}
      />

      <AboutPrinciplesSection
        items={indexedMessagesToArray(t.raw('principles.items') as Record<string, PrincipleItem>)}
      />

      <AboutPerspectiveSection
        title={t('perspective.title')}
        description={t('perspective.description')}
        items={indexedMessagesToArray(
          t.raw('perspective.items') as Record<string, PerspectiveItem>,
        )}
      />

      <AboutMilestonesSection
        title={t('milestones.title')}
        description={t('milestones.description')}
        items={indexedMessagesToArray(t.raw('milestones.items') as Record<string, MilestoneItem>)}
      />
      <AboutTeamSection
        locale={locale}
        title={t('team.title')}
        description={t('team.description')}
        ctaLabel={t('team.cta')}
        members={teamMembers}
      />

      <AboutCtaSection
        badge={t('cta.badge')}
        title={t('cta.title')}
        description={t('cta.description')}
      />
    </MarketingPageShell>
  );
}
