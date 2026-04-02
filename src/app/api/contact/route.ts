import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  sendContactConfirmationEmail,
  sendInternalContactEmail,
} from '@/features/contact-form/api/contact-email.service';
import { getClientIp } from '@/features/contact-form/api/contact.request';
import { getContactRateLimit } from '@/shared/rate-limit';
import { contactRequestSchema } from '@/shared/validation/contact';

export async function POST(request: NextRequest) {
  let locale: 'pl' | 'en' = 'en';

  try {
    const rateLimit = getContactRateLimit();

    if (rateLimit) {
      const ip = getClientIp(request);
      const { success } = await rateLimit.limit(`contact:${ip}`);

      if (!success) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Too many requests. Please wait a moment before trying again.',
          },
          { status: 429 },
        );
      }
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
