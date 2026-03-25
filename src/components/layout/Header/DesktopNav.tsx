import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { navigation } from '@/lib/config/navigation';

export function DesktopNav() {
  const t = useTranslations('nav');

  return (
    <nav aria-label={t('primaryNavigation')} className="hidden items-center gap-2 lg:flex">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-3sm-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
