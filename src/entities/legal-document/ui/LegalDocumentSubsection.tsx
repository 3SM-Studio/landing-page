import { PortableText } from 'next-sanity';
import type { LegalDocumentSubsection as LegalDocumentSubsectionType } from '@/entities/legal-document/model/legal-document.types';
import { createLegalPortableTextComponents } from './legalPortableTextComponents';

export function LegalDocumentSubsection({
  subsection,
}: {
  subsection: LegalDocumentSubsectionType;
}) {
  return (
    <div
      id={subsection.key}
      className="scroll-mt-[calc(var(--header-total-offset)+1.5rem)] border-t border-[#eaeae6] pt-6 md:pt-7"
    >
      <h3 className="text-[18px] font-bold leading-[27px] tracking-[-0.015em] text-[#221f1f]">
        {subsection.title}
      </h3>
      <div className="mt-3 max-w-none text-[#221f1f] [&>*+*]:mt-4 md:[&>*+*]:mt-5">
        <PortableText
          value={subsection.body}
          components={createLegalPortableTextComponents(subsection.key)}
        />
      </div>
    </div>
  );
}
