import { Container } from '@/shared/ui/Container';
import type { LegalDocumentEntry } from '@/entities/legal-document/model/legal-document.types';
import { buildLegalToc } from '@/entities/legal-document/model/legal-toc.lib';
import { LegalEntityCard } from './LegalEntityCard';
import { LegalDocumentContent } from './LegalDocumentContent';
import { LegalDocumentHeader } from './LegalDocumentHeader';
import { LegalTocClient } from './LegalTocClient';

import type { LegalCompanyCard } from '@/entities/legal-document/model/buildLegalCompanyCard';

type Props = {
  entry: LegalDocumentEntry;
  companyCard?: LegalCompanyCard;
};

function getCopy(locale: 'pl' | 'en') {
  if (locale === 'pl') {
    return {
      toc: 'Spis treści',
    };
  }

  return {
    toc: 'Table of contents',
  };
}

export function LegalDocument({ entry, companyCard }: Props) {
  const copy = getCopy(entry.locale);
  const tocItems = entry.showTableOfContents ? buildLegalToc(entry) : [];

  return (
    <Container className="py-4 md:py-6 lg:py-8">
      <div className="mx-auto max-w-[1248px] bg-white">
        <div className="grid gap-0 lg:grid-cols-[275px_minmax(0,1fr)] lg:items-start">
          <LegalTocClient
            items={tocItems}
            title={copy.toc}
            entry={entry}
            header={<LegalDocumentHeader entry={entry} />}
          >
            <div className="px-0 pb-10 md:pb-12 lg:px-10 lg:pb-16 xl:px-12">
              <div className="max-w-[760px]">
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

                <LegalDocumentContent entry={entry} />
              </div>
            </div>
          </LegalTocClient>
        </div>
      </div>
    </Container>
  );
}
