import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

const statAccentMap = {
  cyan: 'text-3sm-cyan',
  'cyan-strong': 'text-3sm-cyan',
  teal: 'text-3sm-teal',
  white: 'text-white',
} as const;

type StatAccent = keyof typeof statAccentMap;

type StudioStat = {
  value: string;
  label: string;
  accent: StatAccent;
};

export function StudioSection() {
  const t = useTranslations('StudioSection');
  const stats = t.raw('stats') as StudioStat[];

  return (
    <section id="studio" className="relative px-6 py-40">
      <Container>
        <div className="glass-card-premium rounded-[72px] border border-white/5 p-12 md:p-24">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="relative z-10 lg:w-1/2">
              <h2 className="mb-10 text-5xl font-bold leading-[1.1] tracking-tight text-white">
                {t('titleLine1')}
                <br />
                {t('titleLine2')}
              </h2>

              <p className="mb-10 text-xl font-medium leading-relaxed text-slate-400">
                {t('description')}
              </p>

              <p className="rounded-r-3xl border-l-4 border-3sm-cyan bg-sky-900/20 py-4 pl-10 text-xl italic font-medium leading-relaxed text-white/90">
                &quot;{t('quote')}&quot;
              </p>
            </div>

            <div className="relative z-10 lg:w-1/2">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-panel-luxe flex aspect-square flex-col items-center justify-center rounded-[40px] border border-white/10 p-8 text-center"
                  >
                    <span className={`text-5xl font-black ${statAccentMap[stat.accent]}`}>
                      {stat.value}
                    </span>

                    <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
