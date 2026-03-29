export type Locale = 'pl' | 'en';

export type LocalizedString = {
  pl: string;
  en?: string;
};

export type WorkItem = {
  slug: {
    pl: string;
    en?: string;
  };
  title: LocalizedString;
  category: LocalizedString;
  year: string;
  description: LocalizedString;
  services?: LocalizedString[];
  featured?: boolean;
  content?: {
    intro: LocalizedString;
    challenge: LocalizedString;
    solution: LocalizedString;
    outcome: LocalizedString;
  };
};

export const workCategories = [
  { key: 'all', label: { pl: 'Wszystkie', en: 'All' } },
  { key: 'video', label: { pl: 'Video', en: 'Video' } },
  { key: 'photography', label: { pl: 'Photography', en: 'Photography' } },
  { key: 'websites', label: { pl: 'Websites', en: 'Websites' } },
  { key: 'branding', label: { pl: 'Branding', en: 'Branding' } },
  { key: 'social-content', label: { pl: 'Social Content', en: 'Social Content' } },
] as const;

export const selectedWorks: WorkItem[] = [
  {
    slug: {
      pl: 'kampania-wideo-dla-marki-lifestyle',
      en: 'video-campaign-for-a-lifestyle-brand',
    },
    title: {
      pl: 'Kampania wideo dla marki lifestyle',
      en: 'Video campaign for a lifestyle brand',
    },
    category: {
      pl: 'Video',
      en: 'Video',
    },
    year: '2026',
    featured: true,
    description: {
      pl: 'Od koncepcji przez ujęcia po montaż. Materiał zrobiony tak, żeby wyglądał premium i nie przypominał generycznej reklamy z internetu.',
      en: 'From concept through shooting to editing. Created to feel premium and not like a generic internet ad.',
    },
    services: [
      { pl: 'Creative Direction', en: 'Creative Direction' },
      { pl: 'Video', en: 'Video' },
      { pl: 'Editing', en: 'Editing' },
    ],
    content: {
      intro: {
        pl: 'Projekt nastawiony na estetykę premium i spójny odbiór marki.',
        en: 'A project focused on premium aesthetics and a coherent brand impression.',
      },
      challenge: {
        pl: 'Marka potrzebowała materiału, który wygląda profesjonalnie i nie wpada w reklamowy kicz.',
        en: 'The brand needed a piece that looked professional without falling into cheesy ad aesthetics.',
      },
      solution: {
        pl: 'Przygotowaliśmy kierunek kreatywny, ujęcia i montaż oparty na rytmie, świetle i selekcji materiału.',
        en: 'We developed a creative direction, shot list and edit built around rhythm, lighting and careful shot selection.',
      },
      outcome: {
        pl: 'Powstał materiał, który wygląda jak przemyślana kampania, a nie losowy zestaw ładnych ujęć.',
        en: 'The result was a piece that feels like a considered campaign instead of a random set of nice shots.',
      },
    },
  },
  // kolejne projekty...
];

export const featuredWork = selectedWorks.find((item) => item.featured) ?? selectedWorks[0];

export function getLocalizedValue(value: LocalizedString, locale: Locale) {
  return value[locale] ?? value.pl;
}

export function getWorkBySlug(slug: string, locale: Locale) {
  return selectedWorks.find((item) => {
    const localizedSlug = item.slug[locale] ?? item.slug.pl;
    return localizedSlug === slug;
  });
}
