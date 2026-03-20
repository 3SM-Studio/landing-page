import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Locale } from '@/i18n/routing';
import { contactSchema } from '@/lib/validation/contact';
import {
  sendContactConfirmationEmail,
  sendInternalContactEmail,
} from '@/lib/email/send-contact-email';
import { contactRateLimit } from '@/lib/rate-limit';

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { success } = await contactRateLimit.limit(`contact:${ip}`);

    if (!success) {
      return NextResponse.json(
        {
          ok: false,
          message:
            'Too many requests. Please wait a moment before trying again.',
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    if (typeof body.company === 'string' && body.company.trim() !== '') {
      return NextResponse.json({
        ok: true,
        message: 'Formularz został wysłany.',
      });
    }

    const locale: Locale = body.locale === 'pl' ? 'pl' : 'en';

    const parsed = contactSchema.safeParse({
      name: body.name,
      email: body.email,
      projectType: body.projectType,
      message: body.message,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    await sendInternalContactEmail(data, locale);

    try {
      await sendContactConfirmationEmail(data, locale);
    } catch (error) {
      console.error('Contact confirmation email error:', error);
    }

    return NextResponse.json({
      ok: true,
      message:
        locale === 'pl'
          ? 'Formularz został wysłany.'
          : 'The form has been sent.',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        ok: false,
        message: 'Wystąpił błąd podczas wysyłania formularza.',
      },
      { status: 500 },
    );
  }
}
