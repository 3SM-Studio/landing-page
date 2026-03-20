'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/i18n/routing';
import type { ContactFormValues } from '@/lib/validation/contact';
import { projectTypeValues } from '@/lib/validation/contact';
import { Button } from '../ui/Button';
import { Send } from 'lucide-react';
import { Container } from '../ui/Container';

type Props = {
  locale: Locale;
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const copy = {
  pl: {
    badge: 'Kontakt',
    titleStart: 'Zbudujmy coś',
    titleAccent: 'niezwykłego razem.',
    description:
      'Opowiedz nam o swoim projekcie. Tworzymy video, zdjęcia, social content, grafiki i strony internetowe dla marek, twórców i firm.',
    formTitle: 'Rozpocznij projekt',
    name: 'Imię i nazwisko',
    namePlaceholder: 'Jan Kowalski',
    email: 'Adres e-mail',
    emailPlaceholder: 'jan@przyklad.pl',
    projectType: 'Rodzaj projektu',
    message: 'Twoja wiadomość',
    messagePlaceholder:
      'Opisz swój projekt, cele, zakres prac i termin realizacji...',
    submit: 'Wyślij wiadomość',
    sending: 'Wysyłanie...',
    success: 'Dzięki. Wiadomość została wysłana.',
    error: 'Nie udało się wysłać formularza. Spróbuj ponownie.',
    sidebarHeading: 'Bezpośredni kontakt',
    sidebarText:
      'Najczęściej odpowiadamy w ciągu 24-48 godzin. Jeśli brief jest konkretny, rozmowa od razu idzie szybciej.',
    emailLabel: 'E-mail',
    projectOptions: {
      'video-production': 'Produkcja video',
      'video-editing': 'Montaż video',
      photography: 'Fotografia',
      'graphic-design': 'Projektowanie graficzne',
      'web-design': 'Projektowanie stron',
      'web-development': 'Tworzenie stron',
      other: 'Inny projekt',
    },
    selectPlaceholder: 'Wybierz opcję',
  },
  en: {
    badge: 'Contact',
    titleStart: 'Let’s build something',
    titleAccent: 'remarkable together.',
    description:
      'Tell us about your project. We create video, photography, social content, graphics and websites for brands, creators and companies.',
    formTitle: 'Start a project',
    name: 'Full name',
    namePlaceholder: 'John Smith',
    email: 'Email address',
    emailPlaceholder: 'john@example.com',
    projectType: 'Project type',
    message: 'Your message',
    messagePlaceholder: 'Describe your project, goals, scope and timeline...',
    submit: 'Send message',
    sending: 'Sending...',
    success: 'Thanks. Your message has been sent.',
    error: 'The form could not be sent. Please try again.',
    sidebarHeading: 'Direct contact',
    sidebarText:
      'We usually reply within 24-48 hours. A concrete brief speeds everything up.',
    emailLabel: 'Email',
    projectOptions: {
      'video-production': 'Video Production',
      'video-editing': 'Video Editing',
      photography: 'Photography',
      'graphic-design': 'Graphic Design',
      'web-design': 'Web Design',
      'web-development': 'Web Development',
      other: 'Other Project',
    },
    selectPlaceholder: 'Select an option',
  },
} as const;

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  projectType: 'other',
  message: '',
};

