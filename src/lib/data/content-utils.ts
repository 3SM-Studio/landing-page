import type { Locale } from '@/i18n/routing';

export type LocalizedString = {
  pl: string;
  en?: string;
};

export function getLocalizedValue(value: LocalizedString, locale: Locale) {
  return value[locale] ?? value.pl;
}

export function getAvailableLocalesFromSlug(slug: { pl: string; en?: string }): Locale[] {
  const locales: Locale[] = ['pl'];

  if (slug.en) {
    locales.push('en');
  }

  return locales;
}
