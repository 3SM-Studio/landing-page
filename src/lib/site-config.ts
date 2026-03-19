import type { Locale } from '@/i18n/routing';

export type SiteLinks = {
  instagram: string;
  x: string;
  youtube: string;
  tiktok: string;
};

export type LocalizedSiteMetadata = {
  language: string;
  locale: string;
  title: string;
  description: string;
  tagline: string;
  ogImageAlt: string;
  twitterImageAlt: string;
  keywords: string[];
};

export type SiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
  url: string;
  domain: string;
  themeColor: string;
  ogImagePath: string;
  twitterImagePath: string;
  socialImageTitle: string;
  socialImageSubtitle: string;
  socialImageAlt: string;
  email: string;
  creator: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  links: SiteLinks;
  shouldIndex: boolean;
};

function normalizeSiteUrl(value?: string) {
  const fallback = 'http://localhost:3000';
  const candidate = value?.trim() || fallback;

  try {
    return new URL(candidate).toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

function isProductionEnvironment() {
  const vercelEnv = process.env.VERCEL_ENV;
  const netlifyContext = process.env.CONTEXT;
  const nodeEnv = process.env.NODE_ENV;

  if (vercelEnv) return vercelEnv === 'production';
  if (netlifyContext) return netlifyContext === 'production';

  return nodeEnv === 'production';
}

const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
const disableIndexing = process.env.DISABLE_INDEXING === 'true';

export const siteConfig: SiteConfig = {
  name: '3SM Studio',
  shortName: '3SM',
  legalName: '3 Stupid Men',
  url: siteUrl,
  domain: new URL(siteUrl).host,
  themeColor: '#020617',
  ogImagePath: '/opengraph-image',
  twitterImagePath: '/twitter-image',
  socialImageTitle: 'Motion, visuals and websites',
  socialImageSubtitle:
    'Creative studio for content, visuals and digital experiences.',
  socialImageAlt: '3SM Studio social preview image',
  email: 'hello@3smstudio.com',
  creator: '@3smstudio',
  location: {
    city: 'Gdańsk',
    region: 'Pomorskie',
    country: 'Poland',
  },
  links: {
    instagram: 'https://instagram.com/3smstudio',
    x: 'https://x.com/3smstudio',
    youtube: 'https://youtube.com/@3smstudio',
    tiktok: 'https://tiktok.com/@3smstudio',
  },
  shouldIndex: isProductionEnvironment() && !disableIndexing,
};

export const siteMetadataByLocale: Record<Locale, LocalizedSiteMetadata> = {
  en: {
    language: 'en',
    locale: 'en_US',
    title:
      '3SM Studio - Creative studio for motion, visuals and digital experiences',
    description:
      '3SM creates motion, visuals, websites and brand experiences for modern brands, creators and companies.',
    tagline: 'Content, visuals and digital for modern brands and projects.',
    ogImageAlt: '3SM Studio - Creative studio for motion, visuals and websites',
    twitterImageAlt:
      '3SM Studio - Creative studio for motion, visuals and websites',
    keywords: [
      '3SM',
      '3SM Studio',
      '3 Stupid Men',
      'creative studio',
      'creative studio Gdansk',
      'video production',
      'photography',
      'social media content',
      'web design',
      'web development',
      'brand content',
      'Tricity',
      'Gdansk',
    ],
  },
  pl: {
    language: 'pl',
    locale: 'pl_PL',
    title:
      '3SM Studio - Studio kreatywne od ruchu, obrazu i doświadczeń cyfrowych',
    description:
      '3SM tworzy video, zdjęcia, social content, strony internetowe i doświadczenia marki dla nowoczesnych marek, twórców i firm.',
    tagline: 'Content, visuals i digital dla nowoczesnych marek i projektów.',
    ogImageAlt:
      '3SM Studio - Studio kreatywne od video, foto i stron internetowych',
    twitterImageAlt:
      '3SM Studio - Studio kreatywne od video, foto i stron internetowych',
    keywords: [
      '3SM',
      '3SM Studio',
      '3 Stupid Men',
      'studio kreatywne',
      'studio kreatywne Gdańsk',
      'produkcja video',
      'fotografia',
      'social media content',
      'strony internetowe',
      'projektowanie stron',
      'development',
      'Trójmiasto',
      'Gdańsk',
    ],
  },
};

export function getSiteMetadata(locale: Locale) {
  return siteMetadataByLocale[locale];
}
