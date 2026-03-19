import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

function buildCsp(nonce: string, isDev: boolean) {
  const csp = `
    default-src 'self';
    base-uri 'self';
    object-src 'none';
    frame-ancestors 'none';
    form-action 'self';
    img-src 'self' data: blob: https:;
    font-src 'self' data: https:;
    style-src 'self' 'unsafe-inline';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''};
    connect-src 'self' https: ws: wss:;
    frame-src 'self';
    upgrade-insecure-requests;
  `;

  return csp.replace(/\s{2,}/g, ' ').trim();
}

export default function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = buildCsp(nonce, isDev);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = handleI18nRouting(request);

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-nonce', nonce);

  // Ważne: przekaż nonce/CSP dalej w nagłówkach requestu dla renderowania
  response.headers.set(
    'x-middleware-override-headers',
    'x-nonce,content-security-policy',
  );
  response.headers.set('x-nonce', nonce);
  response.headers.set('content-security-policy', csp);

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
