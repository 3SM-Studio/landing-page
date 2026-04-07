'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { ContactServiceOption } from '@/entities/service/model/service.types';
import type { Locale } from '@/shared/i18n/routing';
import { contactFormSchema } from '@/shared/validation/contact';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Field, FieldDescription, FieldLabel } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import {
  defaultValues,
  errorClassName,
  labelClassName,
  textareaClassName,
} from '@/features/contact-form/model/contact.constants';
import {
  buildServiceOptions,
  normalizeContactPayload,
} from '@/features/contact-form/model/contact.utils';
import type {
  ContactFormResponse,
  ContactFormStatus,
} from '@/features/contact-form/model/contact.types';
import type { ContactFormInput } from '@/features/contact-form/model/contact-form.shared';
import { RequiredAsterisk } from './RequiredAsterisk';
import { Textarea } from '@/shared/ui/Textarea';

type ContactFormProps = {
  locale: Locale;
  services: ContactServiceOption[];
};

export function ContactForm({ locale, services }: ContactFormProps) {
  const t = useTranslations('ContactPage');

  const [status, setStatus] = useState<ContactFormStatus>({
    type: 'idle',
    message: '',
  });

  const serviceOptions = useMemo(() => buildServiceOptions(services, locale), [services, locale]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<ContactFormInput>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormInput) {
    try {
      setStatus({ type: 'idle', message: '' });

      const payload = normalizeContactPayload(values, locale);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactFormResponse;

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

  function clearFieldState(fieldName: keyof ContactFormInput) {
    clearErrors(fieldName);
    setStatus({ type: 'idle', message: '' });
  }

  return (
    <Card variant="premium" className="relative rounded-[56px] p-12 md:p-16 lg:col-span-7">
      <div className="absolute -right-10 -top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[80px]" />

      <form
        onSubmit={handleSubmit((values) => {
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
                  onChange: () => clearFieldState('firstName'),
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
                  onChange: () => clearFieldState('lastName'),
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
                  onChange: () => clearFieldState('email'),
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
                  onChange: () => clearFieldState('phone'),
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
            <FieldLabel htmlFor="serviceKey" className={labelClassName}>
              {t('projectType')}
              <RequiredAsterisk />
            </FieldLabel>

            <Controller
              name="serviceKey"
              control={control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => {
                    clearFieldState('serviceKey');
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger
                    id="serviceKey"
                    aria-required="true"
                    aria-invalid={Boolean(errors.serviceKey)}
                    aria-describedby={errors.serviceKey ? 'contact-service-key-error' : undefined}
                  >
                    <SelectValue placeholder={t('selectPlaceholder')} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.serviceKey ? (
              <p id="contact-service-key-error" className={errorClassName}>
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
            <Textarea
              id="message"
              rows={6}
              placeholder={t('messagePlaceholder')}
              className={textareaClassName}
              required
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              {...register('message', {
                onChange: () => clearFieldState('message'),
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
                  status.type === 'success' ? 'text-sm text-emerald-300' : 'text-sm text-red-300'
                }
              >
                {status.message}
              </p>
            ) : null}
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
