import type { Locale } from '@/i18n/routing';
import { ContactSection } from '@/components/pages/ContactSection';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return <ContactSection locale={locale} />;
}
