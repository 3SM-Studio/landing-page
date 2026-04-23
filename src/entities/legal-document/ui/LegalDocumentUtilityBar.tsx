'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { LegalDocumentEntry } from '@/entities/legal-document/model/legal-document.types';
import { getLocalizedPathname, routes } from '@/shared/lib/routes';

type Props = {
  entry: LegalDocumentEntry;
  onToggleMobileToc?: () => void;
  isMobileTocOpen?: boolean;
};

function getCopy(locale: 'pl' | 'en') {
  if (locale === 'pl') {
    return {
      back: 'Powrót do strony głównej',
      print: 'Drukuj',
      toc: 'Spis treści',
      closeToc: 'Zamknij spis treści',
      openToc: 'Otwórz spis treści',
    };
  }

  return {
    back: 'Back to homepage',
    print: 'Print',
    toc: 'Table of contents',
    closeToc: 'Close table of contents',
    openToc: 'Open table of contents',
  };
}

export function LegalDocumentUtilityBar({ entry, onToggleMobileToc, isMobileTocOpen }: Props) {
  const copy = useMemo(() => getCopy(entry.locale), [entry.locale]);
  const homeHref = getLocalizedPathname(routes.home, entry.locale);

  return (
    <div className="border-b border-[#d5d4d1] px-0 py-3 lg:px-10 xl:px-12 print:hidden">
      <div className="flex max-w-[760px] flex-wrap items-center justify-between gap-3">
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 text-[14px] leading-[21px] text-[#221f1f] transition-colors hover:text-[#e50914]"
        >
          <span aria-hidden="true" className="text-[16px] leading-none">
            ←
          </span>
          <span>{copy.back}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {onToggleMobileToc ? (
            <button
              type="button"
              onClick={onToggleMobileToc}
              aria-expanded={isMobileTocOpen}
              aria-label={isMobileTocOpen ? copy.closeToc : copy.openToc}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#d5d4d1] bg-white px-3 text-[#221f1f] transition-colors hover:bg-[#f5f5f1] lg:hidden"
            >
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className="block h-[2px] w-4 bg-current" />
                <span className="block h-[2px] w-4 bg-current" />
                <span className="block h-[2px] w-4 bg-current" />
              </span>
              <span className="text-[14px] font-medium leading-[21px]">{copy.toc}</span>
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-[#d5d4d1] bg-white px-3 py-2 text-[14px] font-medium leading-[21px] text-[#221f1f] transition-colors hover:bg-[#f5f5f1]"
          >
            <span aria-hidden="true">🖨</span>
            <span>{copy.print}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
