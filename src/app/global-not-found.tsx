import type { Metadata } from 'next';
import './(site)/[locale]/globals.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | 3 Stupid Men',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '404 - Page Not Found | 3 Stupid Men',
    description: 'The page you are looking for does not exist.',
    url: 'https://3stupidmen.com/404',
    siteName: '3 Stupid Men',
    images: [
      {
        url: 'https://3stupidmen.com/opengraph-image-404',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Page Not Found | 3 Stupid Men',
    description: 'The page you are looking for does not exist.',
    images: [
      {
        url: 'https://3stupidmen.com/twitter-image-404',
        alt: '404 - Page Not Found',
      },
    ],
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] text-white">
        <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-sm md:p-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
              404
            </p>
            <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">Page not found</h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-300">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
