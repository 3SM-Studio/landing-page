'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { Locale } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';
import { projectTypeValues, type ContactFormInput } from '@/lib/contact-form.shared';
import { LocationMap } from '../sections/LocationMap';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Container } from '../ui/Container';
import { Field, FieldDescription, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

type Props = {
  locale: Locale;
};

type FormResponse = {
  ok: boolean;
  message?: string;
};

const defaultValues: ContactFormInput = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  projectType: '',
  message: '',
  company: '',
};

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RequiredAsterisk() {
  return (
    <span aria-hidden="true" className="ml-1 text-red-400">
      *
    </span>
  );
}

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
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm<ContactFormInput>({
    defaultValues,
    mode: 'onBlur',
  });

  async function onSubmit(values: ContactFormInput) {
    try {
      setStatus({ type: 'idle', message: '' });

      const payload: ContactFormInput & { locale: Locale } = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        projectType: values.projectType,
        message: values.message.trim(),
        company: values.company.trim(),
        locale,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as FormResponse;

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

  const labelClassName = 'text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan';
  const errorClassName = 'text-sm text-red-300';

  const textareaClassName =
    'w-full rounded-[32px] border border-white/10 bg-slate-950/40 px-6 py-5 text-base text-white placeholder:text-slate-500 transition-all outline-none resize-none focus:border-3sm-cyan/60 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(56,189,248,0.12)] aria-invalid:border-red-400/60 aria-invalid:shadow-[0_0_20px_rgba(248,113,113,0.12)]';

  return (
    <section className="relative -mt-(--header-offset) pb-40 pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-175 w-175 rounded-full bg-sky-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-150 w-150 rounded-full bg-teal-600/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[30%] h-125 w-125 rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute -left-40 -top-20 select-none font-display text-[18rem] font-black leading-none text-3sm-cyan/3 md:text-[30rem]">
          3
        </div>
      </div>

      <Container>
        <div className="mb-32">
          <div className="glass-panel-luxe mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
            <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
            {t('badge')}
          </div>

          <h2 className="mb-12 font-display text-[46px] font-black leading-[0.9] tracking-tight text-white sm:text-6xl md:text-[100px]">
            {t('titleStart')} <br />
            <span className="bg-linear-to-r from-3sm-cyan via-3sm-teal to-indigo-400 bg-size-[200%_auto] bg-clip-text text-[50px] text-transparent sm:text-6xl md:text-[100px]">
              {t('titleAccent')}
            </span>
          </h2>

          <p className="max-w-2xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <Card variant="premium" className="relative rounded-[56px] p-12 md:p-16 lg:col-span-7">
            <div className="absolute -right-10 -top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[80px]" />

            <form
              onSubmit={handleSubmit((values) => {
                if (!values.projectType) {
                  setError('projectType', { type: 'required' });
                  return;
                }

                void onSubmit(values);
              })}
              className="relative z-10 space-y-10"
              noValidate
            >
              <CardHeader className="px-0">
                <CardTitle className="text-3xl font-bold text-white">{t('formTitle')}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-10 px-0">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Field className="flex flex-col gap-3">
                    <FieldLabel htmlFor="firstName" className={labelClassName}>
                      {t('firstName')}
                      <RequiredAsterisk />
                    </FieldLabel>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={t('firstNamePlaceholder')}
                      autoComplete="given-name"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={errors.firstName ? 'contact-first-name-error' : undefined}
                      {...register('firstName', {
                        required: true,
                        validate: (value) => value.trim().length >= 2,
                        onChange: () => {
                          clearErrors('firstName');
                          setStatus({ type: 'idle', message: '' });
                        },
                      })}
                    />
                    {errors.firstName ? (
                      <p id="contact-first-name-error" className={errorClassName}>
                        {t('errors.firstName')}
                      </p>
                    ) : (
                      <FieldDescription>{t('firstNameDescription')}</FieldDescription>
                    )}
                  </Field>

                  <Field className="flex flex-col gap-3">
                    <FieldLabel htmlFor="lastName" className={labelClassName}>
                      {t('lastName')}
                    </FieldLabel>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={t('lastNamePlaceholder')}
                      autoComplete="family-name"
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={errors.lastName ? 'contact-last-name-error' : undefined}
                      {...register('lastName', {
                        validate: (value) => value.trim() === '' || value.trim().length >= 2,
                        onChange: () => {
                          clearErrors('lastName');
                          setStatus({ type: 'idle', message: '' });
                        },
                      })}
                    />
                    {errors.lastName ? (
                      <p id="contact-last-name-error" className={errorClassName}>
                        {t('errors.lastName')}
                      </p>
                    ) : (
                      <FieldDescription>{t('lastNameDescription')}</FieldDescription>
                    )}
                  </Field>

                  <Field className="flex flex-col gap-3 md:col-span-2">
                    <FieldLabel htmlFor="email" className={labelClassName}>
                      {t('email')}
                      <RequiredAsterisk />
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      {...register('email', {
                        required: true,
                        validate: (value) => emailRegex.test(value.trim()),
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
                    ) : (
                      <FieldDescription>{t('emailDescription')}</FieldDescription>
                    )}
                  </Field>

                  <Field className="flex flex-col gap-3 md:col-span-2">
                    <FieldLabel htmlFor="phone" className={labelClassName}>
                      {t('phone')}
                    </FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('phonePlaceholder')}
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      {...register('phone', {
                        validate: (value) => {
                          const trimmed = value.trim();
                          return trimmed === '' || phoneRegex.test(trimmed);
                        },
                        onChange: () => {
                          clearErrors('phone');
                          setStatus({ type: 'idle', message: '' });
                        },
                      })}
                    />
                    {errors.phone ? (
                      <p id="contact-phone-error" className={errorClassName}>
                        {t('errors.phone')}
                      </p>
                    ) : (
                      <FieldDescription>{t('phoneDescription')}</FieldDescription>
                    )}
                  </Field>
                </div>

                <div className="absolute -left-2499.75 top-auto flex h-px w-px flex-col gap-3 overflow-hidden">
                  <FieldLabel htmlFor="company" className={labelClassName}>
                    Company
                  </FieldLabel>
                  <Input
                    id="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('company')}
                  />
                </div>

                <Field className="flex flex-col gap-3">
                  <FieldLabel htmlFor="projectType" className={labelClassName}>
                    {t('projectType')}
                    <RequiredAsterisk />
                  </FieldLabel>

                  <Controller
                    name="projectType"
                    control={control}
                    rules={{
                      validate: (value) =>
                        projectTypeValues.includes(value as (typeof projectTypeValues)[number]),
                    }}
                    render={({ field }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) => {
                          clearErrors('projectType');
                          setStatus({ type: 'idle', message: '' });
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger
                          id="projectType"
                          aria-required="true"
                          aria-invalid={Boolean(errors.projectType)}
                          aria-describedby={
                            errors.projectType ? 'contact-project-type-error' : undefined
                          }
                        >
                          <SelectValue placeholder={t('selectPlaceholder')} />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {projectOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.projectType ? (
                    <p id="contact-project-type-error" className={errorClassName}>
                      {t('errors.projectType')}
                    </p>
                  ) : (
                    <FieldDescription>{t('projectTypeDescription')}</FieldDescription>
                  )}
                </Field>

                <Field className="flex flex-col gap-3">
                  <FieldLabel htmlFor="message" className={labelClassName}>
                    {t('message')}
                    <RequiredAsterisk />
                  </FieldLabel>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder={t('messagePlaceholder')}
                    className={textareaClassName}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    {...register('message', {
                      required: true,
                      validate: (value) => value.trim().length >= 20,
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
                  ) : (
                    <FieldDescription>{t('messageDescription')}</FieldDescription>
                  )}
                </Field>

                <div className="flex flex-col gap-4">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    <span>{isSubmitting ? t('sending') : t('submit')}</span>
                    <Send aria-hidden="true" />
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
              </CardContent>
            </form>
          </Card>

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
