import Image from 'next/image';
import { urlFor } from '@/shared/sanity/image';
import type { Client } from '../model/client.types';

type ClientLogoProps = {
  client: Pick<Client, 'name' | 'logo' | 'logoAlt'>;
  size?: 'sm' | 'md' | 'lg';
};

export function ClientLogo({ client, size = 'md' }: ClientLogoProps) {
  const logoUrl = client.logo ? urlFor(client.logo).width(320).height(180).fit('max').url() : null;
  const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10';

  if (!logoUrl) {
    return <span className="text-sm font-semibold text-white/85">{client.name}</span>;
  }

  return (
    <Image
      src={logoUrl}
      alt={client.logoAlt || client.name}
      width={320}
      height={180}
      className={`${heightClass} w-auto max-w-full object-contain`}
    />
  );
}
