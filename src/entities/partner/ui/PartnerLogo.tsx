import Image from 'next/image';
import { urlFor } from '@/shared/sanity/image';
import type { Partner } from '../model/partner.types';

type PartnerLogoProps = {
  partner: Pick<Partner, 'name' | 'logo' | 'logoAlt'>;
  size?: 'sm' | 'md' | 'lg';
};

export function PartnerLogo({ partner, size = 'md' }: PartnerLogoProps) {
  const logoUrl = partner.logo
    ? urlFor(partner.logo).width(320).height(180).fit('max').url()
    : null;
  const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10';

  if (!logoUrl) {
    return <span className="text-sm font-semibold text-white/85">{partner.name}</span>;
  }

  return (
    <Image
      src={logoUrl}
      alt={partner.logoAlt || partner.name}
      width={320}
      height={180}
      className={`${heightClass} w-auto max-w-full object-contain`}
    />
  );
}
