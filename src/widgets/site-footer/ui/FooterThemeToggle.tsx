'use client';

import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { cn } from '@/shared/lib/utils';

function subscribe() {
  return () => {};
}

export function FooterThemeToggle() {
  const t = useTranslations('Footer');
  const { theme, setTheme } = useTheme();

  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!isClient) {
    return <div className="h-11 w-[128px] rounded-xl border border-white/8 bg-white/[0.04]" />;
  }

  const currentTheme = theme ?? 'system';
  const options = [
    { key: 'light' as const, label: t('theme.light'), icon: Sun },
    { key: 'system' as const, label: t('theme.system'), icon: LaptopMinimal },
    { key: 'dark' as const, label: t('theme.dark'), icon: Moon },
  ];

  return (
    <div
      className="inline-flex items-center rounded-xl border border-white/8 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
      aria-label={t('theme.label')}
      role="group"
    >
      <span className="sr-only">{t('theme.label')}</span>
      {options.map(({ key, label, icon: Icon }) => {
        const isActive = currentTheme === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => setTheme(key)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
              isActive
                ? 'bg-white/10 text-3sm-cyan shadow-[0_0_18px_rgba(56,189,248,0.18)]'
                : 'text-white/45 hover:text-white',
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
