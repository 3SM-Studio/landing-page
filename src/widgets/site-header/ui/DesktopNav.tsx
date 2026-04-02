'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/shared/i18n/navigation';
import { navigation } from '@/shared/config/navigation/navigation.config';

function isActiveNavItem(href: string, pathname: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <div className="hidden lg:block">
      <ul className="flex items-center gap-2">
        {navigation.map((item) => {
          const isActive = isActiveNavItem(item.href, pathname);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'inline-flex min-h-11 items-center rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
                  isActive ? 'bg-white/8 text-3sm-cyan' : 'text-white/55 hover:text-3sm-cyan',
                ].join(' ')}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
