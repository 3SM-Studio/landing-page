import { getTranslations } from 'next-intl/server';
import { getCaseStudies } from '@/features/case-studies/api/case-studies.repository';
import {
  buildCaseStudiesFilters,
  resolveActiveCaseStudiesCategory,
} from '@/features/case-studies/lib/case-studies.filters';
import { resolveLocale } from '@/features/case-studies/lib/case-studies.locale';
import { createCaseStudiesListPresentation } from '@/features/case-studies/lib/case-studies.selectors';
import { CaseStudiesPageView } from '@/features/case-studies/ui/CaseStudiesPageView';

type CaseStudiesPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function CaseStudiesPage({ params, searchParams }: CaseStudiesPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'caseStudiesPage' });
  const items = await getCaseStudies(locale);

  const filters = buildCaseStudiesFilters(locale, {
    allLabel: t('allFilter'),
  });

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeCategory = resolveActiveCaseStudiesCategory(resolvedSearchParams?.category, filters);

  const presentation = createCaseStudiesListPresentation(items, activeCategory);

  return (
    <CaseStudiesPageView
      locale={locale}
      filters={filters}
      activeCategory={activeCategory}
      presentation={presentation}
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
