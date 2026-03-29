import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd';
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd';
import { ServicesJsonLd } from '@/components/seo/ServicesJsonLd';
import { WebSiteJsonLd } from '@/components/seo/WebSiteJsonLd';
import { type Locale, routing } from '@/i18n/routing';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo';

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

export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
};

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

export default async function LocaleRootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  setRequestLocale(typedLocale);
  const messages = await getMessages({ locale: typedLocale });

  return (
    <html
      lang={typedLocale}
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col bg-[#020617] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Przejdź do treści
        </a>

        <NextIntlClientProvider locale={typedLocale} messages={messages}>
          <OrganizationJsonLd locale={typedLocale} />
          <WebSiteJsonLd locale={typedLocale} />
          <LocalBusinessJsonLd locale={typedLocale} />
          <ServicesJsonLd locale={typedLocale} />

          <Header />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>

        {shouldLoadVercelAnalytics ? <Analytics /> : null}
        {shouldLoadVercelAnalytics ? <SpeedInsights /> : null}
        {process.env.NODE_ENV === 'production' && gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
