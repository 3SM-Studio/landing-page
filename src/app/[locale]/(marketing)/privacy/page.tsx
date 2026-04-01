import { getLegalPageMetadata, renderLegalPage } from '@/features/legal/ui/renderLegalPage';
import type { Locale } from '@/shared/i18n/routing';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return getLegalPageMetadata(locale, 'privacy-policy', '/privacy');
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  return renderLegalPage(locale, 'privacy-policy');
}
