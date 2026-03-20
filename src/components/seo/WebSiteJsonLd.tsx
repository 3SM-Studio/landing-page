import type { Locale } from '@/i18n/routing';
import { routes, absoluteUrl } from '@/lib/routes';
import { getSiteMetadata, siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

export function WebSiteJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);
  const localizedUrl = absoluteUrl(routes.home, locale);

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
      '@id': `${siteConfig.url}#organization`,
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
