import type { Locale } from '@/shared/i18n/routing';

export function getBlogLocaleCode(locale: Locale): 'pl-PL' | 'en-US' {
  return locale === 'en' ? 'en-US' : 'pl-PL';
}
