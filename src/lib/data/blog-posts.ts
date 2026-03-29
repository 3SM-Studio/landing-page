export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  content: {
    intro: string;
    sections: Array<{
      title: string;
      body: string;
    }>;
    summary: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'jak-budujemy-marki-ktore-nie-wygladaja-jak-kazdy-inny-smiec-na-rynku',
    title: 'Jak budujemy marki, które nie wyglądają jak każdy inny śmieć na rynku',
    excerpt:
      'Branding, content i strona internetowa muszą mówić jednym głosem. Inaczej robisz chaos, a nie markę.',
    category: 'Branding',
    publishedAt: '2026-03-29',
    readTime: '6 min czytania',
    featured: true,
    content: {
      intro:
        'Większość marek nie ma problemu z brakiem narzędzi. Ma problem z brakiem kierunku. Logo mówi jedno, strona drugie, social media trzecie, a klient finalnie nie rozumie nic.',
      sections: [
        {
          title: 'Marka to nie logo',
          body: 'Samo logo nie buduje marki. To tylko jeden z elementów systemu. Jeśli nie masz spójnego tonu komunikacji, zasad wizualnych i sensownego wdrożenia, to masz tylko obrazek, a nie markę.',
        },
        {
          title: 'Strona musi wspierać komunikację',
          body: 'Dobra strona nie istnieje po to, żeby wyglądać nowocześnie. Ma porządkować przekaz, prowadzić użytkownika i wzmacniać wiarygodność. Jeśli jest tylko dekoracją, to nie działa.',
        },
        {
          title: 'Content bez systemu to chaos',
          body: 'Wrzucanie przypadkowych postów nie buduje rozpoznawalności. Potrzebujesz zasad, powtarzalnych formatów i logicznego rytmu publikacji. Inaczej tworzysz tylko szum.',
        },
      ],
      summary:
        'Spójna marka to efekt decyzji, a nie przypadku. Branding, strona i content muszą pracować razem, bo osobno są tylko luźnymi częściami bez większego znaczenia.',
    },
  },
  {
    slug: '5-bledow-przez-ktore-strona-firmy-wyglada-tanio',
    title: '5 błędów, przez które strona firmy wygląda tanio',
    excerpt:
      'Źle dobrane spacingi, przypadkowe fonty, brak hierarchii i zbyt dużo efektów. Klasyczny zestaw zbrodni.',
    category: 'Web Design',
    publishedAt: '2026-03-26',
    readTime: '4 min czytania',
    content: {
      intro:
        'Tanio wyglądająca strona rzadko wynika z jednego wielkiego błędu. Zwykle to suma małych, głupich decyzji, które razem psują odbiór całości.',
      sections: [
        {
          title: 'Brak hierarchii',
          body: 'Jeśli wszystko na stronie krzyczy tak samo, użytkownik nie wie, na co patrzeć. Hierarchia treści to podstawa.',
        },
        {
          title: 'Przypadkowa typografia',
          body: 'Losowe fonty i niespójne rozmiary tekstu rozwalają odbiór marki szybciej, niż ludziom się wydaje.',
        },
        {
          title: 'Za dużo efektów',
          body: 'Gradient na gradiencie, blur na blurze, animacja na animacji. To nie robi premium. To robi bałagan.',
        },
      ],
      summary:
        'Profesjonalny wygląd strony bierze się z dyscypliny i decyzji, nie z dokładania kolejnych ozdobników.',
    },
  },
  {
    slug: 'dlaczego-samo-ladne-logo-nic-nie-daje',
    title: 'Dlaczego samo ładne logo nic nie daje',
    excerpt:
      'Logo bez systemu wizualnego, tonu komunikacji i sensownego wdrożenia to tylko obrazek. Nic więcej.',
    category: 'Design',
    publishedAt: '2026-03-21',
    readTime: '5 min czytania',
    content: {
      intro:
        'Ludzie przeceniają logo, bo jest najłatwiejsze do pokazania. Problem w tym, że sama sygnetka nie uratuje martwej komunikacji.',
      sections: [
        {
          title: 'Logo nie zastąpi strategii',
          body: 'Bez sensownego kierunku marka dalej będzie nijaka, nawet jeśli sam znak wygląda estetycznie.',
        },
        {
          title: 'Wdrożenie jest ważniejsze niż render',
          body: 'To, jak logo działa na stronie, socialach i materiałach sprzedażowych, ma większe znaczenie niż sam plik na Behance.',
        },
      ],
      summary: 'Ładne logo jest miłym dodatkiem. System marki jest tym, co faktycznie robi robotę.',
    },
  },
  {
    slug: 'social-content-ktory-nie-wyglada-jak-robiony-na-kolanie',
    title: 'Social content, który nie wygląda jak robiony na kolanie',
    excerpt:
      'Dobry content nie polega na wrzucaniu byle czego. Musi mieć rytm, spójność i konkretny cel.',
    category: 'Content',
    publishedAt: '2026-03-18',
    readTime: '3 min czytania',
    content: {
      intro:
        'Problem z większością social contentu jest prosty - wygląda jak improwizacja bez planu.',
      sections: [
        {
          title: 'Formaty dają porządek',
          body: 'Stałe formaty upraszczają produkcję i poprawiają spójność komunikacji.',
        },
        {
          title: 'Cel ważniejszy niż częstotliwość',
          body: 'Lepiej publikować rzadziej i sensownie niż często i bez żadnej wartości.',
        },
      ],
      summary: 'Dobry content to nie kwestia ilości. To kwestia systemu i celu.',
    },
  },
  {
    slug: 'jak-dobra-strona-pomaga-sprzedawac-uslugi',
    title: 'Jak dobra strona pomaga sprzedawać usługi',
    excerpt:
      'Nie chodzi o to, żeby była “ładna”. Ma budować zaufanie, prowadzić użytkownika i zamykać kontakt.',
    category: 'Strategy',
    publishedAt: '2026-03-14',
    readTime: '7 min czytania',
    content: {
      intro:
        'Strona usługowa nie jest ozdobą. To narzędzie sprzedażowe. Jak nie sprzedaje, to nie działa.',
      sections: [
        {
          title: 'Zaufanie przed kontaktem',
          body: 'Użytkownik najpierw ocenia, czy wyglądasz wiarygodnie. Dopiero potem myśli o współpracy.',
        },
        {
          title: 'Mniej tarcia, więcej decyzji',
          body: 'Dobra strona prowadzi człowieka krok po kroku. Nie zmusza go do zgadywania, co zrobić dalej.',
        },
      ],
      summary: 'Strona ma pomagać domykać decyzję, a nie tylko dobrze wyglądać na screenach.',
    },
  },
  {
    slug: 'wideo-reklamowe-bez-kiczu-co-naprawde-robi-roznice',
    title: 'Wideo reklamowe bez kiczu - co naprawdę robi różnicę',
    excerpt:
      'Kadry, światło, pacing i montaż. Efekt premium bierze się z decyzji, a nie z przypadkowego LUT-a.',
    category: 'Video',
    publishedAt: '2026-03-10',
    readTime: '5 min czytania',
    content: {
      intro:
        'Kicz w wideo nie bierze się z kamery. Bierze się z braku smaku, celu i kontroli nad materiałem.',
      sections: [
        {
          title: 'Montaż buduje odbiór',
          body: 'Nawet dobre ujęcia można zabić złym tempem i bezsensownym układem scen.',
        },
        {
          title: 'Światło robi klimat',
          body: 'Bez kontroli światła premium zamienia się w przypadkową estetykę.',
        },
      ],
      summary:
        'Dobry film reklamowy to wynik świadomych decyzji. Nie presetów i nie magii w postprodukcji.',
    },
  },
  {
    slug: 'po-czym-poznac-ze-marka-nie-ma-zadnego-kierunku',
    title: 'Po czym poznać, że marka nie ma żadnego kierunku',
    excerpt:
      'Raz mówi premium, raz memami, raz korpomową. Efekt jest prosty - nikt nie wie, kim oni właściwie są.',
    category: 'Brand Strategy',
    publishedAt: '2026-03-05',
    readTime: '4 min czytania',
    content: {
      intro:
        'Brak kierunku w marce nie zawsze widać od razu. Ale bardzo szybko czuć, że coś się nie klei.',
      sections: [
        {
          title: 'Sprzeczny ton komunikacji',
          body: 'Jeśli marka dziś brzmi jak kancelaria, jutro jak memiczny profil, a pojutrze jak startupowy pitch deck, to nie ma tożsamości.',
        },
        {
          title: 'Brak wspólnych zasad',
          body: 'Bez zasad każdy materiał wygląda inaczej i komunikuje coś innego.',
        },
      ],
      summary:
        'Kierunek marki nie jest dodatkiem. To fundament, bez którego wszystko się rozjeżdża.',
    },
  },
];

export const featuredBlogPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

export const blogCategories = [
  'Wszystkie',
  'Branding',
  'Web Design',
  'Design',
  'Content',
  'Strategy',
  'Video',
  'Brand Strategy',
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogPostDate(date: string, locale: string = 'pl-PL') {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
