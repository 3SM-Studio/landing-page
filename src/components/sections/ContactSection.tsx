import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-40">
      <Container className="max-w-6xl">
        <div className="glass-card-premium relative overflow-hidden rounded-[80px] border border-white/10 p-12 text-center md:p-32">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/10 via-transparent to-teal-500/10" />
          <div className="motif-3-luxe left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            3
          </div>

          <h2 className="mb-14 text-5xl font-black leading-[0.85] tracking-tight text-white md:text-[92px]">
            Ready to build <br />
            the future?
          </h2>

          <p className="mx-auto mb-20 max-w-3xl text-2xl font-medium leading-relaxed text-slate-400">
            Our studio schedule for late 2026 is currently open for visionary partners. Let&apos;s
            create something timeless.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
            <Button asChild variant="primary" size="lg" className="w-full md:w-auto">
              <a href="mailto:hello@3sm.com">Secure Your Slot</a>
            </Button>

            <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
              <a href="tel:+1000000000">Call the Studio</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
