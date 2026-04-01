import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl, routes } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

type Props = {
  locale: Locale;
};

export function ServicesJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);

  const services = [
    {
      slug: 'video-production',
      name: locale === 'pl' ? 'Produkcja video' : 'Video Production',
      description:
        locale === 'pl'
          ? 'Produkcja materiałów wideo dla marek, twórców i projektów kreatywnych.'
          : 'Video production for brands, creators and creative projects.',
    },
    {
      slug: 'video-editing',
      name: locale === 'pl' ? 'Montaż video' : 'Video Editing',
      description:
        locale === 'pl'
          ? 'Montaż i postprodukcja materiałów video przygotowanych do publikacji i kampanii.'
          : 'Video editing and post-production for publishing, campaigns and branded content.',
    },
    {
      slug: 'photography',
      name: locale === 'pl' ? 'Fotografia' : 'Photography',
      description:
        locale === 'pl'
          ? 'Fotografia dla marek, wydarzeń, twórców i materiałów promocyjnych.'
          : 'Photography for brands, events, creators and promotional materials.',
    },
    {
      slug: 'graphic-design',
      name: locale === 'pl' ? 'Projektowanie graficzne' : 'Graphic Design',
      description:
        locale === 'pl'
          ? 'Projektowanie materiałów wizualnych, identyfikacji i grafik do komunikacji marki.'
          : 'Graphic design for visual assets, brand communication and digital materials.',
    },
    {
      slug: 'web-design',
      name: locale === 'pl' ? 'Projektowanie stron internetowych' : 'Web Design',
      description:
        locale === 'pl'
          ? 'Projektowanie nowoczesnych stron internetowych dopasowanych do marki i celu biznesowego.'
          : 'Design of modern websites tailored to brand identity and business goals.',
    },
    {
      slug: 'web-development',
      name: locale === 'pl' ? 'Tworzenie stron internetowych' : 'Web Development',
      description:
        locale === 'pl'
          ? 'Tworzenie szybkich i nowoczesnych stron internetowych dla firm, twórców i projektów.'
          : 'Development of fast, modern websites for businesses, creators and projects.',
    },
  ];

  const localizedUrl = absoluteUrl(routes.home);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': services.map((service) => ({
      '@type': 'Service',
      '@id': `${localizedUrl}#service-${service.slug}`,
      url: localizedUrl,
      name: service.name,
      description: service.description,
      serviceType: service.name,
      provider: {
        '@type': 'Organization',
        '@id': `${serverSiteConfig.url}#organization`,
      },
      areaServed: {
        '@type': 'Country',
        name: locale === 'pl' ? 'Polska' : 'Poland',
      },
      availableLanguage: localizedMetadata.language,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
