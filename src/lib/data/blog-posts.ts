import type { Locale } from '@/i18n/routing';
import {
  getAvailableLocalesFromSlug,
  getLocalizedValue,
  type LocalizedString,
} from '@/lib/data/content-utils';

export type { LocalizedString };

export type BlogPost = {
  slug: {
    pl: string;
    en?: string;
  };
  title: LocalizedString;
  excerpt: LocalizedString;
  category: LocalizedString;
  publishedAt: string;
  readTime: LocalizedString;
  featured?: boolean;
  content: {
    intro: LocalizedString;
    sections: Array<{
      title: LocalizedString;
      body: LocalizedString;
    }>;
    summary: LocalizedString;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: {
      pl: 'jak-budujemy-marki-ktore-nie-wygladaja-jak-kazdy-inny-smiec-na-rynku',
      en: 'how-we-build-brands-that-do-not-look-like-every-other-piece-of-trash-on-the-market',
    },
    title: {
      pl: 'Jak budujemy marki, które nie wyglądają jak każdy inny śmieć na rynku',
      en: 'How we build brands that do not look like every other piece of trash on the market',
    },
    excerpt: {
      pl: 'Branding, content i strona internetowa muszą mówić jednym głosem. Inaczej robisz chaos, a nie markę.',
      en: 'Branding, content and the website need to speak with one voice. Otherwise you are creating chaos, not a brand.',
    },
    category: {
      pl: 'Branding',
      en: 'Branding',
    },
    publishedAt: '2026-03-29',
    readTime: {
      pl: '6 min czytania',
      en: '6 min read',
    },
    featured: true,
    content: {
      intro: {
        pl: 'Większość marek nie ma problemu z brakiem narzędzi. Ma problem z brakiem kierunku. Logo mówi jedno, strona drugie, social media trzecie, a klient finalnie nie rozumie nic.',
        en: 'Most brands do not have a tool problem. They have a direction problem. The logo says one thing, the website says another, social media says something else, and in the end the client understands nothing.',
      },
      sections: [
        {
          title: {
            pl: 'Marka to nie logo',
            en: 'A brand is not a logo',
          },
          body: {
            pl: 'Samo logo nie buduje marki. To tylko jeden z elementów systemu. Jeśli nie masz spójnego tonu komunikacji, zasad wizualnych i sensownego wdrożenia, to masz tylko obrazek, a nie markę.',
            en: 'A logo alone does not build a brand. It is only one element of the system. If you do not have a coherent tone of voice, visual rules and sensible implementation, you just have an image, not a brand.',
          },
        },
        {
          title: {
            pl: 'Strona musi wspierać komunikację',
            en: 'The website has to support communication',
          },
          body: {
            pl: 'Dobra strona nie istnieje po to, żeby wyglądać nowocześnie. Ma porządkować przekaz, prowadzić użytkownika i wzmacniać wiarygodność. Jeśli jest tylko dekoracją, to nie działa.',
            en: 'A good website does not exist just to look modern. It should organize the message, guide the user and reinforce credibility. If it is only decoration, it does not work.',
          },
        },
        {
          title: {
            pl: 'Content bez systemu to chaos',
            en: 'Content without a system is chaos',
          },
          body: {
            pl: 'Wrzucanie przypadkowych postów nie buduje rozpoznawalności. Potrzebujesz zasad, powtarzalnych formatów i logicznego rytmu publikacji. Inaczej tworzysz tylko szum.',
            en: 'Posting random content does not build recognition. You need rules, repeatable formats and a logical publishing rhythm. Otherwise you are just creating noise.',
          },
        },
      ],
      summary: {
        pl: 'Spójna marka to efekt decyzji, a nie przypadku. Branding, strona i content muszą pracować razem, bo osobno są tylko luźnymi częściami bez większego znaczenia.',
        en: 'A coherent brand is the result of decisions, not accidents. Branding, website and content have to work together, because separately they are just loose parts without much meaning.',
      },
    },
  },
  {
    slug: {
      pl: '5-bledow-przez-ktore-strona-firmy-wyglada-tanio',
      en: '5-mistakes-that-make-a-company-website-look-cheap',
    },
    title: {
      pl: '5 błędów, przez które strona firmy wygląda tanio',
      en: '5 mistakes that make a company website look cheap',
    },
    excerpt: {
      pl: 'Źle dobrane spacingi, przypadkowe fonty, brak hierarchii i zbyt dużo efektów. Klasyczny zestaw zbrodni.',
      en: 'Poor spacing, random fonts, no hierarchy and too many effects. The classic set of design crimes.',
    },
    category: {
      pl: 'Web Design',
      en: 'Web Design',
    },
    publishedAt: '2026-03-26',
    readTime: {
      pl: '4 min czytania',
      en: '4 min read',
    },
    content: {
      intro: {
        pl: 'Tanio wyglądająca strona rzadko wynika z jednego wielkiego błędu. Zwykle to suma małych, głupich decyzji, które razem psują odbiór całości.',
        en: 'A cheap-looking website rarely comes from one huge mistake. Usually it is the sum of small, stupid decisions that together ruin the overall impression.',
      },
      sections: [
        {
          title: {
            pl: 'Brak hierarchii',
            en: 'Lack of hierarchy',
          },
          body: {
            pl: 'Jeśli wszystko na stronie krzyczy tak samo, użytkownik nie wie, na co patrzeć. Hierarchia treści to podstawa.',
            en: 'If everything on the page screams equally loud, the user does not know where to look. Content hierarchy is the foundation.',
          },
        },
        {
          title: {
            pl: 'Przypadkowa typografia',
            en: 'Random typography',
          },
          body: {
            pl: 'Losowe fonty i niespójne rozmiary tekstu rozwalają odbiór marki szybciej, niż ludziom się wydaje.',
            en: 'Random fonts and inconsistent text sizes destroy brand perception faster than most people think.',
          },
        },
        {
          title: {
            pl: 'Za dużo efektów',
            en: 'Too many effects',
          },
          body: {
            pl: 'Gradient na gradiencie, blur na blurze, animacja na animacji. To nie robi premium. To robi bałagan.',
            en: 'Gradient on gradient, blur on blur, animation on animation. That does not feel premium. It feels messy.',
          },
        },
      ],
      summary: {
        pl: 'Profesjonalny wygląd strony bierze się z dyscypliny i decyzji, nie z dokładania kolejnych ozdobników.',
        en: 'A professional-looking website comes from discipline and decisions, not from stacking more decorative nonsense.',
      },
    },
  },
  {
    slug: {
      pl: 'dlaczego-samo-ladne-logo-nic-nie-daje',
      en: 'why-a-pretty-logo-alone-does-nothing',
    },
    title: {
      pl: 'Dlaczego samo ładne logo nic nie daje',
      en: 'Why a pretty logo alone does nothing',
    },
    excerpt: {
      pl: 'Logo bez systemu wizualnego, tonu komunikacji i sensownego wdrożenia to tylko obrazek. Nic więcej.',
      en: 'A logo without a visual system, a tone of voice and sensible implementation is just an image. Nothing more.',
    },
    category: {
      pl: 'Design',
      en: 'Design',
    },
    publishedAt: '2026-03-21',
    readTime: {
      pl: '5 min czytania',
      en: '5 min read',
    },
    content: {
      intro: {
        pl: 'Ludzie przeceniają logo, bo jest najłatwiejsze do pokazania. Problem w tym, że sama sygnetka nie uratuje martwej komunikacji.',
        en: 'People overvalue the logo because it is the easiest thing to show. The problem is that a symbol alone will not save dead communication.',
      },
      sections: [
        {
          title: {
            pl: 'Logo nie zastąpi strategii',
            en: 'A logo does not replace strategy',
          },
          body: {
            pl: 'Bez sensownego kierunku marka dalej będzie nijaka, nawet jeśli sam znak wygląda estetycznie.',
            en: 'Without a sensible direction, the brand will still feel bland even if the mark itself looks aesthetic.',
          },
        },
        {
          title: {
            pl: 'Wdrożenie jest ważniejsze niż render',
            en: 'Implementation matters more than the render',
          },
          body: {
            pl: 'To, jak logo działa na stronie, socialach i materiałach sprzedażowych, ma większe znaczenie niż sam plik na Behance.',
            en: 'How the logo works on the website, social media and sales materials matters more than the nice file sitting on Behance.',
          },
        },
      ],
      summary: {
        pl: 'Ładne logo jest miłym dodatkiem. System marki jest tym, co faktycznie robi robotę.',
        en: 'A pretty logo is a nice extra. The brand system is what actually does the job.',
      },
    },
  },
  {
    slug: {
      pl: 'social-content-ktory-nie-wyglada-jak-robiony-na-kolanie',
      en: 'social-content-that-does-not-look-thrown-together',
    },
    title: {
      pl: 'Social content, który nie wygląda jak robiony na kolanie',
      en: 'Social content that does not look thrown together',
    },
    excerpt: {
      pl: 'Dobry content nie polega na wrzucaniu byle czego. Musi mieć rytm, spójność i konkretny cel.',
      en: 'Good content is not about posting random stuff. It needs rhythm, consistency and a clear purpose.',
    },
    category: {
      pl: 'Content',
      en: 'Content',
    },
    publishedAt: '2026-03-18',
    readTime: {
      pl: '3 min czytania',
      en: '3 min read',
    },
    content: {
      intro: {
        pl: 'Problem z większością social contentu jest prosty - wygląda jak improwizacja bez planu.',
        en: 'The problem with most social content is simple - it looks like improvisation without a plan.',
      },
      sections: [
        {
          title: {
            pl: 'Formaty dają porządek',
            en: 'Formats create order',
          },
          body: {
            pl: 'Stałe formaty upraszczają produkcję i poprawiają spójność komunikacji.',
            en: 'Consistent formats simplify production and improve communication consistency.',
          },
        },
        {
          title: {
            pl: 'Cel ważniejszy niż częstotliwość',
            en: 'Purpose matters more than frequency',
          },
          body: {
            pl: 'Lepiej publikować rzadziej i sensownie niż często i bez żadnej wartości.',
            en: 'It is better to publish less often but with purpose than frequently without any value.',
          },
        },
      ],
      summary: {
        pl: 'Dobry content to nie kwestia ilości. To kwestia systemu i celu.',
        en: 'Good content is not about quantity. It is about system and purpose.',
      },
    },
  },
  {
    slug: {
      pl: 'jak-dobra-strona-pomaga-sprzedawac-uslugi',
      en: 'how-a-good-website-helps-sell-services',
    },
    title: {
      pl: 'Jak dobra strona pomaga sprzedawać usługi',
      en: 'How a good website helps sell services',
    },
    excerpt: {
      pl: 'Nie chodzi o to, żeby była “ładna”. Ma budować zaufanie, prowadzić użytkownika i zamykać kontakt.',
      en: 'It is not about being “pretty”. It has to build trust, guide the user and help close contact.',
    },
    category: {
      pl: 'Strategy',
      en: 'Strategy',
    },
    publishedAt: '2026-03-14',
    readTime: {
      pl: '7 min czytania',
      en: '7 min read',
    },
    content: {
      intro: {
        pl: 'Strona usługowa nie jest ozdobą. To narzędzie sprzedażowe. Jak nie sprzedaje, to nie działa.',
        en: 'A service website is not decoration. It is a sales tool. If it does not sell, it does not work.',
      },
      sections: [
        {
          title: {
            pl: 'Zaufanie przed kontaktem',
            en: 'Trust before contact',
          },
          body: {
            pl: 'Użytkownik najpierw ocenia, czy wyglądasz wiarygodnie. Dopiero potem myśli o współpracy.',
            en: 'The user first decides whether you look credible. Only then do they think about working with you.',
          },
        },
        {
          title: {
            pl: 'Mniej tarcia, więcej decyzji',
            en: 'Less friction, more decisions',
          },
          body: {
            pl: 'Dobra strona prowadzi człowieka krok po kroku. Nie zmusza go do zgadywania, co zrobić dalej.',
            en: 'A good website guides people step by step. It does not force them to guess what to do next.',
          },
        },
      ],
      summary: {
        pl: 'Strona ma pomagać domykać decyzję, a nie tylko dobrze wyglądać na screenach.',
        en: 'A website should help close decisions, not just look good in screenshots.',
      },
    },
  },
  {
    slug: {
      pl: 'wideo-reklamowe-bez-kiczu-co-naprawde-robi-roznice',
      en: 'advertising-video-without-kitsch-what-really-makes-the-difference',
    },
    title: {
      pl: 'Wideo reklamowe bez kiczu - co naprawdę robi różnicę',
      en: 'Advertising video without kitsch - what really makes the difference',
    },
    excerpt: {
      pl: 'Kadry, światło, pacing i montaż. Efekt premium bierze się z decyzji, a nie z przypadkowego LUT-a.',
      en: 'Framing, light, pacing and editing. A premium effect comes from decisions, not from a random LUT.',
    },
    category: {
      pl: 'Video',
      en: 'Video',
    },
    publishedAt: '2026-03-10',
    readTime: {
      pl: '5 min czytania',
      en: '5 min read',
    },
    content: {
      intro: {
        pl: 'Kicz w wideo nie bierze się z kamery. Bierze się z braku smaku, celu i kontroli nad materiałem.',
        en: 'Kitsch in video does not come from the camera. It comes from lack of taste, lack of purpose and lack of control over the material.',
      },
      sections: [
        {
          title: {
            pl: 'Montaż buduje odbiór',
            en: 'Editing shapes perception',
          },
          body: {
            pl: 'Nawet dobre ujęcia można zabić złym tempem i bezsensownym układem scen.',
            en: 'Even good shots can be ruined by bad pacing and a senseless scene structure.',
          },
        },
        {
          title: {
            pl: 'Światło robi klimat',
            en: 'Lighting creates atmosphere',
          },
          body: {
            pl: 'Bez kontroli światła premium zamienia się w przypadkową estetykę.',
            en: 'Without control over light, premium turns into accidental aesthetics.',
          },
        },
      ],
      summary: {
        pl: 'Dobry film reklamowy to wynik świadomych decyzji. Nie presetów i nie magii w postprodukcji.',
        en: 'A good advertising film is the result of deliberate decisions. Not presets and not post-production magic.',
      },
    },
  },
  {
    slug: {
      pl: 'po-czym-poznac-ze-marka-nie-ma-zadnego-kierunku',
      en: 'how-to-tell-that-a-brand-has-no-direction',
    },
    title: {
      pl: 'Po czym poznać, że marka nie ma żadnego kierunku',
      en: 'How to tell that a brand has no direction',
    },
    excerpt: {
      pl: 'Raz mówi premium, raz memami, raz korpomową. Efekt jest prosty - nikt nie wie, kim oni właściwie są.',
      en: 'One day it speaks premium, another day in memes, another day in corporate language. The result is simple - nobody knows who they really are.',
    },
    category: {
      pl: 'Brand Strategy',
      en: 'Brand Strategy',
    },
    publishedAt: '2026-03-05',
    readTime: {
      pl: '4 min czytania',
      en: '4 min read',
    },
    content: {
      intro: {
        pl: 'Brak kierunku w marce nie zawsze widać od razu. Ale bardzo szybko czuć, że coś się nie klei.',
        en: 'A lack of direction in a brand is not always visible immediately. But you can feel very quickly that something is off.',
      },
      sections: [
        {
          title: {
            pl: 'Sprzeczny ton komunikacji',
            en: 'Conflicting tone of voice',
          },
          body: {
            pl: 'Jeśli marka dziś brzmi jak kancelaria, jutro jak memiczny profil, a pojutrze jak startupowy pitch deck, to nie ma tożsamości.',
            en: 'If the brand sounds like a law firm today, a meme page tomorrow and a startup pitch deck the day after, it has no identity.',
          },
        },
        {
          title: {
            pl: 'Brak wspólnych zasad',
            en: 'No shared rules',
          },
          body: {
            pl: 'Bez zasad każdy materiał wygląda inaczej i komunikuje coś innego.',
            en: 'Without rules, every asset looks different and communicates something else.',
          },
        },
      ],
      summary: {
        pl: 'Kierunek marki nie jest dodatkiem. To fundament, bez którego wszystko się rozjeżdża.',
        en: 'Brand direction is not an extra. It is the foundation without which everything falls apart.',
      },
    },
  },
];

export const featuredBlogPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

export const blogCategories = [
  { key: 'all', label: { pl: 'Wszystkie', en: 'All' } },
  { key: 'branding', label: { pl: 'Branding', en: 'Branding' } },
  { key: 'web-design', label: { pl: 'Web Design', en: 'Web Design' } },
  { key: 'design', label: { pl: 'Design', en: 'Design' } },
  { key: 'content', label: { pl: 'Content', en: 'Content' } },
  { key: 'strategy', label: { pl: 'Strategy', en: 'Strategy' } },
  { key: 'video', label: { pl: 'Video', en: 'Video' } },
  { key: 'brand-strategy', label: { pl: 'Brand Strategy', en: 'Brand Strategy' } },
] as const;

export { getLocalizedValue };

export function getBlogPostBySlug(slug: string, locale: Locale) {
  return blogPosts.find((post) => {
    const localizedSlug = post.slug[locale] ?? post.slug.pl;
    return localizedSlug === slug;
  });
}

export function getBlogPostAvailableLocales(post: BlogPost): Locale[] {
  return getAvailableLocalesFromSlug(post.slug);
}

export function formatBlogPostDate(date: string, locale: string = 'pl-PL') {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}
