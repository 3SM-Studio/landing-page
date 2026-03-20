import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/contact';
import {
  sendContactConfirmationEmail,
  sendInternalContactEmail,
} from '@/lib/email/send-contact-email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

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

    await sendInternalContactEmail(data);

    try {
      await sendContactConfirmationEmail(data);
    } catch (error) {
      console.error('Contact confirmation email error:', error);
    }

    return NextResponse.json({
      ok: true,
      message: 'Formularz został wysłany.',
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
