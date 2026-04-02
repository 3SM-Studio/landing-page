import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const LEGAL_DIR = path.join(process.cwd(), 'src/entities/legal-document/model/content');

export type Locale = 'pl' | 'en';

export type LegalDocumentMetadata = {
  title: string;
  description: string;
  updatedAt: string;
  version?: string;
};

export type LegalDocumentEntry = {
  slug: string;
  locale: Locale;
  metadata: LegalDocumentMetadata;
  content: string;
};

export async function getLegalDocument(
  locale: Locale,
  slug: string,
): Promise<LegalDocumentEntry | null> {
  try {
    const filePath = path.join(LEGAL_DIR, locale, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(raw);

    return {
      slug,
      locale,
      metadata: {
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        updatedAt: String(data.updatedAt ?? ''),
        version: data.version ? String(data.version) : undefined,
      },
      content,
    };
  } catch {
    return null;
  }
}
