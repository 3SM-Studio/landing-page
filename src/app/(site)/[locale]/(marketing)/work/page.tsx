import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getServices } from '@/entities/service/api/service.repository';
import { getWorkProjects } from '@/entities/work-project/api/work.repository';
import { buildWorkFilters } from '@/entities/work-project/model/work.filters';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { WorkPageView } from '@/widgets/work-list-page/ui/WorkPageView';

type WorkPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/work',
    namespace: 'workPage',
    titleKey: 'title',
    descriptionKey: 'description',
    keywords: ['portfolio', 'case work', 'selected projects'],
  });
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'workPage' });
  const [items, services] = await Promise.all([getWorkProjects(locale), getServices(locale)]);

  const filters = buildWorkFilters(services, {
    allLabel: t('allFilter'),
  });

  return (
    <WorkPageView
      filters={filters}
      items={items}
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
