import type { Locale } from '@/shared/i18n/routing';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

type ServiceJsonLdItem = {
  serviceKey: string;
  slug: string;
  title: string;
  shortDescription: string;
};

type Props = {
  locale: Locale;
  services: ServiceJsonLdItem[];
};

export function ServicesJsonLd({ locale, services }: Props) {
  const localizedMetadata = getSiteMetadata(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': services.map((service) => ({
      '@type': 'Service',
      '@id': `${serverSiteConfig.url}/${locale}/services/${service.slug}#service`,
      url: `${serverSiteConfig.url}/${locale}/services/${service.slug}`,
      name: service.title,
      description: service.shortDescription,
      serviceType: service.title,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
