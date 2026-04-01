import type { Locale } from '@/shared/i18n/routing';

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

export function getTranslatedLabel(label: { pl: string; en: string }, locale: Locale) {
  return label[locale];
}

export function getBlogCategoryLabel(category: string | undefined, locale: Locale) {
  if (!category) {
    return '';
  }

  const match = blogCategories.find((item) => item.key === category);

  return match ? match.label[locale] : category;
}
