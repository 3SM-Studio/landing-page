import type { Locale } from '@/shared/i18n/routing';

export const workCategories = [
  { key: 'all', label: { pl: 'Wszystkie', en: 'All' } },
  { key: 'branding', label: { pl: 'Branding', en: 'Branding' } },
  { key: 'video', label: { pl: 'Video', en: 'Video' } },
  { key: 'content', label: { pl: 'Content', en: 'Content' } },
  { key: 'web', label: { pl: 'Strony', en: 'Web' } },
] as const;

export function getTranslatedLabel(label: { pl: string; en: string }, locale: Locale) {
  return label[locale];
}

export function getWorkCategoryLabel(category: string | undefined, locale: Locale) {
  if (!category) {
    return '';
  }

  const match = workCategories.find((item) => item.key === category);

  return match ? match.label[locale] : category;
}
