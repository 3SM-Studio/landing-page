import type { Metadata } from 'next';
import { getTeamMembers } from '@/entities/team-member/api/team-member.repository';
import { getStaticPage } from '@/entities/static-page/api/static-page.repository';
import { AboutPageView } from '@/widgets/about-page/ui/AboutPageView';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const staticPage = await getStaticPage('about', locale);

  if (!staticPage) {
    return buildPageMetadata({
      locale,
      pathname: '/about',
      namespace: 'about',
      seoTitleKey: 'hero.title',
      seoDescriptionKey: 'hero.description',
      keywords: ['about 3SM', 'creative direction', 'studio'],
    });
  }

  return buildMetadata({
    locale,
    canonical: '/about',
    title: staticPage.seo?.title || staticPage.hero.title,
    description: staticPage.seo?.description || staticPage.hero.description,
    keywords: staticPage.seo?.keywords || ['about 3SM', 'creative direction', 'studio'],
    noIndex: staticPage.seo?.noIndex,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const [teamMembers, staticPage] = await Promise.all([
    getTeamMembers(locale),
    getStaticPage('about', locale),
  ]);

  return <AboutPageView locale={locale} teamMembers={teamMembers} staticPage={staticPage} />;
}
