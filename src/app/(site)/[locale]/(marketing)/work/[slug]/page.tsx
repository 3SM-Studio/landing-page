import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  getWorkProjectBySlug,
  getWorkProjectSlugs,
} from '@/entities/work-project/api/work.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { WorkDetailPageView } from '@/widgets/work-detail-page/ui/WorkDetailPageView';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';

type WorkDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const workDetailPathname: AppPathname = '/work/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await getWorkProjectSlugs(locale);

      return items.map((item) => ({
        locale,
        slug: item.slug,
      }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'workDetailPage' });
  const work = await getWorkProjectBySlug(locale, slug);

  if (!work) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: 'Work',
      notFoundTitle: t('notFound'),
      pathname: workDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: work.title,
    description: work.description ?? '',
    sectionTitle: 'Work',
    notFoundTitle: t('notFound'),
    pathname: workDetailPathname,
    params: { slug },
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'workDetailPage' });
  const work = await getWorkProjectBySlug(locale, slug);

  if (!work) {
    notFound();
  }

  return (
    <WorkDetailPageView
      locale={locale}
      work={work}
      copy={{
        backToWork: t('backToWork'),
        challengeTitle: t('challengeTitle'),
        challengeEmpty: t('challengeEmpty'),
        solutionTitle: t('solutionTitle'),
        solutionEmpty: t('solutionEmpty'),
        outcomeTitle: t('outcomeTitle'),
        outcomeEmpty: t('outcomeEmpty'),
        galleryTitle: t('galleryTitle'),
        galleryEmpty: t('galleryEmpty'),
        notFound: t('notFound'),
      }}
    />
  );
}
