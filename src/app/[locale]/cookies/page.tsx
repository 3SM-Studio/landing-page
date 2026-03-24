import { getLegalPageMetadata, renderLegalPage } from '@/features/legal/renderLegalPage';
import type { Locale } from '@/i18n/routing';

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
