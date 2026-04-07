import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  getTeamMemberBySlug,
  getTeamMemberSlugs,
} from '@/entities/team-member/api/team-member.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';
import { TeamMemberDetailPageView } from '@/widgets/team-member-detail-page/ui/TeamMemberDetailPageView';

type TeamMemberDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const teamMemberDetailPathname: AppPathname = '/team/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await getTeamMemberSlugs(locale);

      return items.map((item) => ({
        locale,
        slug: item.slug,
      }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: TeamMemberDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'teamMemberDetailPage' });
  const member = await getTeamMemberBySlug(locale, slug);

  if (!member) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: locale === 'pl' ? 'Zespół' : 'Team',
      notFoundTitle: t('notFound'),
      pathname: teamMemberDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: member.seo?.title ?? member.name,
    description: member.seo?.description ?? member.shortBio ?? member.tagline,
    sectionTitle: locale === 'pl' ? 'Zespół' : 'Team',
    notFoundTitle: t('notFound'),
    pathname: teamMemberDetailPathname,
    params: { slug },
  });
}

export default async function TeamMemberDetailPage({ params }: TeamMemberDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'teamMemberDetailPage' });
  const member = await getTeamMemberBySlug(locale, slug);

  if (!member) {
    notFound();
  }

  return (
    <TeamMemberDetailPageView
      locale={locale}
      member={member}
      copy={{
        backToAbout: t('backToAbout'),
        introTitle: t('introTitle'),
        experienceTitle: t('experienceTitle'),
        specialtiesTitle: t('specialtiesTitle'),
        contactTitle: t('contactTitle'),
        featuredProjectsTitle: t('featuredProjectsTitle'),
        emptyExperience: t('emptyExperience'),
        emptyFeaturedProjects: t('emptyFeaturedProjects'),
        quoteTitle: t('quoteTitle'),
        emailLabel: t('emailLabel'),
        viewProject: t('viewProject'),
      }}
    />
  );
}
