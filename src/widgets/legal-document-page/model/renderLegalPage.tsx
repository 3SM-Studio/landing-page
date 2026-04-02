import { notFound } from 'next/navigation';
import { LegalDocument } from '@/entities/legal-document/ui/LegalDocument';
import type { Locale } from '@/shared/i18n/routing';
import { getLegalDocument } from '@/entities/legal-document/model/get-legal-document';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { routes } from '@/shared/lib/routes';

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
