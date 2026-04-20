import type { Locale } from '@/shared/i18n/routing';
import { absoluteUrl, routes } from '@/shared/lib/routes';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';
import {
  resolveDefaultSocialImage,
  resolveLocalizedSiteMetadata,
  resolvePublicSiteConfig,
} from '@/shared/config/site/site-config.resolver';

type Props = {
  locale: Locale;
};

export async function LocalBusinessJsonLd({ locale }: Props) {
  const [localizedMetadata, siteConfig, defaultSocialImage] = await Promise.all([
    resolveLocalizedSiteMetadata(locale),
    resolvePublicSiteConfig(),
    resolveDefaultSocialImage(locale),
  ]);

  const localizedUrl = absoluteUrl(routes.home);

  const sameAs = [
    siteConfig.links.instagram,
    siteConfig.links.x,
    siteConfig.links.youtube,
    siteConfig.links.tiktok,
    siteConfig.links.facebook,
    siteConfig.links.discord,
    siteConfig.links.linkedin,
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
    '@id': `${serverSiteConfig.url}#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: localizedUrl,
    description: localizedMetadata.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: absoluteUrl(defaultSocialImage.url ?? serverSiteConfig.ogImagePath),
    logo: siteConfig.images?.organizationLogoUrl ?? absoluteUrl('/icon-512.png'),
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
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
