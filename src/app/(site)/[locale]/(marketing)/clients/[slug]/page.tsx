import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getClientBySlug, getClientSlugs } from '@/entities/client/api/client.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';
import { ClientDetailPageView } from '@/widgets/client-detail-page/ui/ClientDetailPageView';

type ClientDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const clientDetailPathname: AppPathname = '/clients/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await getClientSlugs(locale);
      return items.map((item) => ({ locale, slug: item.slug }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: ClientDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'clients.detail' });
  const client = await getClientBySlug(locale, slug);

  if (!client) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: 'Clients',
      notFoundTitle: t('notFound'),
      pathname: clientDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: client.seo?.title ?? client.name,
    description: client.seo?.description ?? client.shortDescription ?? '',
    sectionTitle: 'Clients',
    notFoundTitle: t('notFound'),
    pathname: clientDetailPathname,
    params: { slug },
  });
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'clients.detail' });
  const client = await getClientBySlug(locale, slug);

  if (!client) {
    notFound();
  }

  return (
    <ClientDetailPageView
      locale={locale}
      client={client}
      copy={{
        backToClients: t('backToClients'),
        industryLabel: t('industryLabel'),
        websiteLabel: t('websiteLabel'),
        socialLinksTitle: t('socialLinksTitle'),
        relatedCaseStudiesTitle: t('relatedCaseStudiesTitle'),
        relatedCaseStudiesEmpty: t('relatedCaseStudiesEmpty'),
        viewCase: t('viewCase'),
        clientLabel: t('clientLabel'),
      }}
    />
  );
}
