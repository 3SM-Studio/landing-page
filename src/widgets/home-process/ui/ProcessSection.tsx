import { useTranslations } from 'next-intl';
import { Container } from '@/shared/ui/Container';

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  featured?: boolean;
};

export function ProcessSection() {
  const t = useTranslations('ProcessSection');
  const processSteps = t.raw('steps') as ProcessStep[];

  return (
    <section id="process" className="relative py-40">
      <Container>
        <div className="mb-32 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
            {t('eyebrow')}
          </span>

          <h2 className="mb-8 text-5xl font-bold tracking-tight text-white md:text-6xl">
            {t('title')}
          </h2>

          <p className="mx-auto max-w-2xl text-xl font-medium text-slate-400">{t('description')}</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-12 hidden h-px w-full bg-linear-to-r from-transparent via-sky-500/30 to-transparent lg:block" />

          <div className="absolute left-1/2 top-12 hidden h-px w-32 -translate-x-1/2 bg-linear-to-r from-transparent via-3sm-cyan/60 to-transparent blur-sm lg:block" />

          <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step) => {
              const featured = step.featured === true;

              return (
                <div key={step.number} className="group flex flex-col items-center text-center">
                  <div
                    className={[
                      'mb-10 flex items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-110',
                      featured
                        ? 'relative -mt-2 h-28 w-28 border-white/20 bg-linear-to-br from-3sm-cyan to-3sm-teal text-white shadow-xl shadow-sky-500/40'
                        : 'glass-card-premium h-24 w-24 border-white/10 bg-slate-800/50 text-white',
                    ].join(' ')}
                  >
                    {featured ? (
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)]" />
                    ) : null}

                    <span
                      className={[
                        'relative z-10 font-display font-black',
                        featured ? 'text-4xl' : 'text-3xl',
                      ].join(' ')}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h4
                    className={[
                      'mb-4 font-bold',
                      featured ? 'text-2xl text-3sm-cyan' : 'text-xl text-white',
                    ].join(' ')}
                  >
                    {step.title}
                  </h4>

                  <p
                    className={[
                      'px-4 leading-relaxed',
                      featured
                        ? 'text-sm font-bold text-slate-200'
                        : 'text-[13px] font-medium text-slate-400',
                    ].join(' ')}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
