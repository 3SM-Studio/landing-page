import { Container } from '@/components/ui/Container';

const principles = [
  {
    title: 'Bez generycznego marketingu',
    text: 'Nie interesuje nas plastikowa komunikacja, która brzmi jak każda inna marka. Wolimy prosty, mocny przekaz i sensowny charakter.',
  },
  {
    title: 'Estetyka ma mieć cel',
    text: 'Ładny projekt bez funkcji to dekoracja. Każda decyzja wizualna powinna wspierać odbiór marki, a nie tylko dobrze wyglądać na screenie.',
  },
  {
    title: 'Lepiej mniej, ale lepiej',
    text: 'Nie pakujemy do projektu wszystkiego naraz. Wolimy mocny kierunek i porządek niż chaos przebrany za kreatywność.',
  },
  {
    title: 'Tworzenie ponad pozę',
    text: 'Liczy się efekt końcowy, nie napuszone gadanie o procesie. Robota ma być dowieziona i mieć poziom.',
  },
];

const capabilities = [
  'Brand direction',
  'Web design',
  'Development',
  'Photography',
  'Video production',
  'Creative strategy',
  'Social content',
  'Art direction',
];

const milestones = [
  {
    year: 'Start',
    title: 'Pomysł na studio',
    text: 'Z potrzeby tworzenia rzeczy po swojemu, bez cenzury stylu i bez wciskania się w bezpieczne, nudne ramy.',
  },
  {
    year: 'Etap 01',
    title: 'Budowanie kierunku',
    text: 'Łączenie brandingu, stron, contentu, zdjęć i wideo w jeden sensowny system zamiast kilku losowych usług.',
  },
  {
    year: 'Etap 02',
    title: 'Pierwsze realizacje',
    text: 'Testowanie procesu, stylu i sposobu komunikacji tak, żeby marka miała własny charakter, a nie wyglądała jak kopia innych.',
  },
  {
    year: 'Teraz',
    title: 'Rozwój 3SM',
    text: 'Budowanie studia, które łączy kreatywność, technologię i mocny kierunek wizualny w realne projekty dla ludzi i marek.',
  },
];

const team = [
  {
    name: '3SM',
    role: 'Creative studio',
    text: 'Tworzymy branding, strony, content, zdjęcia i wideo. Nie jako przypadkowy pakiet, tylko jako spójny system dla marki.',
  },
  {
    name: 'Direction',
    role: 'Way of thinking',
    text: 'Najpierw ustalamy, co ma sens. Potem dopiero projektujemy i produkujemy. Bez tego większość pracy to tylko drogi chaos.',
  },
  {
    name: 'Execution',
    role: 'Delivery',
    text: 'Lubimy rzeczy, które wyglądają dobrze i jednocześnie działają. Sam wygląd bez sensu biznesowego albo komunikacyjnego nic nie daje.',
  },
];

export default async function AboutPage() {
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
            About
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Tworzymy rzeczy, które mają
            <br />
            charakter, sens i poziom.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            3SM to studio kreatywne skupione na brandingu, stronach, contencie, zdjęciach i wideo.
            Nie interesuje nas nijakość. Interesuje nas mocny kierunek i robota, która coś realnie
            buduje.
          </p>
        </div>

        <div className="mb-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              <span>Who we are</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>Creative studio</span>
            </div>

            <h2 className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">
              Nie chcemy robić rzeczy poprawnych. Chcemy robić rzeczy mocne.
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Dla nas dobra marka, dobra strona albo dobry content nie polega na tym, że wszystko
              wygląda modnie. Polega na tym, że całość ma własny rytm, własny charakter i nie
              rozjeżdża się przy pierwszym kontakcie z odbiorcą.
            </p>

            <div className="flex flex-wrap gap-3">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="flex min-h-[260px] items-end rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8 md:p-10">
            <div>
              <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                Studio note
              </span>

              <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
                Ten blok później możesz podmienić na zdjęcie zespołu, manifest marki, reel, mockup
                albo krótki highlight o tym, jak działacie.
              </p>
            </div>
          </article>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h2 className="mb-4 text-xl font-bold text-white">{item.title}</h2>
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              Jak na to patrzymy
            </h2>
            <p className="text-base leading-relaxed text-slate-400 md:text-lg">
              Nie budujemy marki od losowych grafik. Nie zaczynamy strony od efektów. Najpierw
              kierunek, potem forma. Inaczej kończy się to ładnym chaosem.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {team.map((item) => (
              <article
                key={item.name}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300">
                  {item.role}
                </p>
                <h3 className="mb-4 text-2xl font-bold text-white">{item.name}</h3>
                <p className="text-sm leading-relaxed text-slate-400 md:text-base">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              Skąd to się bierze
            </h2>
            <p className="text-base leading-relaxed text-slate-400 md:text-lg">
              Każde sensowne studio zaczyna się od niezgody na przeciętność. Reszta to już kwestia
              konsekwencji, poziomu i dowożenia.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {milestones.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300">
                  {item.year}
                </p>
                <h3 className="mb-4 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 md:text-base">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-300">
            Build with us
          </span>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Jeśli chcesz zrobić coś z charakterem, to pogadajmy.
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Możesz mieć stronę, branding albo content, który wygląda poprawnie. Albo możesz mieć
            coś, co naprawdę zostawia ślad. My wolimy to drugie.
          </p>
        </article>
      </Container>
    </section>
  );
}
