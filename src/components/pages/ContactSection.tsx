'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Locale } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';
import {
  type ContactFormInput,
  type ContactFormValues,
  contactFormSchema,
  projectTypeValues,
} from '@/lib/validation/contact';
import { LocationMap } from '../sections/LocationMap';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

type Props = {
  locale: Locale;
};

const defaultValues: ContactFormInput = {
  name: '',
  email: '',
  projectType: '',
  message: '',
  company: '',
};

export function ContactSection({ locale }: Props) {
  const t = useTranslations('ContactPage');
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const projectOptions = useMemo(() => {
    const labels = t.raw('projectOptions') as Record<(typeof projectTypeValues)[number], string>;

    return projectTypeValues.map((value) => ({
      value,
      label: labels[value],
    }));
  }, [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<ContactFormInput, undefined, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      setStatus({ type: 'idle', message: '' });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          locale,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Request failed');
      }

      reset(defaultValues);
      setStatus({
        type: 'success',
        message: t('success'),
      });
    } catch {
      setStatus({
        type: 'error',
        message: t('error'),
      });
    }
  }

  const inputClassName =
    'w-full rounded-3xl border border-white/10 bg-slate-950/40 px-6 py-5 text-base text-white placeholder:text-slate-500 transition-all outline-none focus:border-3sm-cyan/60 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(56,189,248,0.12)]';
  const labelClassName = 'text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan';
  const errorClassName = 'text-sm text-red-300';

  return (
    <section className="relative pb-40 pt-48">
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
            {t('badge')}
          </div>

          <h2 className="mb-12 font-display text-6xl font-black leading-[0.9] tracking-tight text-white md:text-[100px]">
            {t('titleStart')} <br />
            <span className="bg-gradient-to-r from-3sm-cyan via-3sm-teal to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              {t('titleAccent')}
            </span>
          </h2>

          <p className="max-w-2xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div className="glass-card-premium relative overflow-hidden rounded-[56px] border border-white/5 p-12 md:p-16 lg:col-span-7">
            <div className="absolute -right-10 -top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[80px]" />

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-10" noValidate>
              <div>
                <h3 className="mb-10 font-display text-3xl font-bold text-white">
                  {t('formTitle')}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className={labelClassName}>
                    {t('name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t('namePlaceholder')}
                    className={inputClassName}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    {...register('name', {
                      onChange: () => {
                        clearErrors('name');
                        setStatus({ type: 'idle', message: '' });
                      },
                    })}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className={errorClassName}>
                      {t('errors.name')}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className={labelClassName}>
                    {t('email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className={inputClassName}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    {...register('email', {
                      onChange: () => {
                        clearErrors('email');
                        setStatus({ type: 'idle', message: '' });
                      },
                    })}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className={errorClassName}>
                      {t('errors.email')}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="absolute left-[-9999px] top-auto flex h-px w-px flex-col gap-3 overflow-hidden">
                <label htmlFor="company" className={labelClassName}>
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  className={inputClassName}
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('company')}
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="projectType" className={labelClassName}>
                  {t('projectType')}
                </label>
                <select
                  id="projectType"
                  className={inputClassName}
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? 'contact-project-type-error' : undefined}
                  {...register('projectType', {
                    onChange: () => {
                      clearErrors('projectType');
                      setStatus({ type: 'idle', message: '' });
                    },
                  })}
                >
                  <option value="" disabled>
                    {t('selectPlaceholder')}
                  </option>
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.projectType ? (
                  <p id="contact-project-type-error" className={errorClassName}>
                    {t('errors.projectType')}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="message" className={labelClassName}>
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder={t('messagePlaceholder')}
                  className={`${inputClassName} resize-none rounded-[32px]`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  {...register('message', {
                    onChange: () => {
                      clearErrors('message');
                      setStatus({ type: 'idle', message: '' });
                    },
                  })}
                />
                {errors.message ? (
                  <p id="contact-message-error" className={errorClassName}>
                    {t('errors.message')}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  <span>{isSubmitting ? t('sending') : t('submit')}</span>
                  <Send />
                </Button>

                {status.type !== 'idle' ? (
                  <p
                    role="status"
                    aria-live="polite"
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
                {t('sidebarHeading')}
              </span>

              <p className="mb-8 text-lg font-medium leading-relaxed text-slate-400">
                {t('sidebarText')}
              </p>

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan">
                  {t('emailLabel')}
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-display text-2xl font-bold text-white underline decoration-3sm-cyan/30 underline-offset-8 transition-colors hover:text-3sm-cyan md:text-4xl"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <LocationMap />
          </aside>
        </div>
      </Container>
    </section>
  );
}
