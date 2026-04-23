import type { LegalDocumentEntry } from '@/entities/legal-document/model/legal-document.types';

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

function getCopy(locale: 'pl' | 'en') {
  if (locale === 'pl') {
    return {
      effectiveDate: 'Data wejścia w życie',
      version: 'Wersja',
    };
  }

  return {
    effectiveDate: 'Effective date',
    version: 'Version',
  };
}

export function LegalDocumentHeader({ entry }: { entry: LegalDocumentEntry }) {
  const copy = getCopy(entry.locale);

  return (
    <header className="border-b border-[#d5d4d1] px-0 py-0 lg:px-10 xl:px-12">
      <div className="max-w-[760px] py-6 md:py-8 lg:py-10">
        <h1 className="text-[32px] font-extrabold leading-[40px] tracking-[-0.03em] text-[#221f1f] md:text-[40px] md:leading-[50px]">
          {entry.title}
        </h1>

        {entry.summary ? (
          <p className="mt-4 max-w-[690px] text-[16px] leading-6 text-[#4c4948]">{entry.summary}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14px] leading-[21px] text-[#6b6b6b]">
          <p>
            <span className="font-semibold text-[#221f1f]">{copy.effectiveDate}:</span>{' '}
            {formatDate(entry.effectiveDate, entry.locale)}
          </p>
          <p>
            <span className="font-semibold text-[#221f1f]">{copy.version}:</span>{' '}
            {entry.versionLabel}
          </p>
        </div>
      </div>
    </header>
  );
}
