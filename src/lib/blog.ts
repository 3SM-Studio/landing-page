import type { Locale } from '@/i18n/routing';

export const blogCategories = [
  { key: 'all', label: { pl: 'Wszystkie', en: 'All' } },
  { key: 'branding', label: { pl: 'Branding', en: 'Branding' } },
  { key: 'web-design', label: { pl: 'Projektowanie stron', en: 'Web Design' } },
  { key: 'design', label: { pl: 'Design', en: 'Design' } },
  { key: 'content', label: { pl: 'Content', en: 'Content' } },
  { key: 'strategy', label: { pl: 'Strategia', en: 'Strategy' } },
  { key: 'video', label: { pl: 'Video', en: 'Video' } },
  { key: 'brand-strategy', label: { pl: 'Strategia marki', en: 'Brand Strategy' } },
] as const;

export function tLabel(label: { pl: string; en: string }, locale: Locale) {
  return label[locale];
}

export function getBlogCategoryLabel(category: string | undefined, locale: Locale) {
  if (!category) {
    return '';
  }

  const match = blogCategories.find((item) => item.key === category);

  return match ? match.label[locale] : category;
}

export function formatBlogReadTime(minutes?: number, locale: Locale = 'pl') {
  if (!minutes || minutes < 1) {
    return '';
  }

  return locale === 'en' ? `${minutes} min read` : `${minutes} min czytania`;
}

export function formatBlogPostDate(date?: string, locale: string = 'pl-PL') {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
