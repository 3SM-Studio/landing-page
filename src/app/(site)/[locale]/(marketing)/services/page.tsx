import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getServices } from '@/entities/service/api/service.repository';
import { getStaticPage } from '@/entities/static-page/api/static-page.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';
import { getLocalizedPathname, routes } from '@/shared/lib/routes';
import { ServicesJsonLd } from '@/shared/seo/jsonld/ServicesJsonLd';
import { ServicesPageView } from '@/widgets/services-page/ui/ServicesPageView';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const staticPage = await getStaticPage('services', locale);

  const localizedServicesPath = getLocalizedPathname(routes.services, locale);

  if (!staticPage) {
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

  return buildMetadata({
    locale,
    canonical: '/services',
    title: staticPage.seo?.title || staticPage.hero.title,
    description: staticPage.seo?.description || staticPage.hero.description,
    keywords: staticPage.seo?.keywords || [
      'services',
      'video',
      'photography',
      'web design',
      'web development',
    ],
    noIndex: staticPage.seo?.noIndex,
    ogImage: `${localizedServicesPath}/opengraph-image`,
    twitterImage: `${localizedServicesPath}/twitter-image`,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'services' });
  const [services, staticPage] = await Promise.all([
    getServices(locale),
    getStaticPage('services', locale),
  ]);

  return (
    <>
      <ServicesJsonLd locale={locale} services={services} />

      <ServicesPageView
        locale={locale}
        services={services}
        staticPage={staticPage}
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
    </>
  );
}
