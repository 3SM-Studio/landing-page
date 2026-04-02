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

function getServicesOgCopy(locale: Locale) {
  if (locale === 'pl') {
    return {
      eyebrow: 'USŁUGI',
      title: 'Usługi, które pomagają markom wyglądać lepiej i działać lepiej.',
      subtitle:
        'Strony internetowe, branding, content, fotografia i video - jako spójny system, nie przypadkowy zestaw usług.',
      footer: 'STRONY - BRANDING - FOTO - VIDEO - CONTENT',
    };
  }

  return {
    eyebrow: 'SERVICES',
    title: 'Services that help brands look better and work better.',
    subtitle:
      'Websites, branding, content, photography and video - built as one coherent system, not a random list of services.',
    footer: 'WEB - BRANDING - PHOTO - VIDEO - CONTENT',
  };
}

type Context = {
  params: Promise<{
    locale: string;
  }>;
};

export async function GET(_request: Request, { params }: Context) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getServicesOgCopy(locale);

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
        <div>{copy.eyebrow}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          maxWidth: 920,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.04,
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
