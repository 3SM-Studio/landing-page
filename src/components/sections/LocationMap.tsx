import type { Locale } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';

type Props = {
  locale: Locale;
};

function buildMapQuery() {
  if (!siteConfig.address) {
    return '';
  }

  const parts = [
    siteConfig.address.addressLocality,
    siteConfig.address.addressRegion,
    siteConfig.address.addressCountry,
  ].filter(Boolean);

  return parts.join(', ');
}

export function LocationMap({ locale }: Props) {
  const query = buildMapQuery();

  if (!query) {
    return null;
  }

  const encodedQuery = encodeURIComponent(query);
  const embedSrc = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  return (
    <div className="glass-card-premium overflow-hidden rounded-[40px] border border-white/10">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          title={
            locale === 'pl' ? 'Lokalizacja 3SM Studio' : '3SM Studio location'
          }
          src={embedSrc}
          className="h-full w-full border-0 grayscale contrast-125 brightness-75"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-0 bg-slate-950/25 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan">
            {locale === 'pl' ? 'Lokalizacja' : 'Location'}
          </p>
          <p className="mt-2 text-sm text-slate-400">{query}</p>
        </div>

        <a
          href={mapsHref}
          target="_blank"
          rel="noreferrer"
          className="secondary-cta rounded-2xl border border-white/12 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-3sm-cyan/50 hover:text-3sm-cyan"
        >
          {locale === 'pl' ? 'Otwórz mapę' : 'Open map'}
        </a>
      </div>
    </div>
  );
}
