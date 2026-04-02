import { hasLocale } from 'next-intl';
import { routing, type Locale } from '@/shared/i18n/routing';

export function resolveLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? (value as Locale) : routing.defaultLocale;
}
