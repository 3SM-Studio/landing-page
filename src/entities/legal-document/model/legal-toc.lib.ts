import type { PortableTextBlock } from 'next-sanity';
import type { LegalDocumentEntry } from './legal-document.types';
import type { LegalTocItem } from './legal-toc.types';

type PortableTextChild = { text?: string | null };
type PortableTextHeadingBlock = PortableTextBlock & {
  style?: string;
  children?: PortableTextChild[];
};

function toPlainText(children: PortableTextChild[] | undefined) {
  return (children ?? [])
    .map((child) => child?.text ?? '')
    .join('')
    .trim();
}

export function slugifyLegalHeading(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function getPortableTextSubheadingId(sectionKey: string, title: string) {
  const slug = slugifyLegalHeading(title);
  return slug ? `${sectionKey}-${slug}` : sectionKey;
}

export function extractPortableTextSubheadings(sectionKey: string, body: PortableTextBlock[]) {
  const headings: LegalTocItem[] = [];
  const seen = new Set<string>();

  for (const rawBlock of body as PortableTextHeadingBlock[]) {
    if (rawBlock?.style !== 'h3') {
      continue;
    }

    const title = toPlainText(rawBlock.children);
    if (!title) {
      continue;
    }

    const id = getPortableTextSubheadingId(sectionKey, title);
    if (seen.has(id)) {
      continue;
    }

    seen.add(id);
    headings.push({ id, title, level: 3 });
  }

  return headings;
}

export function buildLegalToc(entry: LegalDocumentEntry): LegalTocItem[] {
  return entry.sections
    .filter((section) => section.showInTableOfContents)
    .map((section) => ({
      id: section.key,
      title: section.title,
      level: 2 as const,
      children:
        section.subsections.length > 0
          ? section.subsections
              .filter((subsection) => subsection.showInTableOfContents)
              .map((subsection) => ({
                id: subsection.key,
                title: subsection.title,
                level: 3 as const,
              }))
          : extractPortableTextSubheadings(section.key, section.body),
    }));
}

export function flattenLegalToc(items: LegalTocItem[]): LegalTocItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenLegalToc(item.children) : [])]);
}
