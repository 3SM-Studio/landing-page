import { Container } from '@/components/ui/Container';
import { studioStats } from '@/lib/data/site-content';

const statAccentMap = {
  cyan: 'text-3sm-cyan',
  'cyan-strong': 'text-3sm-cyan',
  teal: 'text-3sm-teal',
  white: 'text-white',
} as const;

export function StudioSection() {
  return (
    <section id="studio" className="relative px-6 py-40">
      <Container>
        <div className="glass-card-premium rounded-[72px] border border-white/5 p-12 md:p-24">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="relative z-10 lg:w-1/2">
              <h2 className="mb-10 text-5xl font-bold leading-[1.1] tracking-tight text-white">
                A Merger of Fluid Story <br />
                and Rigid Logic.
              </h2>

              <p className="mb-10 text-xl font-medium leading-relaxed text-slate-400">
                3SM was founded to bridge the gap between creative impulse and technical precision.
                We don&apos;t just deliver assets - we engineer the visual future.
              </p>

              <p className="rounded-r-3xl border-l-4 border-3sm-cyan bg-sky-900/20 py-4 pl-10 text-xl italic font-medium leading-relaxed text-white/90">
                &quot;We function as a laboratory for premium perception. Our goal is to make every
                brand we touch feel inevitable.&quot;
              </p>
            </div>

            <div className="relative z-10 lg:w-1/2">
              <div className="grid grid-cols-2 gap-8">
                {studioStats.map((stat) => (
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
