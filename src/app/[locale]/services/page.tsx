import { Container } from '@/components/ui/Container';

const services = [
  {
    name: 'Video Production',
    description:
      'Tworzymy materiały wideo do kampanii, social mediów, marek osobistych i firm. Od pomysłu, przez nagrania, po montaż i finalne eksporty.',
    deliverables: ['Creative concept', 'Shooting', 'Editing', 'Short-form content'],
  },
  {
    name: 'Photography',
    description:
      'Zdjęcia wizerunkowe, lifestyle, backstage, produktowe i contentowe. Takie, które budują odbiór marki, a nie wyglądają jak stock.',
    deliverables: ['Portraits', 'Brand photography', 'Product shots', 'Social assets'],
  },
  {
    name: 'Web Design & Development',
    description:
      'Projektujemy i wdrażamy strony, które mają wyglądać dobrze, ale przede wszystkim prowadzić użytkownika i wzmacniać zaufanie do marki.',
    deliverables: ['Landing pages', 'Company websites', 'UX structure', 'Development'],
  },
  {
    name: 'Brand Direction',
    description:
      'Pomagamy poukładać kierunek wizualny i komunikacyjny marki, żeby całość była spójna i nie rozjeżdżała się między kanałami.',
    deliverables: ['Visual direction', 'Creative strategy', 'Brand consistency', 'Tone alignment'],
  },
  {
    name: 'Social Content',
    description:
      'Budujemy spójne formaty contentowe pod social media, kampanie i bieżącą komunikację. Bez wrzucania byle czego na pałę.',
    deliverables: ['Content formats', 'Post systems', 'Reels direction', 'Campaign assets'],
  },
  {
    name: 'Creative Support',
    description:
      'Jeśli potrzebujesz kogoś, kto ogarnie mix brandingu, strony, contentu i wizualnej komunikacji, to właśnie tu wchodzimy.',
    deliverables: [
      'Art direction',
      'Creative consulting',
      'Launch support',
      'Cross-channel assets',
    ],
  },
];

const processSteps = [
  {
    title: '01. Discovery',
    text: 'Najpierw ustalamy, co naprawdę trzeba zrobić. Bez tego większość projektów kończy jako chaotyczny zlepek życzeń.',
  },
  {
    title: '02. Direction',
    text: 'Budujemy kierunek kreatywny, strukturę i priorytety. Tu odcinamy rzeczy zbędne i zostawiamy to, co ma sens.',
  },
  {
    title: '03. Production',
    text: 'Wchodzimy w realizację - projekt, nagrania, zdjęcia, wdrożenie albo content. Zależnie od zakresu projektu.',
  },
  {
    title: '04. Delivery',
    text: 'Dostarczamy finalne materiały i dopinamy całość tak, żeby projekt nie kończył się na ładnym screenshocie.',
  },
];

const benefits = [
  'Spójny kierunek wizualny i komunikacyjny',
  'Realne wsparcie od pomysłu do wdrożenia',
  'Materiały dopasowane do marki i celu',
  'Mniej chaosu, więcej sensownych decyzji',
];

export default async function ServicesPage() {
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
            Services
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Usługi, które pomagają
            <br />
            marce wyglądać i działać lepiej.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Robimy strony, branding, content, zdjęcia i wideo. Nie jako losowe usługi wrzucone do
            jednego worka, tylko jako spójny system, który ma sens dla marki.
          </p>
        </div>

        <div className="mb-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              <span>What we do</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>Creative services</span>
            </div>

            <h2 className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">
              Strategia, wykonanie i dowiezienie bez dekoracyjnego syfu.
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Jeśli marka ma wyglądać dobrze tylko na screenie, to można robić byle co. Jeśli ma
              działać w realnym świecie, trzeba ogarnąć kierunek, komunikację i jakość wykonania.
            </p>

            <div className="flex flex-wrap gap-3">
              {benefits.map((item) => (
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
                Service scope
              </span>

              <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">
                Ten blok później możesz zamienić na reel, mockup, grafikę, video cover albo
                dynamiczny highlight najważniejszej usługi.
              </p>
            </div>
          </article>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <h2 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                {service.name}
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-slate-400 md:text-base">
                {service.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
              Jak wygląda współpraca
            </h2>
            <p className="text-base leading-relaxed text-slate-400 md:text-lg">
              Bez procesu projekty zwykle zamieniają się w festiwal zmian, domysłów i przypadkowych
              decyzji. Dlatego najpierw porządek, potem realizacja.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 md:text-base">{step.text}</p>
              </article>
            ))}
          </div>
        </div>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-300">
            Let&apos;s build something
          </span>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">
            Masz projekt, markę albo pomysł do ogarnięcia?
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Jeśli chcesz zrobić to porządnie, a nie tylko szybko i byle jak, to tu jest miejsce na
            start.
          </p>
        </article>
      </Container>
    </section>
  );
}
