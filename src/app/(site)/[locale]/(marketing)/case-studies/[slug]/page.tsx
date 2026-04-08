import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from '@/entities/case-study/api/case-studies.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { CaseStudyDetailPageView } from '@/widgets/case-study-detail-page/ui/CaseStudyDetailPageView';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';

type CaseStudyDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const caseStudyDetailPathname: AppPathname = '/case-studies/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await getCaseStudySlugs(locale);

      return items.map((item) => ({
        locale,
        slug: item.slug,
      }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'caseStudyDetailPage' });
  const caseStudy = await getCaseStudyBySlug(locale, slug);

  if (!caseStudy) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: 'Case Studies',
      notFoundTitle: t('notFound'),
      pathname: caseStudyDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: caseStudy.title,
    description: caseStudy.excerpt ?? '',
    sectionTitle: 'Case Studies',
    notFoundTitle: t('notFound'),
    pathname: caseStudyDetailPathname,
    params: { slug },
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'caseStudyDetailPage' });
  const caseStudy = await getCaseStudyBySlug(locale, slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <CaseStudyDetailPageView
      locale={locale}
      caseStudy={caseStudy}
      copy={{
        backToCaseStudies: t('backToCaseStudies'),
        problemTitle: t('problemTitle'),
        problemEmpty: t('problemEmpty'),
        solutionTitle: t('solutionTitle'),
        solutionEmpty: t('solutionEmpty'),
        resultTitle: t('resultTitle'),
        resultEmpty: t('resultEmpty'),
        galleryTitle: t('galleryTitle'),
        galleryEmpty: t('galleryEmpty'),
        clientTitle: t('clientTitle'),
        partnersTitle: t('partnersTitle'),
        websiteLabel: t('websiteLabel'),
        viewClient: t('viewClient'),
        viewPartner: t('viewPartner'),
        notFound: t('notFound'),
      }}
    />
  );
}
