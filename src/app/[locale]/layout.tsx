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
        <NextIntlClientProvider locale={typedLocale} messages={messages}>
          <OrganizationJsonLd locale={typedLocale} />
          <WebSiteJsonLd locale={typedLocale} />
          <LocalBusinessJsonLd locale={typedLocale} />
          <ServicesJsonLd locale={typedLocale} />
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>

        <Analytics />
        <SpeedInsights />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
