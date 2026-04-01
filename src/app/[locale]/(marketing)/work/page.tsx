import { getTranslations } from 'next-intl/server';
import { getWorkProjects } from '@/features/work/api/work.repository';
import { buildWorkFilters, resolveActiveWorkCategory } from '@/features/work/lib/work.filters';
import { resolveLocale } from '@/features/work/lib/work.locale';
import { createWorkListPresentation } from '@/features/work/lib/work.selectors';
import { WorkPageView } from '@/features/work/ui/WorkPageView';

type WorkPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function WorkPage({ params, searchParams }: WorkPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'workPage' });
  const items = await getWorkProjects(locale);

  const filters = buildWorkFilters(locale, {
    allLabel: t('allFilter'),
  });

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeCategory = resolveActiveWorkCategory(resolvedSearchParams?.category, filters);

  const presentation = createWorkListPresentation(items, activeCategory);

  return (
    <WorkPageView
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
        viewProject: t('viewProject'),
        empty: t('empty'),
      }}
    />
  );
}
