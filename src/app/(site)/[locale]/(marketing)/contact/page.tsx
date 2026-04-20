import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/routing';
import { getStaticPage } from '@/entities/static-page/api/static-page.repository';
import { ContactPageView } from '@/widgets/contact-page/ui/ContactPageView';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const staticPage = await getStaticPage('contact', locale);

  if (!staticPage) {
    return buildPageMetadata({
      locale,
      pathname: '/contact',
      namespace: 'ContactPage',
      seoTitleKey: 'titleStart',
      seoDescriptionKey: 'description',
      keywords: ['contact', 'project inquiry', 'creative studio contact'],
    });
  }

  return buildMetadata({
    locale,
    canonical: '/contact',
    title: staticPage.seo?.title || staticPage.hero.title,
    description: staticPage.seo?.description || staticPage.hero.description,
    keywords: staticPage.seo?.keywords || ['contact', 'project inquiry', 'creative studio contact'],
    noIndex: staticPage.seo?.noIndex,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const staticPage = await getStaticPage('contact', locale);

  return <ContactPageView locale={locale} staticPage={staticPage} />;
}
