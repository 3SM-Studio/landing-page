export type SiteLinks = {
  instagram: string;
  x: string;
  youtube: string;
  tiktok: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
  title: string;
  description: string;
  tagline: string;
  url: string;
  domain: string;
  locale: string;
  language: string;
  themeColor: string;
  ogImagePath: string;
  ogImageAlt: string;
  twitterImagePath: string;
  twitterImageAlt: string;
  email: string;
  creator: string;
  keywords: string[];
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
  title: '3SM Studio - Video, Foto i Strony Internetowe',
  description:
    '3SM to studio kreatywne tworzące video, zdjęcia, social content i nowoczesne strony internetowe dla marek, twórców i firm.',
  tagline: 'Content, visuals i digital dla nowoczesnych marek i projektów.',
  url: siteUrl,
  domain: new URL(siteUrl).host,
  locale: 'pl_PL',
  language: 'pl',
  themeColor: '#020617',
  ogImagePath: '/opengraph-image',
  ogImageAlt: '3SM Studio - Video, Foto i Strony Internetowe',
  twitterImagePath: '/twitter-image',
  twitterImageAlt: '3SM Studio - Video, Foto i Strony Internetowe',
  email: 'hello@3smstudio.com',
  creator: '@3smstudio',
  keywords: [
    '3SM',
    '3SM Studio',
    '3 Stupid Men',
    'studio kreatywne',
    'studio kreatywne Gdańsk',
    'video production',
    'fotografia',
    'social media content',
    'web design',
    'development',
    'strony internetowe',
    'Trójmiasto',
    'Gdańsk',
  ],
  location: {
    city: 'Gdańsk',
    region: 'Pomorskie',
    country: 'Polska',
  },
  links: {
    instagram: 'https://instagram.com/3smstudio',
    x: 'https://x.com/3smstudio',
    youtube: 'https://youtube.com/@3smstudio',
    tiktok: 'https://tiktok.com/@3smstudio',
  },
  shouldIndex: isProductionEnvironment() && !disableIndexing,
};
