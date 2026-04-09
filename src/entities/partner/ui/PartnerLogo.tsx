import Image from 'next/image';
import { urlFor } from '@/shared/sanity/image';
import type { Partner } from '../model/partner.types';

type PartnerLogoProps = {
  partner: Pick<Partner, 'name' | 'logo' | 'logoAlt'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function PartnerLogo({ partner, size = 'md', className = '' }: PartnerLogoProps) {
  const logoUrl = partner.logo
    ? urlFor(partner.logo).width(500).height(500).fit('max').url()
    : null;
  const sizeClass = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-full w-full' : 'h-10 w-10';

  if (!logoUrl) {
    return <span className="text-sm font-semibold text-white/85">{partner.name}</span>;
  }

  return (
    <Image
      src={logoUrl}
      alt={partner.logoAlt || partner.name}
      width={500}
      height={500}
      className={`${sizeClass} max-w-none ${className}`.trim()}
    />
  );
}
