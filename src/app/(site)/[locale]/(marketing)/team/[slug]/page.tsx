import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServiceSlugs } from '@/entities/service/api/service.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { ServiceJsonLd } from '@/shared/seo/jsonld/ServiceJsonLd';
import { ServiceDetailPageView } from '@/widgets/service-detail-page/ui/ServiceDetailPageView';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';

type ServiceDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const serviceDetailPathname: AppPathname = '/services/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await getServiceSlugs(locale);

      return items.map((item) => ({
        locale,
        slug: item.slug,
      }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'serviceDetailPage' });
  const service = await getServiceBySlug(locale, slug);

  if (!service) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: 'Services',
      notFoundTitle: t('notFound'),
      pathname: serviceDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: service.title,
    description: service.shortDescription ?? '',
    sectionTitle: 'Services',
    notFoundTitle: t('notFound'),
    pathname: serviceDetailPathname,
    params: { slug },
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'serviceDetailPage' });
  const service = await getServiceBySlug(locale, slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceJsonLd locale={locale} service={service} />

      <ServiceDetailPageView
        locale={locale}
        service={service}
        copy={{
          backToServices: t('backToServices'),
          deliverablesTitle: t('deliverablesTitle'),
          deliverablesEmpty: t('deliverablesEmpty'),
          introTitle: t('introTitle'),
          introEmpty: t('introEmpty'),
          relatedWorkTitle: t('relatedWorkTitle'),
          relatedWorkEmpty: t('relatedWorkEmpty'),
          relatedCaseStudiesTitle: t('relatedCaseStudiesTitle'),
          relatedCaseStudiesEmpty: t('relatedCaseStudiesEmpty'),
          viewProject: t('viewProject'),
          viewCaseStudy: t('viewCaseStudy'),
          notFound: t('notFound'),
        }}
      />
    </>
  );
}
