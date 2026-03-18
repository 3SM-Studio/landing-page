import { siteConfig } from '@/lib/site-config';

export const routes = {
  home: '/',
  services: '/services',
  portfolio: '/portfolio',
  about: '/about',
  contact: '/contact',
  serviceVideo: '/services/video-production',
  servicePhotography: '/services/photography',
  serviceSocialContent: '/services/social-content',
  serviceWebDesignDevelopment: '/services/web-design-development',
} as const;

export function absoluteUrl(path: string = routes.home): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, `${siteConfig.url}/`).toString();
}
