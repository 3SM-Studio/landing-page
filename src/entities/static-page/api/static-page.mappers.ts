import type { PortableTextBlock } from 'next-sanity';
import type { Locale } from '@/shared/i18n/routing';
import type {
  StaticPage,
  StaticPageCta,
  StaticPageFeatureItem,
  StaticPageKey,
  StaticPageSection,
} from '../model/static-page.types';

type RawLocalizedValue<T> = {
  language?: string | null;
  value?: T | null;
};

type RawStaticPageFeatureItem = {
  key?: string | null;
  eyebrow?: RawLocalizedValue<string>[] | null;
  title?: RawLocalizedValue<string>[] | null;
  subtitle?: RawLocalizedValue<string>[] | null;
  summary?: RawLocalizedValue<string>[] | null;
  listItems?: RawLocalizedValue<string[]>[] | null;
  href?: string | null;
  isHighlighted?: boolean | null;
};

type RawStaticPageSection = {
  key?: string | null;
  variant?: string | null;
  eyebrow?: RawLocalizedValue<string>[] | null;
  title?: RawLocalizedValue<string>[] | null;
  summary?: RawLocalizedValue<string>[] | null;
  body?: RawLocalizedValue<PortableTextBlock[]>[] | null;
  highlights?: RawLocalizedValue<string[]>[] | null;
  showInPageNavigation?: boolean | null;
  items?: RawStaticPageFeatureItem[] | null;
};

type RawStaticPageCta = {
  label?: RawLocalizedValue<string>[] | null;
  href?: string | null;
  openInNewTab?: boolean | null;
};

type RawStaticPage = {
  pageKey?: string | null;
  title?: RawLocalizedValue<string>[] | null;
  eyebrow?: RawLocalizedValue<string>[] | null;
  hero?: {
    badge?: RawLocalizedValue<string>[] | null;
    title?: RawLocalizedValue<string>[] | null;
    description?: RawLocalizedValue<string>[] | null;
    primaryCta?: RawStaticPageCta | null;
    secondaryCta?: RawStaticPageCta | null;
  } | null;
  heroSummary?: RawLocalizedValue<string>[] | null;
  intro?: RawLocalizedValue<PortableTextBlock[]>[] | null;
  showPageNavigation?: boolean | null;
  sections?: RawStaticPageSection[] | null;
  seo?: {
    title?: RawLocalizedValue<string>[] | null;
    description?: RawLocalizedValue<string>[] | null;
    noIndex?: boolean | null;
    keywords?: RawLocalizedValue<string[]>[] | null;
  } | null;
};

function cleanOptionalString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized ? normalized : undefined;
  }

  if (value && typeof value === 'object' && 'value' in value) {
    return cleanOptionalString((value as { value?: unknown }).value);
  }

  return undefined;
}

function pickLocalizedValue<T>(
  values: RawLocalizedValue<T>[] | null | undefined,
  locale: Locale,
  fallbackLocale: Locale = 'en',
): T | undefined {
  if (!Array.isArray(values) || values.length === 0) {
    return undefined;
  }

  const localizedValue = values.find((item) => item?.language === locale)?.value;
  if (localizedValue !== undefined && localizedValue !== null) {
    return localizedValue;
  }

  const fallbackValue = values.find((item) => item?.language === fallbackLocale)?.value;
  return fallbackValue !== undefined && fallbackValue !== null ? fallbackValue : undefined;
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  const normalized = value
    .flatMap((item) => {
      if (typeof item === 'string') {
        return [item];
      }

      if (item && typeof item === 'object' && 'value' in item) {
        const nestedValue = (item as { value?: unknown }).value;

        if (Array.isArray(nestedValue)) {
          return nestedValue.flatMap((nestedItem) =>
            typeof nestedItem === 'string' ? [nestedItem] : [],
          );
        }

        if (typeof nestedValue === 'string') {
          return [nestedValue];
        }
      }

      return [];
    })
    .map((item) => item.trim())
    .filter((item): item is string => Boolean(item));

  return normalized.length > 0 ? normalized : undefined;
}

function normalizePortableText(
  value: RawLocalizedValue<PortableTextBlock[]>[] | null | undefined,
  locale: Locale,
): PortableTextBlock[] | undefined {
  const localizedValue = pickLocalizedValue(value, locale);
  return Array.isArray(localizedValue) && localizedValue.length > 0 ? localizedValue : undefined;
}

