import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/routing';
import { ContactPageView } from '@/widgets/contact-page/ui/ContactPageView';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/contact',
    namespace: 'ContactPage',
    titleKey: 'titleStart',
    descriptionKey: 'description',
    keywords: ['contact', 'project inquiry', 'creative studio contact'],
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return <ContactPageView locale={locale} />;
}
