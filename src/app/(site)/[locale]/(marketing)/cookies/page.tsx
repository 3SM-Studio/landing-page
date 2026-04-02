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

  return getLegalPageMetadata(locale, 'cookies-policy', '/cookies');
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;

  return renderLegalPage(locale, 'cookies-policy');
}
