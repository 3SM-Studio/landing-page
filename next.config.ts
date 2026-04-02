import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');
const isDev = process.env.NODE_ENV === 'development';
const isPreview = process.env.VERCEL_ENV === 'preview';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",

  [
    'img-src',
    "'self'",
    'data:',
    'blob:',
    'https://cdn.sanity.io',
    'https://*.googleapis.com',
    'https://*.gstatic.com',
    'https://*.google.com',
    'https://*.googleusercontent.com',
    'https://*.google-analytics.com',
    ...(isPreview ? ['https://vercel.live', 'https://vercel.com'] : []),
  ].join(' '),

  [
    'font-src',
    "'self'",
    'data:',
    'https://fonts.gstatic.com',
    ...(isPreview ? ['https://vercel.live', 'https://assets.vercel.com'] : []),
  ].join(' '),

  [
    'style-src',
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    ...(isPreview ? ['https://vercel.live'] : []),
  ].join(' '),

  [
    'style-src-elem',
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://www.gstatic.com',
    ...(isPreview ? ['https://vercel.live'] : []),
  ].join(' '),

  [
    'script-src',
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    'https://www.googletagmanager.com',
    'https://va.vercel-scripts.com',
    'https://*.googleapis.com',
    'https://*.gstatic.com',
    'https://*.google.com',
    'https://*.ggpht.com',
    'https://*.googleusercontent.com',
    'blob:',
    ...(isPreview ? ['https://vercel.live'] : []),
  ].join(' '),

  [
    'connect-src',
    "'self'",
    'https://www.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://va.vercel-scripts.com',
    'https://vitals.vercel-insights.com',
    'https://*.googleapis.com',
    'https://*.google.com',
    'https://*.gstatic.com',
    'data:',
    'blob:',
    'ws:',
    'wss:',
    ...(isPreview ? ['https://vercel.live', 'wss://ws-us3.pusher.com'] : []),
  ].join(' '),

  "worker-src 'self' blob:",

  [
    'frame-src',
    "'self'",
    'https://*.google.com',
    ...(isPreview ? ['https://vercel.live'] : []),
  ].join(' '),

  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
