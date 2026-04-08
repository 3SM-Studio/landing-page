import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getClients } from '@/entities/client/api/client.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { ClientsPageView } from '@/widgets/clients-page/ui/ClientsPageView';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/clients',
    namespace: 'clients',
    seoTitleKey: 'hero.title',
    seoDescriptionKey: 'hero.description',
    keywords: ['clients', 'brands', 'trusted by', 'portfolio clients'],
  });
}

export default async function ClientsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'clients' });
  const clients = await getClients(locale);

  return (
    <ClientsPageView
      locale={locale}
      clients={clients}
      copy={{
        badge: t('hero.badge'),
        title: t('hero.title'),
        description: t('hero.description'),
        ctaLabel: t('card.cta'),
        empty: t('empty'),
      }}
    />
  );
}
