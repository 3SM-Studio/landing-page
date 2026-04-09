import Image from 'next/image';
import { urlFor } from '@/shared/sanity/image';
import type { Client } from '../model/client.types';

type ClientLogoProps = {
  client: Pick<Client, 'name' | 'logo' | 'logoAlt'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function ClientLogo({ client, size = 'md', className = '' }: ClientLogoProps) {
  const logoUrl = client.logo ? urlFor(client.logo).width(500).height(500).fit('max').url() : null;
  const sizeClass = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-full w-full' : 'h-10 w-10';

  if (!logoUrl) {
    return <span className="text-sm font-semibold text-white/85">{client.name}</span>;
  }

  return (
    <Image
      src={logoUrl}
      alt={client.logoAlt || client.name}
      width={500}
      height={500}
      className={`${sizeClass} max-w-none ${className}`.trim()}
    />
  );
}
