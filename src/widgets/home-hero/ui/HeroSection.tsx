import { useTranslations } from 'next-intl';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { PageTopSection } from '@/shared/ui/page-top-section/PageTopSection';

type HeroSectionProps = {
  content?: {
    badge?: string;
    titleLine1?: string;
    titleLine2?: string;
    descriptionBefore?: string;
    descriptionAccent?: string;
    descriptionAfter?: string;
    primaryCta?: string;
    primaryHref?: string;
    primaryOpenInNewTab?: boolean;
    secondaryCta?: string;
    secondaryHref?: string;
    secondaryOpenInNewTab?: boolean;
  };
};

export function HeroSection({ content }: HeroSectionProps) {
  const t = useTranslations('HeroSection');

  return (
    <PageTopSection className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none inset-0 -z-10 overflow-hidden">
        <div className="liquid-orb left-[-10%] top-[-20%] h-175 w-175 bg-sky-600" />
        <div className="liquid-orb bottom-[-10%] right-[-5%] h-150 w-150 bg-teal-600" />
        <div className="liquid-orb right-[10%] top-[30%] h-125 w-125 bg-indigo-900 opacity-20" />
      </div>

      <div className="motif-3-luxe -left-28 -top-12">3</div>

      <Container className="relative z-10 text-center">
        <div className="glass-panel-luxe mx-auto mb-10 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
          <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
          {content?.badge || t('badge')}
        </div>

        <h1 className="mx-auto mb-12 max-w-6xl text-6xl font-black leading-[0.9] tracking-tight text-white md:text-[100px]">
          {content?.titleLine1 || t('titleLine1')}
          <br />
          <span className="shimmer-text">{content?.titleLine2 || t('titleLine2')}</span>
        </h1>

        <p className="mx-auto mb-16 max-w-4xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
          {content?.descriptionBefore || t('descriptionBefore')}{' '}
          <span className="font-semibold text-3sm-cyan">
            {content?.descriptionAccent || t('descriptionAccent')}
          </span>{' '}
          {content?.descriptionAfter || t('descriptionAfter')}
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Button asChild variant="primary" size="lg" className="w-full md:w-auto">
            <a
              href={content?.primaryHref || '#portfolio'}
              target={content?.primaryOpenInNewTab ? '_blank' : undefined}
              rel={content?.primaryOpenInNewTab ? 'noreferrer' : undefined}
            >
              {content?.primaryCta || t('primaryCta')}
            </a>
          </Button>

          <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
            <a
              href={content?.secondaryHref || '#services'}
              target={content?.secondaryOpenInNewTab ? '_blank' : undefined}
              rel={content?.secondaryOpenInNewTab ? 'noreferrer' : undefined}
            >
              {content?.secondaryCta || t('secondaryCta')}
            </a>
          </Button>
        </div>
      </Container>

      <div className="ambient-floor" />
    </PageTopSection>
  );
}
