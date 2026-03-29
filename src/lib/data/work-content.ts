import type { Locale } from '@/i18n/routing';
import {
  getAvailableLocalesFromSlug,
  getLocalizedValue,
  type LocalizedString,
} from '@/lib/data/content-utils';

export type { LocalizedString };

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
  {
    slug: {
      pl: 'sesja-zdjeciowa-dla-marki-osobistej',
      en: 'photo-session-for-a-personal-brand',
    },
    title: {
      pl: 'Sesja zdjęciowa dla marki osobistej',
      en: 'Photo session for a personal brand',
    },
    category: {
      pl: 'Photography',
      en: 'Photography',
    },
    year: '2026',
    description: {
      pl: 'Portrety, backstage i materiały pod social media zaprojektowane jako spójny zestaw, a nie zbiór przypadkowych zdjęć.',
      en: 'Portraits, backstage shots and social media assets designed as one coherent set instead of a pile of random photos.',
    },
    services: [
      { pl: 'Photography', en: 'Photography' },
      { pl: 'Art Direction', en: 'Art Direction' },
      { pl: 'Social Content', en: 'Social Content' },
    ],
    content: {
      intro: {
        pl: 'Zamiast serii przypadkowych kadrów powstał zestaw zdjęć z wyraźnym kierunkiem i charakterem.',
        en: 'Instead of a series of random frames, we built a set of images with clear direction and character.',
      },
      challenge: {
        pl: 'Klient potrzebował materiałów, które będą wyglądały spójnie na stronie, social mediach i w komunikacji marki osobistej.',
        en: 'The client needed assets that would stay coherent across the website, social media and personal brand communication.',
      },
      solution: {
        pl: 'Przygotowaliśmy plan sesji, stylizację kadrów i zestaw ujęć zaprojektowany pod realne zastosowania, a nie tylko pod estetykę.',
        en: 'We prepared the shoot plan, framing style and a set of shots designed for real use cases, not just aesthetics.',
      },
      outcome: {
        pl: 'Powstał zestaw, który wygląda profesjonalnie i da się wykorzystywać w wielu kanałach bez wrażenia chaosu.',
        en: 'The result was a professional-looking set that can be used across channels without feeling chaotic.',
      },
    },
  },
  {
    slug: {
      pl: 'landing-page-dla-uslugi-premium',
      en: 'landing-page-for-a-premium-service',
    },
    title: {
      pl: 'Landing page dla usługi premium',
      en: 'Landing page for a premium service',
    },
    category: {
      pl: 'Websites',
      en: 'Websites',
    },
    year: '2026',
    description: {
      pl: 'Strona zaprojektowana tak, żeby budować zaufanie, prowadzić użytkownika i sprzedawać bez tanich sztuczek.',
      en: 'A website designed to build trust, guide the user and sell without cheap tricks.',
    },
    services: [
      { pl: 'Web Design', en: 'Web Design' },
      { pl: 'Messaging', en: 'Messaging' },
      { pl: 'Creative Direction', en: 'Creative Direction' },
    ],
    content: {
      intro: {
        pl: 'To nie był projekt pod ładny screen do portfolio, tylko pod realne prowadzenie użytkownika i domykanie kontaktu.',
        en: 'This was not a project for a pretty portfolio screenshot but for real user guidance and lead generation.',
      },
      challenge: {
        pl: 'Oferta była dobra, ale sposób jej pokazania nie budował wystarczającego zaufania i nie porządkował informacji.',
        en: 'The offer was strong, but the way it was presented did not build enough trust or structure the information well.',
      },
      solution: {
        pl: 'Przebudowaliśmy hierarchię treści, sekcje sprzedażowe i sposób prezentacji usługi tak, żeby użytkownik nie musiał zgadywać.',
        en: 'We rebuilt the content hierarchy, sales sections and service presentation so the user would not have to guess.',
      },
      outcome: {
        pl: 'Strona zaczęła lepiej komunikować wartość usługi i prowadzić użytkownika do kontaktu bez zbędnego tarcia.',
        en: 'The website started communicating the service value more clearly and guiding users to contact with less friction.',
      },
    },
  },
];

export const featuredWork = selectedWorks.find((item) => item.featured) ?? selectedWorks[0];

export { getLocalizedValue };

export function getWorkBySlug(slug: string, locale: Locale) {
  return selectedWorks.find((item) => {
    const localizedSlug = item.slug[locale] ?? item.slug.pl;
    return localizedSlug === slug;
  });
}

export function getWorkAvailableLocales(item: WorkItem): Locale[] {
  return getAvailableLocalesFromSlug(item.slug);
}
