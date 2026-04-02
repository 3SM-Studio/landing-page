import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getServices } from '@/entities/service/api/service.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { getLocalizedPathname, routes } from '@/shared/lib/routes';
import { ServicesPageView } from '@/widgets/services-page/ui/ServicesPageView';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const localizedServicesPath = getLocalizedPathname(routes.services, locale);

  return buildPageMetadata({
    locale,
    pathname: '/services',
    namespace: 'services',
    seoTitleKey: 'seo.title',
    seoDescriptionKey: 'seo.description',
    keywords: ['services', 'video', 'photography', 'web design', 'web development'],
    ogImage: `${localizedServicesPath}/opengraph-image`,
    twitterImage: `${localizedServicesPath}/twitter-image`,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'services' });
  const services = await getServices(locale);

  return (
    <ServicesPageView
      locale={locale}
      services={services}
      copy={{
        badge: t('hero.badge'),
        title: t('hero.title'),
        description: t('hero.description'),
        ctaBadge: t('cta.badge'),
        ctaTitle: t('cta.title'),
        ctaDescription: t('cta.description'),
      }}
      intro={{
        eyebrow: [t('intro.eyebrow.primary'), t('intro.eyebrow.secondary')],
        title: t('intro.title'),
        text: t('intro.text'),
        benefits: [
          t('intro.benefits.0'),
          t('intro.benefits.1'),
          t('intro.benefits.2'),
          t('intro.benefits.3'),
        ],
        noteLabel: t('intro.noteLabel'),
        noteText: t('intro.noteText'),
      }}
      process={{
        title: t('process.title'),
        description: t('process.description'),
        steps: [
          { title: t('process.steps.0.title'), text: t('process.steps.0.text') },
          { title: t('process.steps.1.title'), text: t('process.steps.1.text') },
          { title: t('process.steps.2.title'), text: t('process.steps.2.text') },
          { title: t('process.steps.3.title'), text: t('process.steps.3.text') },
        ],
      }}
    />
  );
}
