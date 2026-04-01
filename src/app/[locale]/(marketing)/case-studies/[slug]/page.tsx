import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from '@/features/case-studies/api/case-studies.repository';
import { resolveLocale } from '@/features/case-studies/lib/case-studies.locale';
import { CaseStudyDetailPageView } from '@/features/case-studies/ui/CaseStudyDetailPageView';
import { routing } from '@/shared/i18n/routing';

type CaseStudyDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

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
    return {
      title: t('notFound'),
    };
  }

  return {
    title: `${caseStudy.title} | Case Studies | 3SM`,
    description: caseStudy.excerpt ?? '',
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt ?? '',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.excerpt ?? '',
    },
  };
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
        notFound: t('notFound'),
      }}
    />
  );
}
