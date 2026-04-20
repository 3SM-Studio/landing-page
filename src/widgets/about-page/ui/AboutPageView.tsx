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
  const allowLegacyCopy = !staticPage;

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
        badge={
          staticPage?.hero.badge || staticPage?.eyebrow || (allowLegacyCopy ? t('hero.badge') : '')
        }
        title={staticPage?.hero.title || (allowLegacyCopy ? t('hero.title') : '')}
        description={
          staticPage?.hero.description ||
          staticPage?.heroSummary ||
          (allowLegacyCopy ? t('hero.description') : '')
        }
      />

      {(introSection || allowLegacyCopy) && (
        <AboutIntroSection
          eyebrow={
            introSection?.eyebrow
              ? toTuple(introSection.eyebrow.split(/\s*\/\s*|\s*•\s*|\s*\|\s*/).filter(Boolean))
              : ([t('intro.eyebrow.primary'), t('intro.eyebrow.secondary')] as const)
          }
          title={introSection?.title || (allowLegacyCopy ? t('intro.title') : '')}
          text={introSection?.summary || (allowLegacyCopy ? t('intro.text') : '')}
          capabilities={
            introSection?.highlights ||
            (allowLegacyCopy
              ? indexedMessagesToArray(t.raw('intro.capabilities') as Record<string, string>)
              : [])
          }
          noteLabel={introCard?.title || (allowLegacyCopy ? t('intro.noteLabel') : '')}
          noteText={introCard?.summary || (allowLegacyCopy ? t('intro.noteText') : '')}
        />
      )}

      {((principlesSection?.items?.length ?? 0) > 0 || allowLegacyCopy) && (
        <AboutPrinciplesSection
          items={
            principlesSection?.items?.map((item) => ({
              title: item.title,
              text: item.summary || '',
            })) ||
            indexedMessagesToArray(t.raw('principles.items') as Record<string, PrincipleItem>)
          }
        />
      )}

      {((perspectiveSection?.items?.length ?? 0) > 0 || allowLegacyCopy) && (
        <AboutPerspectiveSection
          title={perspectiveSection?.title || (allowLegacyCopy ? t('perspective.title') : '')}
          description={
            perspectiveSection?.summary || (allowLegacyCopy ? t('perspective.description') : '')
          }
          items={
            perspectiveSection?.items?.map((item) => ({
              name: item.title,
              role: item.subtitle || item.eyebrow || '',
              text: item.summary || '',
            })) ||
            indexedMessagesToArray(t.raw('perspective.items') as Record<string, PerspectiveItem>)
          }
        />
      )}

      {((milestonesSection?.items?.length ?? 0) > 0 || allowLegacyCopy) && (
        <AboutMilestonesSection
          title={milestonesSection?.title || (allowLegacyCopy ? t('milestones.title') : '')}
          description={
            milestonesSection?.summary || (allowLegacyCopy ? t('milestones.description') : '')
          }
          items={
            milestonesSection?.items?.map((item) => ({
              year: item.subtitle || item.eyebrow || '',
              title: item.title,
              text: item.summary || '',
            })) ||
            indexedMessagesToArray(t.raw('milestones.items') as Record<string, MilestoneItem>)
          }
        />
      )}

      {(teamSection || allowLegacyCopy) && (
        <AboutTeamSection
          locale={locale}
          title={teamSection?.title || (allowLegacyCopy ? t('team.title') : '')}
          description={teamSection?.summary || (allowLegacyCopy ? t('team.description') : '')}
          ctaLabel={teamSection?.items?.[0]?.title || (allowLegacyCopy ? t('team.cta') : '')}
          members={teamMembers}
        />
      )}

      {(ctaSection || allowLegacyCopy) && (
        <AboutCtaSection
          badge={ctaSection?.eyebrow || (allowLegacyCopy ? t('cta.badge') : '')}
          title={ctaSection?.title || (allowLegacyCopy ? t('cta.title') : '')}
          description={ctaSection?.summary || (allowLegacyCopy ? t('cta.description') : '')}
        />
      )}
    </MarketingPageShell>
  );
}
