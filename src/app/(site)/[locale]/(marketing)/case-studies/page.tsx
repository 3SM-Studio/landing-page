import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getCaseStudies } from '@/entities/case-study/api/case-studies.repository';
import { buildCaseStudiesFilters } from '@/entities/case-study/model/case-studies.filters';
import { getServices } from '@/entities/service/api/service.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { CaseStudiesPageView } from '@/widgets/case-studies-list-page/ui/CaseStudiesPageView';

type CaseStudiesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: CaseStudiesPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/case-studies',
    namespace: 'caseStudiesPage',
    seoTitleKey: 'title',
    seoDescriptionKey: 'description',
    keywords: ['case studies', 'project breakdowns', 'results'],
  });
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'caseStudiesPage' });
  const [items, services] = await Promise.all([getCaseStudies(locale), getServices(locale)]);

  const filters = buildCaseStudiesFilters(services, {
    allLabel: t('allFilter'),
  });

  return (
    <CaseStudiesPageView
      locale={locale}
      filters={filters}
      items={items}
      copy={{
        badge: t('badge'),
        title: t('title'),
        description: t('description'),
        featuredLabel: t('featuredLabel'),
        featuredHint: t('featuredHint'),
        clientLabel: t('clientLabel'),
        viewCase: t('viewCase'),
        empty: t('empty'),
      }}
    />
  );
}
