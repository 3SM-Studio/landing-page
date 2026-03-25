// src/features/legal/renderLegalPage.tsx
import { notFound } from 'next/navigation';
import { LegalDocument } from '@/components/legal/LegalDocument';
import type { Locale } from '@/i18n/routing';
import { getLegalDocument } from '@/lib/legal/documents';
import { buildMetadata } from '@/lib/seo';
import { routes } from '@/lib/routes';

type RoutePath = (typeof routes)[keyof typeof routes];

export async function getLegalPageMetadata(locale: Locale, slug: string, canonical: RoutePath) {
  const entry = await getLegalDocument(locale, slug);

  if (!entry) {
    return {};
  }

  return buildMetadata({
    locale,
    title: entry.metadata.title,
    description: entry.metadata.description,
    canonical,
    openGraphType: 'article',
  });
}

export async function renderLegalPage(locale: Locale, slug: string) {
  const entry = await getLegalDocument(locale, slug);

  if (!entry) {
    notFound();
  }

  return <LegalDocument entry={entry} />;
}
