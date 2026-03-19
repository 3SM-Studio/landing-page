import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const isDev = process.env.NODE_ENV === 'development';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https: https://vercel.live https://vercel.com",
  "font-src 'self' data: https: https://vercel.live https://assets.vercel.com",
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "connect-src 'self' https: ws: wss: https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://vercel.live",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  poweredByHeader: false,

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
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'payment=()',
              'usb=()',
            ].join(', '),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
