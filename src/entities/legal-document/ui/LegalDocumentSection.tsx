import { PortableText } from 'next-sanity';
import type { LegalDocumentSection as LegalDocumentSectionType } from '@/entities/legal-document/model/legal-document.types';
import { createLegalPortableTextComponents } from './legalPortableTextComponents';
import { LegalDocumentSubsection } from './LegalDocumentSubsection';

export function LegalDocumentSection({ section }: { section: LegalDocumentSectionType }) {
  const portableTextComponents = createLegalPortableTextComponents(section.key);

  return (
    <section
      id={section.key}
      className="scroll-mt-[calc(var(--header-total-offset)+1.5rem)] border-t border-[#d5d4d1] pt-8 first:border-t-0 first:pt-0 md:pt-10"
    >
      <h2 className="text-[24px] font-bold leading-[30px] tracking-[-0.02em] text-[#221f1f] md:text-[28px] md:leading-[36px]">
        {section.title}
      </h2>
      <div className="mt-4 max-w-none text-[#221f1f] [&>*+*]:mt-4 md:[&>*+*]:mt-5">
        <PortableText value={section.body} components={portableTextComponents} />
      </div>

      {section.subsections.length > 0 ? (
        <div className="mt-8 space-y-7 md:mt-10 md:space-y-8">
          {section.subsections.map((subsection) => (
            <LegalDocumentSubsection key={subsection.key} subsection={subsection} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
