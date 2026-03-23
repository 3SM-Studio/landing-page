import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '../ui/Button';

type PortfolioItem = {
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  alt: string;
};

export function PortfolioSection() {
  const t = useTranslations('PortfolioSection');
  const portfolioItems = t.raw('items') as PortfolioItem[];

  return (
    <section id="portfolio" className="relative py-40">
      <Container>
        <div className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
              {t('eyebrow')}
            </span>

            <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
              {t('title')}
            </h2>
          </div>

          <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
            <a href="mailto:hello@3sm.com">{t('cta')}</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <article key={item.title} className="group cursor-pointer" aria-label={item.title}>
              <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-[56px] border border-white/10 shadow-2xl">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover opacity-80 transition-all duration-[2000ms] ease-out group-hover:scale-105 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-3sm-navy/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                <div
                  className={[
                    'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                    index % 2 === 0
                      ? 'bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_35%)]'
                      : 'bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_35%)]',
                  ].join(' ')}
                />

                <div className="absolute right-10 top-10">
                  <span className="glass-panel-luxe rounded-full border border-white/20 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-end p-14">
                  <div>
                    <h3 className="mb-2 text-4xl font-bold text-white">{item.title}</h3>

                    <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/80">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
