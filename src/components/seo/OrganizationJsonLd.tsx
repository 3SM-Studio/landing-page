import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/routes';
import { getSiteMetadata, siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

export function OrganizationJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl('/icon-512.png'),
    email: siteConfig.email,
    description: localizedMetadata.description,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.x,
      siteConfig.links.youtube,
      siteConfig.links.tiktok,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
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
