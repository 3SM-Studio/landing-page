import { getTranslations } from 'next-intl/server';
import type { TeamMember } from '@/entities/team-member/model/team-member.types';
import type { StaticPage } from '@/entities/static-page/model/static-page.types';
import { getStaticPageSection } from '@/entities/static-page/lib/static-page.selectors';
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
  staticPage?: StaticPage | null;
};

function toTuple(values: string[]): readonly [string, string] {
  return [values[0] || '', values[1] || ''] as const;
}

export async function AboutPageView({ locale, teamMembers, staticPage }: AboutPageViewProps) {
  const t = await getTranslations('about');

  const introSection = getStaticPageSection(staticPage, 'who-we-are');
  const principlesSection = getStaticPageSection(staticPage, 'principles');
  const perspectiveSection = getStaticPageSection(staticPage, 'perspective');
  const milestonesSection = getStaticPageSection(staticPage, 'milestones');
  const teamSection = getStaticPageSection(staticPage, 'team');
  const ctaSection = getStaticPageSection(staticPage, 'cta');

  const introCard = introSection?.items?.[0];

  return (
    <MarketingPageShell>
      <PageBreadcrumbs locale={locale} items={[{ label: locale === 'pl' ? 'o nas' : 'about' }]} />

      <AboutHeroSection
        badge={staticPage?.hero.badge || staticPage?.eyebrow || t('hero.badge')}
        title={staticPage?.hero.title || t('hero.title')}
        description={
          staticPage?.hero.description || staticPage?.heroSummary || t('hero.description')
        }
      />

      <AboutIntroSection
        eyebrow={
          introSection?.eyebrow
            ? toTuple(introSection.eyebrow.split(/\s*\/\s*|\s*•\s*|\s*\|\s*/).filter(Boolean))
            : ([t('intro.eyebrow.primary'), t('intro.eyebrow.secondary')] as const)
        }
        title={introSection?.title || t('intro.title')}
        text={introSection?.summary || t('intro.text')}
        capabilities={
          introSection?.highlights ||
          indexedMessagesToArray(t.raw('intro.capabilities') as Record<string, string>)
        }
        noteLabel={introCard?.title || t('intro.noteLabel')}
        noteText={introCard?.summary || t('intro.noteText')}
      />

      <AboutPrinciplesSection
        items={
          principlesSection?.items?.map((item) => ({
            title: item.title,
            text: item.summary || '',
          })) || indexedMessagesToArray(t.raw('principles.items') as Record<string, PrincipleItem>)
        }
      />

      <AboutPerspectiveSection
        title={perspectiveSection?.title || t('perspective.title')}
        description={perspectiveSection?.summary || t('perspective.description')}
        items={
          perspectiveSection?.items?.map((item) => ({
            name: item.title,
            role: item.subtitle || item.eyebrow || '',
            text: item.summary || '',
          })) ||
          indexedMessagesToArray(t.raw('perspective.items') as Record<string, PerspectiveItem>)
        }
      />

      <AboutMilestonesSection
        title={milestonesSection?.title || t('milestones.title')}
        description={milestonesSection?.summary || t('milestones.description')}
        items={
          milestonesSection?.items?.map((item) => ({
            year: item.subtitle || item.eyebrow || '',
            title: item.title,
            text: item.summary || '',
          })) || indexedMessagesToArray(t.raw('milestones.items') as Record<string, MilestoneItem>)
        }
      />
      <AboutTeamSection
        locale={locale}
        title={teamSection?.title || t('team.title')}
        description={teamSection?.summary || t('team.description')}
        ctaLabel={teamSection?.items?.[0]?.title || t('team.cta')}
        members={teamMembers}
      />

      <AboutCtaSection
        badge={ctaSection?.eyebrow || t('cta.badge')}
        title={ctaSection?.title || t('cta.title')}
        description={ctaSection?.summary || t('cta.description')}
      />
    </MarketingPageShell>
  );
}
