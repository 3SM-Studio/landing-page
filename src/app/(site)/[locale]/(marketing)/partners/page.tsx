import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPartners } from '@/entities/partner/api/partner.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { PartnersPageView } from '@/widgets/partners-page/ui/PartnersPageView';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/partners',
    namespace: 'partners',
    seoTitleKey: 'hero.title',
    seoDescriptionKey: 'hero.description',
    keywords: ['partners', 'creative partners', 'technology partners'],
  });
}

export default async function PartnersPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'partners' });
  const partners = await getPartners(locale);

  return (
    <PartnersPageView
      locale={locale}
      partners={partners}
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
