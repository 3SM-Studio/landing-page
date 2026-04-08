import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getPartnerBySlug, getPartnerSlugs } from '@/entities/partner/api/partner.repository';
import { resolveLocale } from '@/shared/i18n/locale';
import { routing, type AppPathname } from '@/shared/i18n/routing';
import { buildContentDetailMetadata } from '@/shared/seo/buildContentDetailMetadata';
import { PartnerDetailPageView } from '@/widgets/partner-detail-page/ui/PartnerDetailPageView';

type PartnerDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const partnerDetailPathname: AppPathname = '/partners/[slug]';

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const items = await getPartnerSlugs(locale);
      return items.map((item) => ({ locale, slug: item.slug }));
    }),
  );

  return localizedSlugs.flat();
}

export async function generateMetadata({ params }: PartnerDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'partners.detail' });
  const partner = await getPartnerBySlug(locale, slug);

  if (!partner) {
    return buildContentDetailMetadata({
      locale,
      title: '',
      description: '',
      sectionTitle: 'Partners',
      notFoundTitle: t('notFound'),
      pathname: partnerDetailPathname,
      params: { slug },
    });
  }

  return buildContentDetailMetadata({
    locale,
    title: partner.seo?.title ?? partner.name,
    description: partner.seo?.description ?? partner.tagline ?? partner.shortDescription ?? '',
    sectionTitle: 'Partners',
    notFoundTitle: t('notFound'),
    pathname: partnerDetailPathname,
    params: { slug },
  });
}

export default async function PartnerDetailPage({ params }: PartnerDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: 'partners.detail' });
  const partner = await getPartnerBySlug(locale, slug);

  if (!partner) {
    notFound();
  }

  return (
    <PartnerDetailPageView
      locale={locale}
      partner={partner}
      copy={{
        backToPartners: t('backToPartners'),
        partnershipTypeLabel: t('partnershipTypeLabel'),
        websiteLabel: t('websiteLabel'),
        socialLinksTitle: t('socialLinksTitle'),
        relatedCaseStudiesTitle: t('relatedCaseStudiesTitle'),
        relatedCaseStudiesEmpty: t('relatedCaseStudiesEmpty'),
        viewCase: t('viewCase'),
        clientLabel: t('clientLabel'),
        aboutTitle: t('aboutTitle'),
        profileTitle: t('profileTitle'),
        locationLabel: t('locationLabel'),
        collaborationTitle: t('collaborationTitle'),
        highlightsTitle: t('highlightsTitle'),
        highlightsEmpty: t('highlightsEmpty'),
        workCountLabel: t('workCountLabel'),
      }}
    />
  );
}
