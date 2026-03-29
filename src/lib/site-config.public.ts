import type { Locale } from '@/i18n/routing';
import { publicEnv } from '@/lib/public-env';

function normalizePublicSiteUrl(value?: string) {
  const fallback = 'http://localhost:3000';
  const candidate = value?.trim() || fallback;

  try {
    return new URL(candidate).toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

export type SiteLinks = {
  instagram: string;
  x: string;
  youtube: string;
  tiktok: string;
};

export type SiteAddress = {
  streetAddress?: string;
  postalCode?: string;
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
};

export type LocalizedSiteMetadata = {
  language: string;
  locale: string;
  title: string;
  description: string;
  tagline: string;
  ogImageAlt: string;
  twitterImageAlt: string;
  socialImageTitle: string;
  socialImageSubtitle: string;
  socialImageFooter: string;
  keywords: string[];
};

export type PublicSiteConfig = {
  name: string;
  shortName: string;
  legalName: string;
  themeColor: string;
  url: string;
  ogImagePath: string;
  twitterImagePath: string;
  email: string;
  phone: string;
  creator: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  boundaryPlaceId?: string;
  address?: SiteAddress;
  links: SiteLinks;
};

export const publicSiteConfig: PublicSiteConfig = {
  name: '3 Stupid Men',
  shortName: '3SM',
  legalName: '3 Stupid Men',
  themeColor: '#020617',
  url: normalizePublicSiteUrl(publicEnv.NEXT_PUBLIC_SITE_URL),
  ogImagePath: '/opengraph-image',
  twitterImagePath: '/twitter-image',
  email: 'hello@3stupidmen.com',
  phone: '+48 798 659 783',
  creator: '@3StupidMen',
  location: {
    city: 'Sopot',
    region: 'Pomorskie',
    country: 'Poland',
  },
  coordinates: {
    lat: 54.4416,
    lng: 18.5601,
  },
  boundaryPlaceId: 'ChIJXyYcTJEK_UYR-pV6bzMZ0_c',
  address: {
    streetAddress: 'Aleja Niepodległości 777',
    postalCode: '81-805',
    addressLocality: 'Sopot',
    addressRegion: 'Pomorskie',
    addressCountry: 'PL',
  },
  links: {
    instagram: 'https://instagram.com/3StupidMen',
    x: 'https://x.com/3StupidMen',
    youtube: 'https://youtube.com/@3StupidMen',
    tiktok: 'https://tiktok.com/@3StupidMen',
  },
};

export const siteMetadataByLocale = {
  en: {
    language: 'en',
    locale: 'en_US',
    title: '3SM Studio - Creative studio for motion, visuals and digital experiences',
    description:
      '3SM creates motion, visuals, websites and brand experiences for modern brands, creators and companies.',
    tagline: 'Content, visuals and digital for modern brands and projects.',
    ogImageAlt: '3SM Studio - Creative studio for motion, visuals and websites',
    twitterImageAlt: '3SM Studio - Creative studio for motion, visuals and websites',
    socialImageTitle: 'Motion, visuals and websites',
    socialImageSubtitle: 'Creative studio for content, visuals and digital experiences.',
    socialImageFooter: 'Content - Visuals - Digital',
    keywords: [
      '3SM',
      '3SM Studio',
      '3 Stupid Men',
      'creative studio',
      'creative studio Sopot',
      'video production',
      'photography',
      'social media content',
      'web design',
      'web development',
      'brand content',
      'Tricity',
      'Sopot',
    ],
  },
  pl: {
    language: 'pl',
    locale: 'pl_PL',
    title: '3SM Studio - Studio kreatywne od ruchu, obrazu i doświadczeń cyfrowych',
    description:
      '3SM tworzy video, zdjęcia, social content, strony internetowe i doświadczenia marki dla nowoczesnych marek, twórców i firm.',
    tagline: 'Content, visuals i digital dla nowoczesnych marek i projektów.',
    ogImageAlt: '3SM Studio - Studio kreatywne od video, foto i stron internetowych',
    twitterImageAlt: '3SM Studio - Studio kreatywne od video, foto i stron internetowych',
    socialImageTitle: 'Video, foto i strony internetowe',
    socialImageSubtitle: 'Studio kreatywne dla contentu, wizualiów i doświadczeń cyfrowych.',
    socialImageFooter: 'Content - Wizualia - Digital',
    keywords: [
      '3SM',
      '3SM Studio',
      '3 Stupid Men',
      'studio kreatywne',
      'studio kreatywne Sopot',
      'produkcja video',
      'fotografia',
      'social media content',
      'strony internetowe',
      'projektowanie stron',
      'development',
      'Trójmiasto',
      'Sopot',
    ],
  },
} as const satisfies Record<Locale, LocalizedSiteMetadata>;

export function getSiteMetadata(locale: Locale): LocalizedSiteMetadata {
  return siteMetadataByLocale[locale];
}
