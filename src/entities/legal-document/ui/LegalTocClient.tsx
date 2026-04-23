'use client';

import { useState, type ReactNode } from 'react';
import type { LegalDocumentEntry } from '@/entities/legal-document/model/legal-document.types';
import type { LegalTocItem } from '@/entities/legal-document/model/legal-toc.types';
import { LegalDocumentUtilityBar } from './LegalDocumentUtilityBar';
import { LegalTocDesktop } from './LegalTocDesktop';
import { LegalTocMobile } from './LegalTocMobile';
import { useLegalScrollSpy } from './useLegalScrollSpy';

type Props = {
  items: LegalTocItem[];
  title: string;
  entry: LegalDocumentEntry;
  header: ReactNode;
  children: ReactNode;
};

export function LegalTocClient({ items, title, entry, header, children }: Props) {
  const activeId = useLegalScrollSpy(items);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {items.length > 0 ? (
        <LegalTocDesktop items={items} activeId={activeId} title={title} />
      ) : null}
      <div className="min-w-0">
        <LegalDocumentUtilityBar
          entry={entry}
          onToggleMobileToc={
            items.length > 0 ? () => setMobileOpen((current) => !current) : undefined
          }
          isMobileTocOpen={mobileOpen}
        />
        {header}
        {items.length > 0 ? (
          <LegalTocMobile
            items={items}
            activeId={activeId}
            title={title}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            onToggle={() => setMobileOpen((current) => !current)}
          />
        ) : null}
        {children}
      </div>
    </>
  );
}
