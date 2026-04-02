import {
  getLegalPageMetadata,
  renderLegalPage,
} from '@/widgets/legal-document-page/model/renderLegalPage';
import type { Locale } from '@/shared/i18n/routing';

type Props = {
  params: Promise<{
    locale: Locale;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return getLegalPageMetadata(locale, 'legal-notice', '/legal-notice');
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;

  return renderLegalPage(locale, 'legal-notice');
}
