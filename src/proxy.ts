import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

function buildCsp({
  nonce,
  isDev,
  allowVercelToolbar,
}: {
  nonce: string;
  isDev: boolean;
  allowVercelToolbar: boolean;
}) {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    isDev ? "'unsafe-eval'" : '',
    allowVercelToolbar ? 'https://vercel.live' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const connectSrc = [
    "'self'",
    'https:',
    'ws:',
    'wss:',
    allowVercelToolbar ? 'https://vercel.live' : '',
    allowVercelToolbar ? 'wss://ws-us3.pusher.com' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const imgSrc = [
    "'self'",
    'data:',
    'blob:',
    'https:',
    allowVercelToolbar ? 'https://vercel.live' : '',
    allowVercelToolbar ? 'https://vercel.com' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const frameSrc = ["'self'", allowVercelToolbar ? 'https://vercel.live' : '']
    .filter(Boolean)
    .join(' ');

  const fontSrc = [
    "'self'",
    'data:',
    'https:',
    allowVercelToolbar ? 'https://vercel.live' : '',
    allowVercelToolbar ? 'https://assets.vercel.com' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const styleSrc = [
    "'self'",
    "'unsafe-inline'",
    allowVercelToolbar ? 'https://vercel.live' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const csp = `
    default-src 'self';
    base-uri 'self';
    object-src 'none';
    frame-ancestors 'none';
    form-action 'self';
    img-src ${imgSrc};
    font-src ${fontSrc};
    style-src ${styleSrc};
    script-src ${scriptSrc};
    connect-src ${connectSrc};
    frame-src ${frameSrc};
    upgrade-insecure-requests;
  `;

  return csp.replace(/\s{2,}/g, ' ').trim();
}

export default function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const isPreview = process.env.VERCEL_ENV === 'preview';

  const allowVercelToolbar = isPreview;

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = buildCsp({
    nonce,
    isDev,
    allowVercelToolbar,
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const i18nResponse = handleI18nRouting(request);

  const response = i18nResponse.ok
    ? NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    : i18nResponse;

  i18nResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
