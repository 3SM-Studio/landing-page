import { routing, type Locale } from '@/shared/i18n/routing';

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : routing.defaultLocale;
}
