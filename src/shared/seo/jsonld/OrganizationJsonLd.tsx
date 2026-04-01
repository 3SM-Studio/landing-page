import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

type Props = {
  locale: Locale;
};

export function OrganizationJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);

  const address = serverSiteConfig.address
    ? {
        '@type': 'PostalAddress',
        ...(serverSiteConfig.address.streetAddress
          ? { streetAddress: serverSiteConfig.address.streetAddress }
          : {}),
        ...(serverSiteConfig.address.postalCode
          ? { postalCode: serverSiteConfig.address.postalCode }
          : {}),
        addressLocality: serverSiteConfig.address.addressLocality,
        ...(serverSiteConfig.address.addressRegion
          ? { addressRegion: serverSiteConfig.address.addressRegion }
          : {}),
        addressCountry: serverSiteConfig.address.addressCountry,
      }
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${serverSiteConfig.url}#organization`,
    name: serverSiteConfig.name,
    legalName: serverSiteConfig.legalName,
    url: serverSiteConfig.url,
    logo: absoluteUrl('/icon-512.png'),
    email: serverSiteConfig.email,
    description: localizedMetadata.description,
    sameAs: [
      serverSiteConfig.links.instagram,
      serverSiteConfig.links.x,
      serverSiteConfig.links.youtube,
      serverSiteConfig.links.tiktok,
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
