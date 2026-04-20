import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/shared/i18n/routing';
import { isExternalHref, resolveCmsHref, routes } from '@/shared/lib/routes';
import { Container } from '@/shared/ui/Container';

const accentMap = {
  cyan: {
    text: 'text-3sm-cyan',
    dot: 'bg-3sm-cyan shadow-[0_0_10px_#38BDF8]',
    line: 'bg-3sm-cyan/30',
    lineHover: 'group-hover:bg-3sm-cyan',
    orb: 'bg-sky-500/20',
  },
  teal: {
    text: 'text-3sm-teal',
    dot: 'bg-3sm-teal shadow-[0_0_10px_rgba(45,212,191,0.45)]',
    line: 'bg-3sm-teal/30',
    lineHover: 'group-hover:bg-3sm-teal',
    orb: 'bg-teal-500/20',
  },
  indigo: {
    text: 'text-indigo-400',
    dot: 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.45)]',
    line: 'bg-indigo-400/30',
    lineHover: 'group-hover:bg-indigo-400',
    orb: 'bg-indigo-500/20',
  },
  white: {
    text: 'text-white',
    dot: 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)]',
    line: 'bg-white/30',
    lineHover: 'group-hover:bg-white',
    orb: 'bg-white/10',
  },
} as const;

type ServiceAccent = keyof typeof accentMap;

type ServiceItem = {
  eyebrow: string;
  title: string;
  description: string;
  size: 'large' | 'small';
  accent: ServiceAccent;
  items?: string[];
  cta?: string;
  href?: string;
};

type ServicesSectionProps = {
  locale: Locale;
  content?: {
    eyebrow?: string;
    title?: string;
    services?: ServiceItem[];
  };
};

export function ServicesSection({ locale, content }: ServicesSectionProps) {
  const t = useTranslations('ServicesSection');
  const services = content?.services || (t.raw('services') as ServiceItem[]);

  return (
    <section id="services" className="relative py-40">
      <Container>
        <div className="mb-24">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
            {content?.eyebrow || t('eyebrow')}
          </span>

          <h2 className="text-5xl font-bold tracking-tight text-white md:text-6xl">
            {content?.title || t('title')}
          </h2>

          <div className="mt-6 h-1 w-32 rounded-full bg-linear-to-r from-3sm-cyan to-3sm-teal shadow-[0_0_15px_rgba(56,189,248,0.4)]" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {services.map((service) => {
            const isLarge = service.size === 'large';
            const accent = accentMap[service.accent];
            const ctaHref = resolveCmsHref(service.href, locale, routes.services);

            return (
              <article
                key={service.title}
                className={[
                  'glass-card-premium group relative overflow-hidden rounded-[56px] border border-white/5',
                  isLarge
                    ? 'md:col-span-7 p-16'
                    : 'md:col-span-5 flex flex-col justify-between p-14',
                ].join(' ')}
              >
                {isLarge ? (
                  <div
                    className={`pointer-events-none absolute ${
                      service.accent === 'cyan' ? '-right-10 -top-10' : '-left-10 -bottom-10'
                    } h-80 w-80 rounded-full blur-[80px] ${accent.orb}`}
                  />
                ) : null}

                <div className="relative z-10">
                  <span className={`text-xs font-bold uppercase tracking-[0.3em] ${accent.text}`}>
                    {service.eyebrow}
                  </span>

                  <h3 className="mb-6 mt-4 text-3xl font-bold text-white md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="max-w-md text-lg leading-relaxed text-slate-400">
                    {service.description}
                  </p>

                  {service.items?.length ? (
                    <ul className="mt-12 space-y-5 text-sm font-bold text-slate-300">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-5">
                          <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {service.cta ? (
                    <div className="mt-12">
                      {isExternalHref(ctaHref) ? (
                        <a href={ctaHref} className={`text-cta group ${accent.text}`}>
                          {service.cta}
                          <span className={`text-cta-line ${accent.line} ${accent.lineHover}`} />
                        </a>
                      ) : (
                        <Link href={ctaHref} className={`text-cta group ${accent.text}`}>
                          {service.cta}
                          <span className={`text-cta-line ${accent.line} ${accent.lineHover}`} />
                        </Link>
                      )}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
