import { PortableText } from 'next-sanity';
import { Container } from '@/shared/ui/Container';
import type { LegalDocumentEntry } from '@/entities/legal-document/model/legal-document.types';
import type { PublicSiteConfig } from '@/shared/config/site/site-config.public';
import { LegalEntityCard } from './LegalEntityCard';

type Props = {
  entry: LegalDocumentEntry;
  companyCard?: {
    name: string;
    address?: string;
    krs?: string;
    nip?: string;
    regon?: string;
    registrationNumber?: string;
    taxId?: string;
    vatId?: string;
    email?: string;
  };
};

function formatDate(date: string, locale: 'pl' | 'en') {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsed);
}

function formatAddress(address?: PublicSiteConfig['address']) {
  if (!address) {
    return undefined;
  }

  return [
    address.streetAddress,
    [address.postalCode, address.addressLocality].filter(Boolean).join(' '),
    address.addressRegion,
    address.addressCountry,
  ]
    .filter(Boolean)
    .join(', ');
}

function getCopy(locale: 'pl' | 'en') {
  if (locale === 'pl') {
    return {
      effectiveDate: 'Data wejścia w życie',
      version: 'Wersja',
      toc: 'Spis treści',
    };
  }

  return {
    effectiveDate: 'Effective date',
    version: 'Version',
    toc: 'Table of contents',
  };
}

export function LegalDocument({ entry, companyCard }: Props) {
  const copy = getCopy(entry.locale);
  const tocSections = entry.sections.filter((section) => section.showInTableOfContents);

  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="min-w-0">
          <header className="mb-10 border-b border-white/10 pb-6 md:mb-12 md:pb-8">
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              {entry.title}
            </h1>

            {entry.summary ? (
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{entry.summary}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <p>
                {copy.effectiveDate}: {formatDate(entry.effectiveDate, entry.locale)}
              </p>
              <p>
                {copy.version}: {entry.versionLabel}
              </p>
            </div>
          </header>

          {entry.showCompanyCard && companyCard ? (
            <LegalEntityCard
              locale={entry.locale}
              name={companyCard.name}
              address={companyCard.address}
              krs={companyCard.krs}
              nip={companyCard.nip}
              regon={companyCard.regon}
              registrationNumber={companyCard.registrationNumber}
              taxId={companyCard.taxId}
              vatId={companyCard.vatId}
              email={companyCard.email}
            />
          ) : null}

          <article className="space-y-10">
            {entry.sections.map((section) => (
              <section
                key={section.key}
                id={section.key}
                className="scroll-mt-32 border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
              >
                <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                  {section.title}
                </h2>
                <div className="prose prose-invert mt-5 max-w-none prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-a:text-3sm-cyan prose-li:text-slate-300">
                  <PortableText value={section.body} />
                </div>
              </section>
            ))}
          </article>
        </div>

        {entry.showTableOfContents && tocSections.length > 0 ? (
          <aside className="glass-card-premium top-28 rounded-3xl border border-white/10 p-6 lg:sticky">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-3sm-cyan">
              {copy.toc}
            </p>
            <nav>
              <ul className="space-y-3">
                {tocSections.map((section) => (
                  <li key={section.key}>
                    <a
                      href={`#${section.key}`}
                      className="text-sm leading-6 text-slate-300 transition-colors hover:text-white"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        ) : null}
      </div>
    </Container>
  );
}

export function buildLegalCompanyCard(siteConfig: PublicSiteConfig) {
  return {
    name: siteConfig.legalName || siteConfig.name,
    address: formatAddress(siteConfig.address),
    krs: siteConfig.company?.krs,
    nip: siteConfig.company?.nip,
    regon: siteConfig.company?.regon,
    registrationNumber: siteConfig.company?.registrationNumber,
    taxId: siteConfig.company?.taxId,
    vatId: siteConfig.company?.vatId,
    email: siteConfig.email,
  };
}
