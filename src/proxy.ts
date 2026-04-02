import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/shared/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const METADATA_IMAGE_REWRITES = [
  {
    from: '/pl/uslugi/opengraph-image',
    to: '/pl/services/opengraph-image',
  },
  {
    from: '/pl/uslugi/twitter-image',
    to: '/pl/services/twitter-image',
  },
] as const;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const metadataRewrite = METADATA_IMAGE_REWRITES.find((rule) => rule.from === pathname);

  if (metadataRewrite) {
    return NextResponse.rewrite(new URL(metadataRewrite.to, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
