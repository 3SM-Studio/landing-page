import { routes } from '@/shared/lib/routes';

export const navigation = [
  { labelKey: 'services', href: routes.services },
  { labelKey: 'work', href: routes.work },
  { labelKey: 'caseStudies', href: routes.caseStudies },
  { labelKey: 'blog', href: routes.blog },
  { labelKey: 'about', href: routes.about },
] as const;
