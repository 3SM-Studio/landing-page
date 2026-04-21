import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

type BrandLogoAsset = {
  url: string | null;
  alt: string | null;
};

export type BrandLogoProps = {
  shortName: string;
  eyebrow?: string;
  svgLogo?: BrandLogoAsset | null;
  rasterLogo?: BrandLogoAsset | null;
  className?: string;
  textClassName?: string;
  imageClassName?: string;
  showEyebrow?: boolean;
  priority?: boolean;
  variant?: 'header' | 'footer';
};

export function BrandLogo({
  shortName,
  svgLogo,
  rasterLogo,
  className,
  textClassName,
  imageClassName,
  priority = false,
  variant = 'footer',
}: BrandLogoProps) {
  const logo = svgLogo?.url ? svgLogo : rasterLogo?.url ? rasterLogo : null;
  const alt = logo?.alt || `${shortName} logo`;

  const defaultImageClassName =
    variant === 'header'
      ? 'block h-9 w-auto shrink-0 object-contain md:h-10'
      : 'block h-9 w-auto shrink-0 object-contain md:h-10';

  if (!logo?.url) {
    return (
      <span
        className={cn(
          'block truncate font-black tracking-tight text-white shrink-0',
          variant === 'header' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl',
          textClassName,
        )}
      >
        {shortName || 'LOGO'}
      </span>
    );
  }

  return (
    <span className={cn('inline-flex shrink-0 leading-none', className)}>
      <Image
        src={logo.url}
        alt={alt}
        width={220}
        height={64}
        priority={priority}
        className={cn(defaultImageClassName, imageClassName)}
      />
    </span>
  );
}
