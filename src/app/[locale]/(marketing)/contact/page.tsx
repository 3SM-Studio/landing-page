import type { Locale } from '@/shared/i18n/routing';
import { ContactPageView } from '@/features/contact/ui/ContactPageView';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return <ContactPageView locale={locale} />;
}
