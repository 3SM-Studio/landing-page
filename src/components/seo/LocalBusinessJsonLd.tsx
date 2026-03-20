import type { Locale } from '@/i18n/routing';
import { absoluteUrl, routes } from '@/lib/routes';
import { getSiteMetadata, siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

export function LocalBusinessJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);
  const localizedUrl = absoluteUrl(routes.home, locale);

  const sameAs = [
    siteConfig.links.instagram,
    siteConfig.links.x,
    siteConfig.links.youtube,
    siteConfig.links.tiktok,
  ].filter(Boolean);

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
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: localizedUrl,
    description: localizedMetadata.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: absoluteUrl(siteConfig.ogImagePath),
    logo: absoluteUrl('/icon-512.png'),
    slogan: localizedMetadata.tagline,
    ...(address ? { address } : {}),
    areaServed: [
      {
        '@type': 'City',
        name: siteConfig.address?.addressLocality,
      },
      {
        '@type': 'AdministrativeArea',
        name: siteConfig.address?.addressRegion,
      },
      {
        '@type': 'Country',
        name: siteConfig.address?.addressCountry,
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
        email: siteConfig.email,
        telephone: siteConfig.phone,
        contactType: 'customer support',
        availableLanguage: locale === 'pl' ? ['Polish', 'English'] : ['English', 'Polish'],
        areaServed: siteConfig.address?.addressCountry,
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
