import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/routes';
import { getSiteMetadata, siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

export function OrganizationJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);

  const address = siteConfig.address
    ? {
        '@type': 'PostalAddress',
        ...(siteConfig.address.streetAddress
          ? { streetAddress: siteConfig.address.streetAddress }
          : {}),
        ...(siteConfig.address.postalCode ? { postalCode: siteConfig.address.postalCode } : {}),
        addressLocality: siteConfig.address.addressLocality,
        ...(siteConfig.address.addressRegion
          ? { addressRegion: siteConfig.address.addressRegion }
          : {}),
        addressCountry: siteConfig.address.addressCountry,
      }
    : undefined;

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
    ...(address ? { address } : {}),
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
