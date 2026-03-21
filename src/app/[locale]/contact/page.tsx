import { ContactSection } from '@/components/pages/ContactSection';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return <ContactSection locale={locale} />;
}
