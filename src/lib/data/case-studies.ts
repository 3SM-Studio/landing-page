export type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  client: string;
  year: string;
  featured?: boolean;
  scope?: string[];
  problem?: string;
  solution?: string;
  result?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: '3sm-x-academy-dance',
    title: '3SM x Academy Dance - strona, content i spójny wizerunek marki',
    excerpt:
      'Od rozjechanej komunikacji do spójnego systemu wizualnego i strony, która w końcu wygląda jak marka, a nie przypadkowy zlepek sekcji.',
    category: 'Brand + Web',
    client: 'Academy Dance',
    year: '2026',
    featured: true,
    scope: ['Brand direction', 'Website design', 'Content system'],
    problem:
      'Marka komunikowała się niespójnie. Strona nie budowała zaufania, content nie miał wspólnego kierunku, a całość wyglądała jak zbiór przypadkowych decyzji.',
    solution:
      'Zaprojektowaliśmy bardziej spójny kierunek wizualny, uporządkowaliśmy strukturę komunikacji i przygotowaliśmy landing page, który prowadzi użytkownika przez ofertę bez chaosu.',
    result:
      'Efekt to czytelniejsza marka, mocniejszy pierwszy kontakt z odbiorcą i system, który da się rozwijać bez ciągłego zaczynania od zera.',
  },
  {
    slug: 'landing-page-dla-marki-kreatywnej',
    title: 'Landing page dla marki kreatywnej',
    excerpt:
      'Nowoczesny landing page zaprojektowany tak, żeby budować zaufanie, prowadzić użytkownika i sprzedawać usługę bez zbędnego syfu.',
    category: 'Web Design',
    client: '3SM Studio',
    year: '2026',
    problem: 'Stary przekaz był mało czytelny i nie tłumaczył wartości oferty.',
    solution: 'Przebudowaliśmy strukturę sekcji, hierarchię treści i CTA.',
    result: 'Strona zaczęła komunikować usługę jasno, bez przeładowania treścią.',
  },
  {
    slug: 'rebranding-lokalnej-marki-tanecznej',
    title: 'Rebranding lokalnej marki tanecznej',
    excerpt:
      'Nowa identyfikacja, lepsza komunikacja i wizualny porządek zamiast chaosu, który wcześniej rozwalał odbiór marki.',
    category: 'Branding',
    client: 'Dance Academy',
    year: '2026',
    problem: 'Marka wyglądała niespójnie i nie miała rozpoznawalnego charakteru.',
    solution: 'Ustaliliśmy kierunek wizualny, ton komunikacji i podstawy systemu brandowego.',
    result: 'Odbiór marki stał się bardziej profesjonalny i spójny.',
  },
  {
    slug: 'social-content-system-dla-tworcy',
    title: 'Social content system dla twórcy',
    excerpt:
      'Zamiast wrzucania byle czego - spójny zestaw formatów, layoutów i zasad, które da się utrzymać w czasie.',
    category: 'Content',
    client: 'Creator Project',
    year: '2025',
    problem: 'Publikacje były przypadkowe i nie budowały rozpoznawalności.',
    solution: 'Zbudowaliśmy zestaw powtarzalnych formatów i zasad publikacji.',
    result: 'Content stał się łatwiejszy do produkcji i bardziej spójny wizualnie.',
  },
  {
    slug: 'strona-uslugowa-dla-studia-foto-video',
    title: 'Strona usługowa dla studia foto-video',
    excerpt:
      'Projekt strony nastawionej na prezentację portfolio, lepszą hierarchię treści i prostą ścieżkę kontaktu.',
    category: 'Website',
    client: 'Visual Studio',
    year: '2025',
    problem: 'Portfolio było źle pokazane, a kontakt zbyt ukryty.',
    solution: 'Przebudowaliśmy układ strony pod prezentację prac i prostszy kontakt.',
    result: 'Użytkownik szybciej rozumie ofertę i łatwiej wykonuje kolejny krok.',
  },
  {
    slug: 'opakowanie-komunikacji-marki-od-zera',
    title: 'Opakowanie komunikacji marki od zera',
    excerpt:
      'Tone of voice, kierunek wizualny i konkretne zasady, żeby marka przestała mówić pięcioma głosami naraz.',
    category: 'Strategy',
    client: 'Startup Brand',
    year: '2025',
    problem: 'Brak spójności między materiałami i kanałami komunikacji.',
    solution: 'Zdefiniowaliśmy podstawy komunikacji i zasady ich stosowania.',
    result: 'Marka zaczęła brzmieć i wyglądać jak jeden organizm, a nie bałagan.',
  },
  {
    slug: 'video-showcase-z-lepsza-narracja-marki',
    title: 'Video showcase z lepszą narracją marki',
    excerpt:
      'Case pokazujący, jak montaż, pacing i selekcja ujęć wpływają na odbiór marki bardziej niż same “ładne kadry”.',
    category: 'Video',
    client: 'Campaign Project',
    year: '2024',
    problem: 'Materiał wyglądał estetycznie, ale nic nie komunikował.',
    solution: 'Przestawiliśmy nacisk z samych ujęć na narrację i pacing.',
    result: 'Video zaczęło realnie wspierać wizerunek marki, a nie tylko robić tło.',
  },
];

export const featuredCaseStudy = caseStudies.find((item) => item.featured) ?? caseStudies[0];

export const filters = ['Wszystkie', 'Branding', 'Website', 'Content', 'Strategy', 'Video'];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
