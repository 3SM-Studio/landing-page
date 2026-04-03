import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SiteFooter } from '@/widgets/site-footer/ui/SiteFooter';
import { SiteHeader } from '@/widgets/site-header/ui/SiteHeader';
import { LocalBusinessJsonLd } from '@/shared/seo/jsonld/LocalBusinessJsonLd';
import { OrganizationJsonLd } from '@/shared/seo/jsonld/OrganizationJsonLd';
import { WebSiteJsonLd } from '@/shared/seo/jsonld/WebSiteJsonLd';
import { type Locale, routing } from '@/shared/i18n/routing';
import { routes } from '@/shared/lib/routes';
import { buildMetadata } from '@/shared/seo/buildMetadata';
import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';
import { CustomCursor } from '@/shared/ui/custom-cursor/CustomCursor';
import { SiteBackground } from '@/shared/ui/SiteBackground';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export async function generateViewport(): Promise<Viewport> {
  const siteConfig = await resolvePublicSiteConfig();

  return {
    themeColor: siteConfig.themeColor,
    colorScheme: 'dark',
  };
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return buildMetadata({
    locale: locale as Locale,
    canonical: routes.home,
    useTitleTemplate: true,
  });
}

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const shouldLoadVercelAnalytics = process.env.NODE_ENV === 'production' && !!process.env.VERCEL;

export default async function SiteLocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  setRequestLocale(typedLocale);

  const [messages, tCommon] = await Promise.all([
    getMessages({ locale: typedLocale }),
    getTranslations({ locale: typedLocale, namespace: 'Common' }),
  ]);

  return (
    <html
      lang={typedLocale}
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="bg-[#020617] antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteBackground />
          <CustomCursor />

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-black"
          >
            {tCommon('skipToContent')}
          </a>

          <NextIntlClientProvider locale={typedLocale} messages={messages}>
            <OrganizationJsonLd locale={typedLocale} />
            <WebSiteJsonLd locale={typedLocale} />
            <LocalBusinessJsonLd locale={typedLocale} />

            <SiteHeader />

            <main id="main-content" className="relative z-10 flex flex-1 flex-col">
              {children}
            </main>

            <SiteFooter />
          </NextIntlClientProvider>

          {shouldLoadVercelAnalytics ? <Analytics /> : null}
          {shouldLoadVercelAnalytics ? <SpeedInsights /> : null}
          {process.env.NODE_ENV === 'production' && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        </div>
      </body>
    </html>
  );
}
