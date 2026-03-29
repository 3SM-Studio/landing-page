import { Container } from '@/components/ui/Container';

const featuredPost = {
  title: 'Jak budujemy marki, które nie wyglądają jak każdy inny śmieć na rynku',
  excerpt:
    'Branding, content i strona internetowa muszą mówić jednym głosem. Inaczej robisz chaos, a nie markę.',
  category: 'Branding',
  date: '29 Mar 2026',
  readTime: '6 min czytania',
};

const posts = [
  {
    title: '5 błędów, przez które strona firmy wygląda tanio',
    excerpt:
      'Źle dobrane spacingi, przypadkowe fonty, brak hierarchii i zbyt dużo efektów. Klasyczny zestaw zbrodni.',
    category: 'Web Design',
    date: '26 Mar 2026',
    readTime: '4 min czytania',
  },
  {
    title: 'Dlaczego samo ładne logo nic nie daje',
    excerpt:
      'Logo bez systemu wizualnego, tonu komunikacji i sensownego wdrożenia to tylko obrazek. Nic więcej.',
    category: 'Design',
    date: '21 Mar 2026',
    readTime: '5 min czytania',
  },
  {
    title: 'Social content, który nie wygląda jak robiony na kolanie',
    excerpt:
      'Dobry content nie polega na wrzucaniu byle czego. Musi mieć rytm, spójność i konkretny cel.',
    category: 'Content',
    date: '18 Mar 2026',
    readTime: '3 min czytania',
  },
  {
    title: 'Jak dobra strona pomaga sprzedawać usługi',
    excerpt:
      'Nie chodzi o to, żeby była “ładna”. Ma budować zaufanie, prowadzić użytkownika i zamykać kontakt.',
    category: 'Strategy',
    date: '14 Mar 2026',
    readTime: '7 min czytania',
  },
  {
    title: 'Wideo reklamowe bez kiczu - co naprawdę robi różnicę',
    excerpt:
      'Kadry, światło, pacing i montaż. Efekt premium bierze się z decyzji, a nie z przypadkowego LUT-a.',
    category: 'Video',
    date: '10 Mar 2026',
    readTime: '5 min czytania',
  },
  {
    title: 'Po czym poznać, że marka nie ma żadnego kierunku',
    excerpt:
      'Raz mówi premium, raz memami, raz korpomową. Efekt jest prosty - nikt nie wie, kim oni właściwie są.',
    category: 'Brand Strategy',
    date: '05 Mar 2026',
    readTime: '4 min czytania',
  },
];

const categories = [
  'Wszystkie',
  'Branding',
  'Web Design',
  'Design',
  'Content',
  'Strategy',
  'Video',
];

export default async function BlogPage() {
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
            Blog
          </div>

          <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Insights, proces, design i rzeczy,
            <br />
            które naprawdę mają znaczenie.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Pisujemy o brandingu, stronach internetowych, contentcie i o tym, jak budować marki bez
            plastikowego marketingowego bełkotu.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category, index) => (
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
                <span>{featuredPost.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{featuredPost.date}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{featuredPost.readTime}</span>
              </div>

              <h2 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                {featuredPost.title}
              </h2>

              <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex h-full min-h-[220px] items-end rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-6">
              <div>
                <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                  Featured post
                </span>

                <p className="text-sm leading-relaxed text-slate-300">
                  Ten blok może później być miniaturą z CMS, coverem albo wyróżnionym visualem
                  posta.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={`${post.title}-${post.date}`}
              className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span>{post.date}</span>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
                {post.title}
              </h3>

              <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-400 md:text-base">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-slate-500">{post.readTime}</span>

                <span className="text-sm font-semibold text-white transition group-hover:text-sky-300">
                  Czytaj więcej
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
