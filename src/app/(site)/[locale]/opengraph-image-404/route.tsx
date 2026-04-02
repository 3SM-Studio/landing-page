import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { routing, type Locale } from '@/shared/i18n/routing';
import { serverSiteConfig } from '@/shared/config/site/site-config.server';

export const runtime = 'edge';

function resolveLocale(value: string): Locale {
  if (hasLocale(routing.locales, value)) {
    return value as Locale;
  }

  return routing.defaultLocale;
}

type Context = {
  params: Promise<{
    locale: string;
  }>;
};

function get404Copy(locale: Locale) {
  if (locale === 'pl') {
    return {
      title: '404 - Nie znaleziono strony',
      subtitle:
        'Strona, której szukasz, nie istnieje, została przeniesiona albo link jest nieprawidłowy.',
      footer: '3SM - Page not found',
    };
  }

  return {
    title: '404 - Page not found',
    subtitle: 'The page you are looking for does not exist, has been moved or the link is invalid.',
    footer: '3SM - Page not found',
  };
}

export async function GET(_request: Request, { params }: Context) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = get404Copy(locale);

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 52%, #111827 100%)',
        color: 'white',
        padding: '64px',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 28,
          opacity: 0.78,
          letterSpacing: 4,
        }}
      >
        <div>{serverSiteConfig.name.toUpperCase()}</div>
        <div>{serverSiteConfig.location.city}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          maxWidth: 940,
        }}
      >
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          {copy.title}
        </div>

        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            opacity: 0.84,
            maxWidth: 860,
          }}
        >
          {copy.subtitle}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 24,
          opacity: 0.66,
        }}
      >
        <div>{serverSiteConfig.domain}</div>
        <div>{copy.footer}</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  );
}
