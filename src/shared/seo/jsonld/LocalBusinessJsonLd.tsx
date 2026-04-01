import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl, routes } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import { getSiteMetadata } from '@/shared/config/site/site-config.public';

type Props = {
  locale: Locale;
};

export function LocalBusinessJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);
  const localizedUrl = absoluteUrl(routes.home);

  const sameAs = [
    serverSiteConfig.links.instagram,
    serverSiteConfig.links.x,
    serverSiteConfig.links.youtube,
    serverSiteConfig.links.tiktok,
  ].filter(Boolean);

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
    '@type': 'LocalBusiness',
    '@id': `${serverSiteConfig.url}#localbusiness`,
    name: serverSiteConfig.name,
    legalName: serverSiteConfig.legalName,
    url: localizedUrl,
    description: localizedMetadata.description,
    email: serverSiteConfig.email,
    telephone: serverSiteConfig.phone,
    image: absoluteUrl(serverSiteConfig.ogImagePath),
    logo: absoluteUrl('/icon-512.png'),
    slogan: localizedMetadata.tagline,
    ...(address ? { address } : {}),
    areaServed: [
      {
        '@type': 'City',
        name: serverSiteConfig.address?.addressLocality,
      },
      {
        '@type': 'AdministrativeArea',
        name: serverSiteConfig.address?.addressRegion,
      },
      {
        '@type': 'Country',
        name: serverSiteConfig.address?.addressCountry,
      },
    ],
    knowsAbout: [
      'Video production',
      'Photography',
      'Video editing',
      'Graphic design',
      'Web design',
      'Web development',
      'Social media content',
      'Brand visuals',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: serverSiteConfig.email,
        telephone: serverSiteConfig.phone,
        contactType: 'customer support',
        availableLanguage: locale === 'pl' ? ['Polish', 'English'] : ['English', 'Polish'],
        areaServed: serverSiteConfig.address?.addressCountry,
      },
    ],
    sameAs,
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
