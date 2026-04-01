import { getLegalPageMetadata, renderLegalPage } from '@/features/legal/ui/renderLegalPage';
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
