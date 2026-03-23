import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { navigation } from '@/lib/config/navigation';

export function DesktopNav() {
  const t = useTranslations('nav');

  return (
    <nav
      aria-label="Primary"
      className="hidden lg:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.3em] text-white/40"
    >
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="transition-colors hover:text-3sm-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
