import { Link } from '../i18n/navigation';
import { routes } from '../lib/routes';
import { BrandLogo, type BrandLogoProps } from './BrandLogo';

export function BrandLogoLink(props: BrandLogoProps) {
  return (
    <Link
      href={routes.home}
      aria-label="Strona główna"
      className="inline-flex w-fit shrink-0 flex-none leading-none"
    >
      <BrandLogo {...props} variant="header" priority />
    </Link>
  );
}
