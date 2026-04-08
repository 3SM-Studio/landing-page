import { cache } from 'react';
import type { AbstractIntlMessages } from 'next-intl';
import type { Locale } from '@/shared/i18n/routing';

import commonEn from '@/messages/common/en.json';
import commonPl from '@/messages/common/pl.json';
import footerEn from '@/messages/layout/footer/en.json';
import footerPl from '@/messages/layout/footer/pl.json';
import headerEn from '@/messages/layout/header/en.json';
import headerPl from '@/messages/layout/header/pl.json';
import aboutEn from '@/messages/pages/about/en.json';
import aboutPl from '@/messages/pages/about/pl.json';
import blogEn from '@/messages/pages/blog/en.json';
import blogPl from '@/messages/pages/blog/pl.json';
import clientsEn from '@/messages/pages/clients/en.json';
import clientsPl from '@/messages/pages/clients/pl.json';
import partnersEn from '@/messages/pages/partners/en.json';
import partnersPl from '@/messages/pages/partners/pl.json';
import caseStudiesEn from '@/messages/pages/case-studies/en.json';
import caseStudiesPl from '@/messages/pages/case-studies/pl.json';
import contactEn from '@/messages/pages/contact/en.json';
import contactPl from '@/messages/pages/contact/pl.json';
import homeEn from '@/messages/pages/home/en.json';
import homePl from '@/messages/pages/home/pl.json';
import servicesEn from '@/messages/pages/services/en.json';
import servicesPl from '@/messages/pages/services/pl.json';
import workEn from '@/messages/pages/work/en.json';
import workPl from '@/messages/pages/work/pl.json';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const merged = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const existing = merged[key];

    if (isRecord(existing) && isRecord(value)) {
      merged[key] = deepMerge(existing, value);
      continue;
    }

    merged[key] = value;
  }

  return merged;
}

const messageRegistry = {
  en: [
    commonEn,
    headerEn,
    footerEn,
    homeEn,
    aboutEn,
    servicesEn,
    contactEn,
    workEn,
    caseStudiesEn,
    blogEn,
    clientsEn,
    partnersEn,
  ],
  pl: [
    commonPl,
    headerPl,
    footerPl,
    homePl,
    aboutPl,
    servicesPl,
    contactPl,
    workPl,
    caseStudiesPl,
    blogPl,
    clientsPl,
    partnersPl,
  ],
} as const satisfies Record<Locale, readonly Record<string, unknown>[]>;

export const getLocaleMessages = cache(async (locale: Locale): Promise<AbstractIntlMessages> => {
  const registry = messageRegistry[locale];
  let messages: Record<string, unknown> = {};

  for (const section of registry) {
    messages = deepMerge(messages, section);
  }

  return messages as AbstractIntlMessages;
});
