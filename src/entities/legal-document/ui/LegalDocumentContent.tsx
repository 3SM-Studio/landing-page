import type { LegalDocumentEntry } from '@/entities/legal-document/model/legal-document.types';
import { LegalDocumentSection } from './LegalDocumentSection';

export function LegalDocumentContent({ entry }: { entry: LegalDocumentEntry }) {
  return (
    <article className="space-y-10 md:space-y-12">
      {entry.sections.map((section) => (
        <LegalDocumentSection key={section.key} section={section} />
      ))}
    </article>
  );
}
