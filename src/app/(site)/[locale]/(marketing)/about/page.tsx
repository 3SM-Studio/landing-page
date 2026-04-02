import type { Metadata } from 'next';
import { AboutPageView } from '@/widgets/about-page/ui/AboutPageView';
import { resolveLocale } from '@/shared/i18n/locale';
import { buildPageMetadata } from '@/shared/seo/buildPageMetadata';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return buildPageMetadata({
    locale,
    pathname: '/about',
    namespace: 'about',
    seoTitleKey: 'hero.title',
    seoDescriptionKey: 'hero.description',
    keywords: ['about 3SM', 'creative direction', 'studio'],
  });
}

export default async function AboutPage() {
  return <AboutPageView />;
}
