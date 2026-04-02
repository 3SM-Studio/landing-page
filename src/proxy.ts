import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/shared/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/pl/uslugi/opengraph-image') {
    return NextResponse.rewrite(new URL('/pl/services/opengraph-image', request.url));
  }

  if (pathname === '/pl/uslugi/twitter-image') {
    return NextResponse.rewrite(new URL('/pl/services/twitter-image', request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
