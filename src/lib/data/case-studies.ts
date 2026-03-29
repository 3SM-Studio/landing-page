import type { Locale } from '@/i18n/routing';
import {
  getAvailableLocalesFromSlug,
  getLocalizedValue,
  type LocalizedString,
} from '@/lib/data/content-utils';

export type { LocalizedString };

export type CaseStudy = {
  slug: {
    pl: string;
    en?: string;
  };
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  client: LocalizedString;
  year: string;
  featured?: boolean;
  scope?: LocalizedString[];
  problem?: LocalizedString;
  solution?: LocalizedString;
  result?: LocalizedString;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: {
      pl: '3sm-x-academy-dance',
      en: '3sm-x-academy-dance',
    },
    title: {
      pl: '3SM x Academy Dance - strona, content i spójny wizerunek marki',
      en: '3SM x Academy Dance - website, content and a cohesive brand image',
    },
    excerpt: {
      pl: 'Od rozjechanej komunikacji do spójnego systemu wizualnego i strony, która w końcu wygląda jak marka, a nie przypadkowy zlepek sekcji.',
      en: 'From scattered communication to a cohesive visual system and a website that finally looks like a brand instead of a random stack of sections.',
    },
    category: {
      pl: 'Brand + Web',
      en: 'Brand + Web',
    },
    client: {
      pl: 'Academy Dance',
      en: 'Academy Dance',
    },
    year: '2026',
    featured: true,
    scope: [
      { pl: 'Brand direction', en: 'Brand direction' },
      { pl: 'Website design', en: 'Website design' },
      { pl: 'Content system', en: 'Content system' },
    ],
    problem: {
      pl: 'Marka komunikowała się niespójnie. Strona nie budowała zaufania, content nie miał wspólnego kierunku, a całość wyglądała jak zbiór przypadkowych decyzji.',
      en: 'The brand communicated inconsistently. The website did not build trust, the content lacked a shared direction, and the whole thing felt like a set of random decisions.',
    },
    solution: {
      pl: 'Zaprojektowaliśmy bardziej spójny kierunek wizualny, uporządkowaliśmy strukturę komunikacji i przygotowaliśmy landing page, który prowadzi użytkownika przez ofertę bez chaosu.',
      en: 'We designed a more cohesive visual direction, organized the communication structure and created a landing page that guides users through the offer without chaos.',
    },
    result: {
      pl: 'Efekt to czytelniejsza marka, mocniejszy pierwszy kontakt z odbiorcą i system, który da się rozwijać bez ciągłego zaczynania od zera.',
      en: 'The result was a clearer brand, a stronger first impression and a system that can be developed without constantly starting from scratch.',
    },
  },
  {
    slug: {
      pl: 'landing-page-dla-marki-kreatywnej',
      en: 'landing-page-for-a-creative-brand',
    },
    title: {
      pl: 'Landing page dla marki kreatywnej',
      en: 'Landing page for a creative brand',
    },
    excerpt: {
      pl: 'Nowoczesny landing page zaprojektowany tak, żeby budować zaufanie, prowadzić użytkownika i sprzedawać usługę bez zbędnego syfu.',
      en: 'A modern landing page designed to build trust, guide the user and sell the service without unnecessary mess.',
    },
    category: {
      pl: 'Web Design',
      en: 'Web Design',
    },
    client: {
      pl: '3SM Studio',
      en: '3SM Studio',
    },
    year: '2026',
    problem: {
      pl: 'Stary przekaz był mało czytelny i nie tłumaczył wartości oferty.',
      en: 'The old message was unclear and failed to explain the value of the offer.',
    },
    solution: {
      pl: 'Przebudowaliśmy strukturę sekcji, hierarchię treści i CTA.',
      en: 'We rebuilt the section structure, content hierarchy and call-to-actions.',
    },
    result: {
      pl: 'Strona zaczęła komunikować usługę jasno, bez przeładowania treścią.',
      en: 'The page started communicating the service clearly without overwhelming the user with content.',
    },
  },
  {
    slug: {
      pl: 'rebranding-lokalnej-marki-tanecznej',
      en: 'rebranding-of-a-local-dance-brand',
    },
    title: {
      pl: 'Rebranding lokalnej marki tanecznej',
      en: 'Rebranding of a local dance brand',
    },
    excerpt: {
      pl: 'Nowa identyfikacja, lepsza komunikacja i wizualny porządek zamiast chaosu, który wcześniej rozwalał odbiór marki.',
      en: 'A new identity, better communication and visual order instead of the chaos that previously damaged brand perception.',
    },
    category: {
      pl: 'Branding',
      en: 'Branding',
    },
    client: {
      pl: 'Dance Academy',
      en: 'Dance Academy',
    },
    year: '2026',
    problem: {
      pl: 'Marka wyglądała niespójnie i nie miała rozpoznawalnego charakteru.',
      en: 'The brand looked inconsistent and lacked a recognizable character.',
    },
    solution: {
      pl: 'Ustaliliśmy kierunek wizualny, ton komunikacji i podstawy systemu brandowego.',
      en: 'We defined the visual direction, tone of voice and the foundations of the brand system.',
    },
    result: {
      pl: 'Odbiór marki stał się bardziej profesjonalny i spójny.',
      en: 'The brand started to feel more professional and coherent.',
    },
  },
  {
    slug: {
      pl: 'social-content-system-dla-tworcy',
      en: 'social-content-system-for-a-creator',
    },
    title: {
      pl: 'Social content system dla twórcy',
      en: 'Social content system for a creator',
    },
    excerpt: {
      pl: 'Zamiast wrzucania byle czego - spójny zestaw formatów, layoutów i zasad, które da się utrzymać w czasie.',
      en: 'Instead of posting random things - a coherent set of formats, layouts and rules that can actually be maintained over time.',
    },
    category: {
      pl: 'Content',
      en: 'Content',
    },
    client: {
      pl: 'Creator Project',
      en: 'Creator Project',
    },
    year: '2025',
    problem: {
      pl: 'Publikacje były przypadkowe i nie budowały rozpoznawalności.',
      en: 'The publications were random and did not build recognition.',
    },
    solution: {
      pl: 'Zbudowaliśmy zestaw powtarzalnych formatów i zasad publikacji.',
      en: 'We built a system of repeatable formats and publishing rules.',
    },
    result: {
      pl: 'Content stał się łatwiejszy do produkcji i bardziej spójny wizualnie.',
      en: 'The content became easier to produce and visually more consistent.',
    },
  },
  {
    slug: {
      pl: 'strona-uslugowa-dla-studia-foto-video',
      en: 'service-website-for-a-photo-video-studio',
    },
    title: {
      pl: 'Strona usługowa dla studia foto-video',
      en: 'Service website for a photo-video studio',
    },
    excerpt: {
      pl: 'Projekt strony nastawionej na prezentację portfolio, lepszą hierarchię treści i prostą ścieżkę kontaktu.',
      en: 'A website project focused on portfolio presentation, better content hierarchy and a simple contact path.',
    },
    category: {
      pl: 'Website',
      en: 'Website',
    },
    client: {
      pl: 'Visual Studio',
      en: 'Visual Studio',
    },
    year: '2025',
    problem: {
      pl: 'Portfolio było źle pokazane, a kontakt zbyt ukryty.',
      en: 'The portfolio was presented poorly and the contact path was too hidden.',
    },
    solution: {
      pl: 'Przebudowaliśmy układ strony pod prezentację prac i prostszy kontakt.',
      en: 'We rebuilt the website structure around showcasing the work and making contact easier.',
    },
    result: {
      pl: 'Użytkownik szybciej rozumie ofertę i łatwiej wykonuje kolejny krok.',
      en: 'Users understand the offer faster and can take the next step more easily.',
    },
  },
  {
    slug: {
      pl: 'opakowanie-komunikacji-marki-od-zera',
      en: 'packaging-brand-communication-from-scratch',
    },
    title: {
      pl: 'Opakowanie komunikacji marki od zera',
      en: 'Building a brand communication layer from scratch',
    },
    excerpt: {
      pl: 'Tone of voice, kierunek wizualny i konkretne zasady, żeby marka przestała mówić pięcioma głosami naraz.',
      en: 'Tone of voice, visual direction and clear rules so the brand stops speaking with five voices at once.',
    },
    category: {
      pl: 'Strategy',
      en: 'Strategy',
    },
    client: {
      pl: 'Startup Brand',
      en: 'Startup Brand',
    },
    year: '2025',
    problem: {
      pl: 'Brak spójności między materiałami i kanałami komunikacji.',
      en: 'There was no consistency between materials and communication channels.',
    },
    solution: {
      pl: 'Zdefiniowaliśmy podstawy komunikacji i zasady ich stosowania.',
      en: 'We defined the communication foundations and the rules for applying them.',
    },
    result: {
      pl: 'Marka zaczęła brzmieć i wyglądać jak jeden organizm, a nie bałagan.',
      en: 'The brand started to sound and look like one coherent organism instead of a mess.',
    },
  },
  {
    slug: {
      pl: 'video-showcase-z-lepsza-narracja-marki',
      en: 'video-showcase-with-better-brand-narrative',
    },
    title: {
      pl: 'Video showcase z lepszą narracją marki',
      en: 'Video showcase with a better brand narrative',
    },
    excerpt: {
      pl: 'Case pokazujący, jak montaż, pacing i selekcja ujęć wpływają na odbiór marki bardziej niż same “ładne kadry”.',
      en: 'A case study showing how editing, pacing and shot selection shape brand perception more than just “pretty frames”.',
    },
    category: {
      pl: 'Video',
      en: 'Video',
    },
    client: {
      pl: 'Campaign Project',
      en: 'Campaign Project',
    },
    year: '2024',
    problem: {
      pl: 'Materiał wyglądał estetycznie, ale nic nie komunikował.',
      en: 'The material looked aesthetic but communicated nothing.',
    },
    solution: {
      pl: 'Przestawiliśmy nacisk z samych ujęć na narrację i pacing.',
      en: 'We shifted the focus from the shots themselves to narrative and pacing.',
    },
    result: {
      pl: 'Video zaczęło realnie wspierać wizerunek marki, a nie tylko robić tło.',
      en: 'The video started supporting the brand image for real instead of just acting as background.',
    },
  },
];

export const featuredCaseStudy = caseStudies.find((item) => item.featured) ?? caseStudies[0];

export const filters = [
  { key: 'all', label: { pl: 'Wszystkie', en: 'All' } },
  { key: 'branding', label: { pl: 'Branding', en: 'Branding' } },
  { key: 'website', label: { pl: 'Website', en: 'Website' } },
  { key: 'content', label: { pl: 'Content', en: 'Content' } },
  { key: 'strategy', label: { pl: 'Strategy', en: 'Strategy' } },
  { key: 'video', label: { pl: 'Video', en: 'Video' } },
] as const;

export { getLocalizedValue };

export function getCaseStudyBySlug(slug: string, locale: Locale) {
  return caseStudies.find((item) => {
    const localizedSlug = item.slug[locale] ?? item.slug.pl;
    return localizedSlug === slug;
  });
}

export function getCaseStudyAvailableLocales(item: CaseStudy): Locale[] {
  return getAvailableLocalesFromSlug(item.slug);
}
