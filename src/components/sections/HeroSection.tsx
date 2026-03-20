import { Container } from '@/components/ui/Container';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="liquid-orb left-[-10%] top-[-20%] h-[700px] w-[700px] bg-sky-600" />
        <div className="liquid-orb bottom-[-10%] right-[-5%] h-[600px] w-[600px] bg-teal-600" />
        <div className="liquid-orb right-[10%] top-[30%] h-[500px] w-[500px] bg-indigo-900 opacity-20" />
      </div>

      <div className="motif-3-luxe -left-28 -top-12">3</div>

      <Container className="relative z-10 text-center">
        <div className="mx-auto mb-10 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-3sm-cyan glass-panel-luxe">
          <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
          Established 2026
        </div>

        <h1 className="mx-auto mb-12 max-w-6xl text-6xl font-black leading-[0.9] tracking-tight text-white md:text-[100px]">
          Luminous motion,
          <br />
          <span className="shimmer-text">image, design &amp; code.</span>
        </h1>

        <p className="mx-auto mb-16 max-w-4xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
          A 2026-native creative laboratory where cinematic vision meets advanced digital
          engineering. We build{' '}
          <span className="font-semibold text-3sm-cyan">high-performance legacies</span> through a
          unified premium workflow.
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Button asChild variant="primary" size="lg" className="w-full md:w-auto">
            <a href="#portfolio">View Portfolio</a>
          </Button>

          <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
            <a href="#services">Capabilities</a>
          </Button>
        </div>
      </Container>

      <div className="ambient-floor" />
    </section>
  );
}
