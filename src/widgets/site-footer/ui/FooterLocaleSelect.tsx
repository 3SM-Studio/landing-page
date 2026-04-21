'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useSyncExternalStore, useTransition } from 'react';

import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { routing, type Locale } from '@/shared/i18n/routing';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';

type ParamsValue = string | string[] | undefined;

function normalizeParams(params: Record<string, ParamsValue>) {
  return Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) => {
      if (typeof value === 'string') {
        return [[key, value]];
      }

      if (Array.isArray(value) && value[0]) {
        return [[key, value[0]]];
      }

      return [];
    }),
  );
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * Ten dropdown zmienia locale bez zgadywania docelowej trasy.
 * Korzysta z aktualnego pathname i params, żeby nie zrzucać użytkownika na homepage
 * przy przełączaniu języka z detail page albo legali.
 *
 * Render Selecta jest celowo opóźniony do momentu mountu klienta.
 * Chrome/autofill potrafi dopisywać atrybuty do ukrytego native selecta Radixa
 * jeszcze przed hydratacją, co kończy się hydration mismatch.
 */
export function FooterLocaleSelect() {
  const t = useTranslations('Footer');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const normalizedParams = normalizeParams(params);

  function handleValueChange(nextLocale: string) {
    if (!routing.locales.includes(nextLocale as Locale) || nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(
        // usePathname z next-intl zwraca internal pathname, więc można go bezpiecznie
        // przełączyć na inny locale z tym samym zestawem params.
        // Nie upraszczaj tego do redirectu na home, bo zepsujesz UX detail pages.
        // @ts-expect-error next-intl poprawnie obsługuje internal pathname + params, ale typy są tu zbyt wąskie.
        { pathname, params: normalizedParams },
        { locale: nextLocale as Locale, scroll: false },
      );
    });
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center gap-3 md:justify-end">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {t('language.label')}
        </span>

        <div className="h-10 w-[124px] shrink-0 rounded-2xl border border-white/10 bg-white/5" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 md:justify-end">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {t('language.label')}
      </span>

      <Select value={locale} onValueChange={handleValueChange} disabled={isPending}>
        <SelectTrigger
          aria-label={t('language.label')}
          className="h-10 w-[124px] rounded-2xl border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="min-w-[124px] rounded-2xl">
          {routing.locales.map((item) => (
            <SelectItem key={item} value={item} className="rounded-xl">
              {t(`language.options.${item}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
