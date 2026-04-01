import type { Locale } from '@/shared/i18n/routing';

export const caseStudiesCategories = [
  { key: 'all', label: { pl: 'Wszystkie', en: 'All' } },
  { key: 'branding', label: { pl: 'Branding', en: 'Branding' } },
  { key: 'web', label: { pl: 'Strony', en: 'Web' } },
  { key: 'content', label: { pl: 'Content', en: 'Content' } },
  { key: 'strategy', label: { pl: 'Strategia', en: 'Strategy' } },
] as const;

export function getTranslatedLabel(label: { pl: string; en: string }, locale: Locale) {
  return label[locale];
}

export function getCaseStudyCategoryLabel(category: string | undefined, locale: Locale) {
  if (!category) {
    return '';
  }

  const match = caseStudiesCategories.find((item) => item.key === category);

  return match ? match.label[locale] : category;
}
