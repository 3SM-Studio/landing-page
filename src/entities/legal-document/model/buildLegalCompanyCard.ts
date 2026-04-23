import type { PublicSiteConfig } from '@/shared/config/site/site-config.public';

export type LegalCompanyCard = {
  name: string;
  address?: string;
  krs?: string;
  nip?: string;
  regon?: string;
  registrationNumber?: string;
  taxId?: string;
  vatId?: string;
  email?: string;
};

function formatAddress(address?: PublicSiteConfig['address']) {
  if (!address) {
    return undefined;
  }

  return [
    address.streetAddress,
    [address.postalCode, address.addressLocality].filter(Boolean).join(' '),
    address.addressRegion,
    address.addressCountry,
  ]
    .filter(Boolean)
    .join(', ');
}

export function buildLegalCompanyCard(siteConfig: PublicSiteConfig): LegalCompanyCard {
  return {
    name: siteConfig.legalName || siteConfig.name,
    address: formatAddress(siteConfig.address),
    krs: siteConfig.company?.krs,
    nip: siteConfig.company?.nip,
    regon: siteConfig.company?.regon,
    registrationNumber: siteConfig.company?.registrationNumber,
    taxId: siteConfig.company?.taxId,
    vatId: siteConfig.company?.vatId,
    email: siteConfig.email,
  };
}
