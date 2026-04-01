import { routing, type Locale } from '@/shared/i18n/routing';

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : routing.defaultLocale;
}

export function getBlogLocaleCode(locale: Locale): 'pl-PL' | 'en-US' {
  return locale === 'en' ? 'en-US' : 'pl-PL';
}
