'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Link } from '@/i18n/navigation';
import { navigation } from '@/lib/config/navigation';
import { routes } from '@/lib/routes';

function isActiveNavItem(href: string, segment: string | null) {
  if (href === '/') {
    return segment === null;
  }

  const hrefSegment = href.replace(/^\//, '').split('/')[0];
  return hrefSegment === segment;
}

export function MobileNav() {
  const t = useTranslations('nav');
  const segment = useSelectedLayoutSegment();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label={t('openMenu')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-3sm-cyan/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent
          showCloseButton={false}
          side="right"
          className="border-l border-white/10 bg-[#020617]/95 px-6 py-6 text-white backdrop-blur-2xl"
        >
          <SheetTitle className="sr-only">{t('mobileMenuTitle')}</SheetTitle>
          <SheetDescription className="sr-only">{t('mobileMenuDescription')}</SheetDescription>

          <div className="flex h-full flex-col">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-3sm-cyan to-3sm-teal text-xl font-bold text-white shadow-lg shadow-sky-500/20">
                  3
                </div>
                <span className="text-2xl font-black tracking-tight text-white">SM</span>
              </div>

              <SheetClose asChild>
                <button
                  type="button"
                  aria-label={t('closeMenu')}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-3sm-cyan/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </SheetClose>
            </div>

            <nav aria-label={t('mobileNavigation')} className="flex flex-1 flex-col gap-2">
              {navigation.map((item) => {
                const isActive = isActiveNavItem(item.href, segment);

                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'rounded-2xl border px-4 py-4 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60',
                        isActive
                          ? 'border-white/10 bg-white/8 text-3sm-cyan'
                          : 'border-transparent text-white/80 hover:bg-white/5 hover:text-3sm-cyan',
                      ].join(' ')}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            <div className="pt-6">
              <SheetClose asChild>
                <Link
                  href={routes.contact}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-sky-400/20 bg-linear-to-r from-3sm-cyan to-3sm-teal px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition hover:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/60"
                >
                  {t('contact')}
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
