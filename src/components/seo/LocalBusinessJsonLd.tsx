import type { Locale } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/routes';
import { getSiteMetadata, siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

export function LocalBusinessJsonLd({ locale }: Props) {
  const localizedMetadata = getSiteMetadata(locale);

  const sameAs = [
    siteConfig.links.instagram,
    siteConfig.links.x,
    siteConfig.links.youtube,
    siteConfig.links.tiktok,
  ].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: localizedMetadata.description,
    email: siteConfig.email,
    image: absoluteUrl(siteConfig.ogImagePath),
    logo: absoluteUrl('/icon-512.png'),
    slogan: localizedMetadata.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: [
      {
        '@type': 'City',
        name: siteConfig.location.city,
      },
      {
        '@type': 'AdministrativeArea',
        name: siteConfig.location.region,
      },
      {
        '@type': 'Country',
        name: siteConfig.location.country,
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
        contactType: 'customer support',
        availableLanguage: ['Polish', 'English'],
        areaServed: 'PL',
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
