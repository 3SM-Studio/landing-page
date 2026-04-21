import { NextResponse } from 'next/server';
import { resolveLocaleSwitchRoute } from '@/shared/i18n/locale-switch.server';
import { routing, type Locale } from '@/shared/i18n/routing';

type LocaleSwitchRequestBody = {
  pathname?: string;
  currentLocale?: string;
  targetLocale?: string;
  params?: Record<string, string | undefined>;
};

function isLocale(value: string | undefined): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LocaleSwitchRequestBody;

    if (!body.pathname || !isLocale(body.currentLocale) || !isLocale(body.targetLocale)) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid locale switch payload.',
        },
        { status: 400 },
      );
    }

    const route = await resolveLocaleSwitchRoute({
      pathname: body.pathname,
      currentLocale: body.currentLocale,
      targetLocale: body.targetLocale,
      params: body.params,
    });

    if (!route) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Could not resolve localized route.',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      route,
    });
  } catch (error) {
    console.error('Locale switch route error:', error);

    return NextResponse.json(
      {
        ok: false,
        message: 'An unexpected error occurred while resolving locale switch.',
      },
      { status: 500 },
    );
  }
}
