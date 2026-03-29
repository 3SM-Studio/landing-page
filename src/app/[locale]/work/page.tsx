import { Container } from '@/components/ui/Container';

const workCategories = [
  'Wszystkie',
  'Video',
  'Photography',
  'Websites',
  'Branding',
  'Social Content',
];

const featuredWork = {
  title: 'Creative work, które nie kończy się na "ładnym wyglądzie"',
  excerpt:
    'Tworzymy strony, content, branding i materiały wizualne, które mają robić robotę. Nie interesuje nas ozdobny syf bez celu.',
  category: 'Selected Work',
  year: '2026',
  services: ['Creative Direction', 'Video', 'Photography', 'Web Design'],
};

const selectedWorks = [
  {
    title: 'Kampania wideo dla marki lifestyle',
    category: 'Video',
    year: '2026',
    description:
      'Od koncepcji przez ujęcia po montaż. Materiał zrobiony tak, żeby wyglądał premium i nie przypominał generycznej reklamy z internetu.',
  },
  {
    title: 'Sesja zdjęciowa dla marki osobistej',
    category: 'Photography',
    year: '2026',
    description:
      'Portrety, backstage i materiały pod social media zaprojektowane jako spójny zestaw, a nie zbiór przypadkowych zdjęć.',
  },
  {
    title: 'Landing page dla usługi premium',
    category: 'Websites',
    year: '2026',
    description:
      'Strona zaprojektowana tak, żeby budować zaufanie, prowadzić użytkownika i sprzedawać bez tanich sztuczek.',
  },
  {
    title: 'System contentowy dla social mediów',
    category: 'Social Content',
    year: '2025',
    description:
      'Zamiast chaosu - zestaw layoutów, formatów i zasad komunikacji, które da się realnie utrzymać w czasie.',
  },
  {
    title: 'Identyfikacja wizualna dla projektu kreatywnego',
    category: 'Branding',
    year: '2025',
    description:
      'Logo, kierunek wizualny i podstawy systemu marki zrobione tak, żeby całość miała charakter, a nie tylko dekorację.',
  },
  {
    title: 'Materiały promocyjne dla eventu',
    category: 'Creative',
    year: '2025',
    description:
      'Key visual, grafiki i rollout contentu pod promocję wydarzenia, z naciskiem na spójność i czytelny przekaz.',
  },
];

const capabilities = [
  {
    title: 'Video Production',
    text: 'Koncepcja, nagrania, montaż i finalne materiały, które wyglądają jak przemyślany projekt, a nie przypadkowy zlepek ujęć.',
  },
  {
    title: 'Photography',
    text: 'Zdjęcia produktowe, lifestyle, portrety i content pod markę lub social media. Bez plastikowego efektu stocka.',
  },
  {
    title: 'Web Design',
    text: 'Landing pages i strony firmowe budujące zaufanie, porządek i sensowną ścieżkę kontaktu lub sprzedaży.',
  },
  {
    title: 'Brand Direction',
    text: 'Pomagamy ubrać markę w spójny kierunek wizualny i komunikacyjny, żeby nie mówiła pięcioma głosami naraz.',
  },
];

export default async function WorkPage() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-16 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-sky-300 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
            Work
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Wybrane realizacje,
            <br />
            formaty i rzeczy, które umiemy dowozić.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Wideo, zdjęcia, branding, strony i content. Wszystko po to, żeby marka wyglądała spójnie
            i nie sprawiała wrażenia sklejonej z pięciu różnych pomysłów.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {workCategories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={[
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                index === 0
                  ? 'border-sky-400/40 bg-sky-400/10 text-white'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {category}
            </button>
          ))}
        </div>

        <article className="group mb-14 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/7 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                <span>{featuredWork.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{featuredWork.year}</span>
              </div>

              <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                {featuredWork.title}
              </h2>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                {featuredWork.excerpt}
              </p>

              <div className="flex flex-wrap gap-3">
                {featuredWork.services.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
              <div>
                <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                  Featured work
                </span>

                <p className="text-sm leading-relaxed text-slate-300">
                  Ten blok później podmienisz na reel, mockup, cover projektu albo screenshot z
                  realizacji.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mb-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {selectedWorks.map((item) => (
            <article
              key={`${item.title}-${item.year}`}
              className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                <span>{item.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{item.year}</span>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                {item.title}
              </h3>

              <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                {item.description}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-slate-500">{item.category}</span>
                <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                  Zobacz projekt
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="mb-4 text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