function mapCta(
  value: RawStaticPageCta | null | undefined,
  locale: Locale,
): StaticPageCta | undefined {
  const label = cleanOptionalString(pickLocalizedValue(value?.label, locale));
  const href = cleanOptionalString(value?.href);

  if (!label || !href) {
    return undefined;
  }

  return {
    label,
    href,
    openInNewTab: value?.openInNewTab === true,
  };
}

function mapFeatureItem(
  item: RawStaticPageFeatureItem,
  locale: Locale,
): StaticPageFeatureItem | null {
  const key = cleanOptionalString(item.key);
  const title = cleanOptionalString(pickLocalizedValue(item.title, locale));

  if (!key || !title) {
    return null;
  }

  return {
    key,
    eyebrow: cleanOptionalString(pickLocalizedValue(item.eyebrow, locale)),
    title,
    subtitle: cleanOptionalString(pickLocalizedValue(item.subtitle, locale)),
    summary: cleanOptionalString(pickLocalizedValue(item.summary, locale)),
    listItems: normalizeStringArray(pickLocalizedValue(item.listItems, locale)),
    href: cleanOptionalString(item.href),
    isHighlighted: item.isHighlighted === true,
  };
}

function mapSection(item: RawStaticPageSection, locale: Locale): StaticPageSection | null {
  const key = cleanOptionalString(item.key);
  const title = cleanOptionalString(pickLocalizedValue(item.title, locale));

  if (!key || !title) {
    return null;
  }

  const items = (item.items ?? [])
    .map((featureItem) => mapFeatureItem(featureItem, locale))
    .filter((featureItem): featureItem is StaticPageFeatureItem => Boolean(featureItem));

  return {
    key,
    variant: cleanOptionalString(item.variant) || 'default',
    eyebrow: cleanOptionalString(pickLocalizedValue(item.eyebrow, locale)),
    title,
    summary: cleanOptionalString(pickLocalizedValue(item.summary, locale)),
    body: normalizePortableText(item.body, locale),
    highlights: normalizeStringArray(pickLocalizedValue(item.highlights, locale)),
    showInPageNavigation: item.showInPageNavigation !== false,
    items: items.length > 0 ? items : undefined,
  };
}

export function mapRawStaticPageToStaticPage(
  value: RawStaticPage | null,
  locale: Locale,
): StaticPage | null {
  const pageKey = cleanOptionalString(value?.pageKey) as StaticPageKey | undefined;
  const title = cleanOptionalString(pickLocalizedValue(value?.title, locale));
  const heroTitle = cleanOptionalString(pickLocalizedValue(value?.hero?.title, locale));
  const heroDescription = cleanOptionalString(pickLocalizedValue(value?.hero?.description, locale));

  if (!pageKey || !title || !heroTitle || !heroDescription) {
    return null;
  }

  const sections = (value?.sections ?? [])
    .map((section) => mapSection(section, locale))
    .filter((section): section is StaticPageSection => Boolean(section));

  return {
    pageKey,
    locale,
    title,
    eyebrow: cleanOptionalString(pickLocalizedValue(value?.eyebrow, locale)),
    hero: {
      badge: cleanOptionalString(pickLocalizedValue(value?.hero?.badge, locale)),
      title: heroTitle,
      description: heroDescription,
      primaryCta: mapCta(value?.hero?.primaryCta, locale),
      secondaryCta: mapCta(value?.hero?.secondaryCta, locale),
    },
    heroSummary: cleanOptionalString(pickLocalizedValue(value?.heroSummary, locale)),
    intro: normalizePortableText(value?.intro, locale),
    sections,
    showPageNavigation: value?.showPageNavigation === true,
    seo: value?.seo
      ? {
          title: cleanOptionalString(pickLocalizedValue(value.seo.title, locale)),
          description: cleanOptionalString(pickLocalizedValue(value.seo.description, locale)),
          noIndex: value.seo.noIndex === true,
          keywords: normalizeStringArray(pickLocalizedValue(value.seo.keywords, locale)),
        }
      : undefined,
  };
}

export type { RawStaticPage };
