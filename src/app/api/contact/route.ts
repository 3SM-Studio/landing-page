import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  sendContactConfirmationEmail,
  sendInternalContactEmail,
} from '@/lib/email/send-contact-email';
import { contactRateLimit } from '@/lib/rate-limit';
import { contactRequestSchema } from '@/lib/validation/contact';

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
  let locale: 'pl' | 'en' = 'en';

  try {
    const ip = getClientIp(request);
    const { success } = await contactRateLimit.limit(`contact:${ip}`);

    if (!success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Too many requests. Please wait a moment before trying again.',
        },
        { status: 429 },
      );
    }

    const body = await request.json();

    const parsed = contactRequestSchema.safeParse(body);

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
    locale = data.locale;

    if (data.company !== '') {
      return NextResponse.json({ ok: true });
    }

    await sendInternalContactEmail(data, locale);

    try {
      await sendContactConfirmationEmail(data, locale);
    } catch (error) {
      console.error('Contact confirmation email error:', {
        error,
        email: data.email,
      });
    }

    return NextResponse.json({
      ok: true,
      message: locale === 'pl' ? 'Formularz został wysłany.' : 'The form has been sent.',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        ok: false,
        message:
          locale === 'pl'
            ? 'Wystąpił błąd podczas wysyłania formularza.'
            : 'An error occurred while sending the form.',
      },
      { status: 500 },
    );
  }
}
