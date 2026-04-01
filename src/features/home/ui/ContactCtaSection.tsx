import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';

export function ContactSection() {
  const t = useTranslations('ContactSection');

  return (
    <section id="contact" className="py-40">
      <Container className="max-w-6xl">
        <div className="glass-card-premium relative overflow-hidden rounded-[80px] border border-white/10 p-12 text-center md:p-32">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-sky-500/10 via-transparent to-teal-500/10" />
          <div className="motif-3-luxe left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            3
          </div>

          <h2 className="mb-14 text-5xl font-black leading-[0.85] tracking-tight text-white md:text-[92px]">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h2>

          <p className="mx-auto mb-20 max-w-3xl text-2xl font-medium leading-relaxed text-slate-400">
            {t('description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
            <Button asChild variant="primary" size="lg" className="w-full md:w-auto">
              <a href="mailto:hello@3sm.com">{t('primaryCta')}</a>
            </Button>

            <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
              <a href="tel:+1000000000">{t('secondaryCta')}</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
