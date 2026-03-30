import type { Locale } from '@/i18n/routing';

const categoryLabels = {
  branding: {
    pl: 'Branding',
    en: 'Branding',
  },
  'web-design': {
    pl: 'Projektowanie stron',
    en: 'Web Design',
  },
  design: {
    pl: 'Design',
    en: 'Design',
  },
  content: {
    pl: 'Kontent',
    en: 'Content',
  },
  strategy: {
    pl: 'Strategia',
    en: 'Strategy',
  },
  video: {
    pl: 'Wideo',
    en: 'Video',
  },
  'brand-strategy': {
    pl: 'Strategia marki',
    en: 'Brand Strategy',
  },
  photography: {
    pl: 'Fotografia',
    en: 'Photography',
  },
} as const;

export function getCategoryLabel(category: string | undefined, locale: Locale) {
  if (!category) {
    return '';
  }

  const match = categoryLabels[category as keyof typeof categoryLabels];

  return match ? match[locale] : category;
}
