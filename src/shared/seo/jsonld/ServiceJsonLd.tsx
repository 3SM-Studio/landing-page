import type { Service } from '@/entities/service/model/service.types';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl, getLocalizedDynamicPathname } from '@/shared/lib/routes';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

type Props = {
  locale: Locale;
  service: Service;
};

export function ServiceJsonLd({ locale, service }: Props) {
  const localizedMetadata = getSiteMetadata(locale);
  const serviceUrl = absoluteUrl(
    getLocalizedDynamicPathname('/services/[slug]', locale, { slug: service.slug }),
  );

  const jsonLd = {
    '@context': 'https://schema.org',
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': serviceUrl,
    },
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
