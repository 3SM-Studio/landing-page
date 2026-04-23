import { notFound } from 'next/navigation';
import { LegalDocument } from '@/entities/legal-document/ui/LegalDocument';
import { buildLegalCompanyCard } from '@/entities/legal-document/model/buildLegalCompanyCard';
import type { Locale } from '@/shared/i18n/routing';
import { getLegalDocument } from '@/entities/legal-document/model/get-legal-document';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { routes } from '@/shared/lib/routes';
import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';

type RoutePath = (typeof routes)[keyof typeof routes];

export async function getLegalPageMetadata(locale: Locale, slug: string, canonical: RoutePath) {
  const entry = await getLegalDocument(locale, slug);

  if (!entry) {
    return {};
  }

  return buildMetadata({
    locale,
    title: entry.seo?.title ?? entry.title,
    description: entry.seo?.description ?? entry.summary,
    canonical: entry.seo?.canonicalUrl ?? canonical,
    noIndex: entry.seo?.noIndex,
    ogImageAlt: entry.seo?.socialImageAlt,
    openGraphType: 'article',
  });
}

export async function renderLegalPage(locale: Locale, slug: string) {
  const [entry, siteConfig] = await Promise.all([
    getLegalDocument(locale, slug),
    resolvePublicSiteConfig(),
  ]);

  if (!entry) {
    notFound();
  }

  return <LegalDocument entry={entry} companyCard={buildLegalCompanyCard(siteConfig)} />;
}
