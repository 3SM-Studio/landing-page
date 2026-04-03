import { useTranslations } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { PageTopSection } from '@/shared/ui/page-top-section/PageTopSection';
import { HeroScene } from '@/shared/ui/HeroScene';

export function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <PageTopSection className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroScene />

      <Container className="relative z-10 text-center">
        <div className="glass-panel-luxe mx-auto mb-10 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
          <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
          {t('badge')}
        </div>

        <h1 className="mx-auto mb-12 max-w-6xl text-6xl font-black leading-[0.9] tracking-tight text-white md:text-[100px]">
          {t('titleLine1')}
          <br />
          <span className="shimmer-text">{t('titleLine2')}</span>
        </h1>

        <p className="mx-auto mb-16 max-w-4xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
          {t('descriptionBefore')}{' '}
          <span className="font-semibold text-3sm-cyan">{t('descriptionAccent')}</span>{' '}
          {t('descriptionAfter')}
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Button asChild variant="primary" size="lg" className="w-full md:w-auto">
            <a href="#portfolio">{t('primaryCta')}</a>
          </Button>

          <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
            <a href="#services">{t('secondaryCta')}</a>
          </Button>
        </div>
      </Container>

      <div className="ambient-floor" />
    </PageTopSection>
  );
}
