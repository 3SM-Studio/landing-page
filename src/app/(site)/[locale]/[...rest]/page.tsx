import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildNotFoundMetadata } from '@/shared/seo/buildNotFoundMetadata';

type CatchAllPageProps = {
  params: Promise<{
    locale: string;
    rest?: string[];
  }>;
};

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const { locale: rawLocale, rest = [] } = await params;
  const locale = resolveLocale(rawLocale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const pathname = `/${locale}${rest.length ? `/${rest.join('/')}` : ''}`;

  return buildNotFoundMetadata({
    locale,
    pathname,
    title: t('notFoundTitle'),
    description: t('notFoundDescription'),
  });
}

export default function CatchAllPage() {
  notFound();
}
