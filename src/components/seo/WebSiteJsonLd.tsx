import type { Locale } from '@/i18n/routing';
import { absoluteUrl, routes } from '@/lib/routes';
import { serverSiteConfig } from '@/lib/site-config.server';
import { getSiteMetadata } from '@/lib/site-config.public';

type Props = {
  locale: Locale;
};

export function WebSiteJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);
  const localizedUrl = absoluteUrl(routes.home);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${localizedUrl}#website`,
    url: localizedUrl,
    name: serverSiteConfig.name,
    alternateName: serverSiteConfig.legalName,
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
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
