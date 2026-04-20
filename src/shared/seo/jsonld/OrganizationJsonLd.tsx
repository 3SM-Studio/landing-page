import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import {
  resolveLocalizedSiteMetadata,
  resolvePublicSiteConfig,
} from '@/shared/config/site/site-config.resolver';

type Props = {
  locale: Locale;
};

export async function OrganizationJsonLd({ locale }: Props) {
  const [localizedMetadata, siteConfig] = await Promise.all([
    resolveLocalizedSiteMetadata(locale),
    resolvePublicSiteConfig(),
  ]);

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
    '@id': `${serverSiteConfig.url}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: serverSiteConfig.url,
    logo: siteConfig.images?.organizationLogoUrl ?? absoluteUrl('/icon-512.png'),
    email: siteConfig.email,
    description: localizedMetadata.description,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.x,
      siteConfig.links.youtube,
      siteConfig.links.tiktok,
      siteConfig.links.facebook,
      siteConfig.links.discord,
      siteConfig.links.linkedin,
    ].filter(Boolean),
    ...(address ? { address } : {}),
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
