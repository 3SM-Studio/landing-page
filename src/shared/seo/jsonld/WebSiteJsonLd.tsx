import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl, routes } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import {
  resolveLocalizedSiteMetadata,
  resolvePublicSiteConfig,
} from '@/shared/config/site/site-config.resolver';

type Props = {
  locale: Locale;
};

export async function WebSiteJsonLd({ locale }: Props) {
  const [localizedMetadata, siteConfig] = await Promise.all([
    resolveLocalizedSiteMetadata(locale),
    resolvePublicSiteConfig(),
  ]);

  const localizedUrl = absoluteUrl(routes.home);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${localizedUrl}#website`,
    url: localizedUrl,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    description: localizedMetadata.description,
    inLanguage: localizedMetadata.language,
    publisher: {
      '@type': 'Organization',
      '@id': `${serverSiteConfig.url}#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
