import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/shared/i18n/routing';
import { brandConfig } from '@/shared/config/brand/brand.config';
import { isExternalHref, resolveCmsHref, routes } from '@/shared/lib/routes';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';

type ContactSectionProps = {
  locale: Locale;
  content?: {
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    primaryCta?: string;
    primaryHref?: string;
    primaryOpenInNewTab?: boolean;
    secondaryCta?: string;
    secondaryHref?: string;
    secondaryOpenInNewTab?: boolean;
  };
};

export function ContactSection({ locale, content }: ContactSectionProps) {
  const t = useTranslations('ContactSection');
  const primaryHref = resolveCmsHref(
    content?.primaryHref || brandConfig.href.email,
    locale,
    routes.contact,
  );
  const secondaryHref = resolveCmsHref(
    content?.secondaryHref || brandConfig.href.phone,
    locale,
    routes.contact,
  );

  return (
    <section id="contact" className="py-40">
      <Container className="max-w-6xl">
        <div className="glass-card-premium relative overflow-hidden rounded-[80px] border border-white/10 p-12 text-center md:p-32">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-sky-500/10 via-transparent to-teal-500/10" />
          <div className="motif-3-luxe left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            3
          </div>

          <h2 className="mb-14 text-5xl font-black leading-[0.85] tracking-tight text-white md:text-[92px]">
            {content?.titleLine1 || t('titleLine1')}
            <br />
            {content?.titleLine2 || t('titleLine2')}
          </h2>

          <p className="mx-auto mb-20 max-w-3xl text-2xl font-medium leading-relaxed text-slate-400">
            {content?.description || t('description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
            <Button asChild variant="primary" size="lg" className="w-full md:w-auto">
              {content?.primaryOpenInNewTab || isExternalHref(primaryHref) ? (
                <a
                  href={primaryHref}
                  target={content?.primaryOpenInNewTab ? '_blank' : undefined}
                  rel={content?.primaryOpenInNewTab ? 'noreferrer' : undefined}
                >
                  {content?.primaryCta || t('primaryCta')}
                </a>
              ) : (
                <Link href={primaryHref}>{content?.primaryCta || t('primaryCta')}</Link>
              )}
            </Button>

            <Button asChild variant="glossy" size="lg" className="w-full md:w-auto">
              {content?.secondaryOpenInNewTab || isExternalHref(secondaryHref) ? (
                <a
                  href={secondaryHref}
                  target={content?.secondaryOpenInNewTab ? '_blank' : undefined}
                  rel={content?.secondaryOpenInNewTab ? 'noreferrer' : undefined}
                >
                  {content?.secondaryCta || t('secondaryCta')}
                </a>
              ) : (
                <Link href={secondaryHref}>{content?.secondaryCta || t('secondaryCta')}</Link>
              )}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
