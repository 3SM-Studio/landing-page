import type { Service } from '@/entities/service/model/service.types';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import type { Locale } from '@/shared/i18n/routing';
import {
  absoluteUrl,
  getLocalizedDynamicPathname,
  getLocalizedPathname,
  routes,
} from '@/shared/lib/routes';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

type Props = {
  locale: Locale;
  services: Service[];
};

export function ServicesJsonLd({ locale, services }: Props) {
  const localizedMetadata = getSiteMetadata(locale);
  const servicesPageUrl = absoluteUrl(getLocalizedPathname(routes.services, locale));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${servicesPageUrl}#services`,
    url: servicesPageUrl,
    name: locale === 'pl' ? 'Usługi 3 Stupid Men' : '3 Stupid Men Services',
    itemListElement: services.map((service, index) => {
      const serviceUrl = absoluteUrl(
        getLocalizedDynamicPathname('/services/[slug]', locale, { slug: service.slug }),
      );

      return {
        '@type': 'ListItem',
        position: index + 1,
        url: serviceUrl,
        item: {
          '@type': 'Service',
          '@id': `${serviceUrl}#service`,
          url: serviceUrl,
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
        },
      };
    }),
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
