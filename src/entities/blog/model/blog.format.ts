import type { Locale } from '@/shared/i18n/routing';
import { getBlogLocaleCode } from './blog.locale';

export function formatBlogReadTime(minutes?: number, locale: Locale = 'pl') {
  if (!minutes || minutes < 1) {
    return '';
  }

  return locale === 'en' ? `${minutes} min read` : `${minutes} min czytania`;
}

export function formatBlogPostDate(date?: string, locale: Locale = 'pl') {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat(getBlogLocaleCode(locale), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