export function ContactSection({ locale }: Props) {
  const t = copy[locale];
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const projectOptions = useMemo(
    () =>
      projectTypeValues.map((value) => ({
        value,
        label: t.projectOptions[value],
      })),
    [t],
  );

  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatus({ type: 'idle', message: '' });
  }

  function validate(valuesToValidate: ContactFormValues): FormErrors {
    const nextErrors: FormErrors = {};

    if (valuesToValidate.name.trim().length < 2) {
      nextErrors.name =
        locale === 'pl'
          ? 'Podaj imię i nazwisko.'
          : 'Please enter your full name.';
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valuesToValidate.email);
    if (!emailOk) {
      nextErrors.email =
        locale === 'pl'
          ? 'Podaj poprawny adres e-mail.'
          : 'Please enter a valid email address.';
    }

    if (!valuesToValidate.projectType) {
      nextErrors.projectType =
        locale === 'pl'
          ? 'Wybierz rodzaj projektu.'
          : 'Please choose a project type.';
    }

    if (valuesToValidate.message.trim().length < 20) {
      nextErrors.message =
        locale === 'pl'
          ? 'Wiadomość musi mieć co najmniej 20 znaków.'
          : 'Your message must be at least 20 characters long.';
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: 'idle', message: '' });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Request failed');
      }

      setValues(initialValues);
      setErrors({});
      setStatus({
        type: 'success',
        message: t.success,
      });
    } catch {
      setStatus({
        type: 'error',
        message: t.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClassName =
    'w-full rounded-3xl border border-white/10 bg-slate-950/40 px-6 py-5 text-base text-white placeholder:text-slate-500 transition-all outline-none focus:border-3sm-cyan/60 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(56,189,248,0.12)]';
  const labelClassName =
    'text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan';
  const errorClassName = 'text-sm text-red-300';

  return (
    <section className="relative px-6 pb-40 pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-[700px] w-[700px] rounded-full bg-sky-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-teal-600/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute -left-40 -top-20 select-none font-display text-[18rem] font-black leading-none text-3sm-cyan/[0.03] md:text-[30rem]">
          3
        </div>
      </div>

      <Container>
        <div className="mb-32">
          <div className="glass-panel-luxe mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
            <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
            {t.badge}
          </div>

          <h1 className="mb-12 font-display text-6xl font-black leading-[0.9] tracking-tight text-white md:text-[100px]">
            {t.titleStart} <br />
            <span className="bg-gradient-to-r from-3sm-cyan via-3sm-teal to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              {t.titleAccent}
            </span>
          </h1>

          <p className="max-w-2xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div className="glass-card-premium relative overflow-hidden rounded-[56px] border border-white/5 p-12 md:p-16 lg:col-span-7">
            <div className="absolute -right-10 -top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[80px]" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
              <div>
                <h2 className="mb-10 font-display text-3xl font-bold text-white">
                  {t.formTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className={labelClassName}>
                    {t.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={(event) =>
                      updateField('name', event.target.value)
                    }
                    placeholder={t.namePlaceholder}
                    className={inputClassName}
                    autoComplete="name"
                  />
                  {errors.name ? (
                    <p className={errorClassName}>{errors.name}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className={labelClassName}>
                    {t.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(event) =>
                      updateField('email', event.target.value)
                    }
                    placeholder={t.emailPlaceholder}
                    className={inputClassName}
                    autoComplete="email"
                  />
                  {errors.email ? (
                    <p className={errorClassName}>{errors.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="projectType" className={labelClassName}>
                  {t.projectType}
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={(event) =>
                    updateField(
                      'projectType',
                      event.target.value as ContactFormValues['projectType'],
                    )
                  }
                  className={inputClassName}
                >
                  <option value="other">{t.selectPlaceholder}</option>
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.projectType ? (
                  <p className={errorClassName}>{errors.projectType}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="message" className={labelClassName}>
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(event) =>
                    updateField('message', event.target.value)
                  }
                  placeholder={t.messagePlaceholder}
                  className={`${inputClassName} resize-none rounded-[32px]`}
                />
                {errors.message ? (
                  <p className={errorClassName}>{errors.message}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="self-start rounded-3xl px-14 py-6 text-lg text-3sm-navy hover:scale-[1.02]"
                >
                  <span>{isSubmitting ? t.sending : t.submit}</span>
                  <Send />
                </Button>

                {status.type !== 'idle' ? (
                  <p
                    className={
                      status.type === 'success'
                        ? 'text-sm text-emerald-300'
                        : 'text-sm text-red-300'
                    }
                  >
                    {status.message}
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <aside className="space-y-14 lg:col-span-5">
            <div className="glass-card-premium rounded-[40px] border border-white/5 p-10">
              <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
                {t.sidebarHeading}
              </span>

              <p className="mb-8 text-lg font-medium leading-relaxed text-slate-400">
                {t.sidebarText}
              </p>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan">
                  {t.emailLabel}
                </p>
                <a
                  href="mailto:hello@3smstudio.com"
                  className="font-display text-3xl font-bold text-white underline decoration-3sm-cyan/30 underline-offset-8 transition-colors hover:text-3sm-cyan md:text-4xl"
                >
                  hello@3smstudio.com
                </a>
              </div>
            </div>

            <div className="glass-card-premium aspect-video overflow-hidden rounded-[40px] border border-white/10">
              <div className="flex h-full items-end bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_100%)] p-6">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                    {locale === 'pl'
                      ? 'Studio bazowe: Trójmiasto'
                      : 'Base studio: Tricity'}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
