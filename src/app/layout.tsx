import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd';
import { WebSiteJsonLd } from '@/components/seo/WebSiteJsonLd';
import { absoluteUrl, routes } from '@/lib/routes';
import { siteConfig } from '@/lib/site-config';
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'creative studio',
  keywords: siteConfig.keywords,
  alternates: {
    canonical: absoluteUrl(routes.home),
  },
  robots: {
    index: siteConfig.shouldIndex,
    follow: siteConfig.shouldIndex,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: absoluteUrl(routes.home),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.creator,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.language}
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#020617] antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
