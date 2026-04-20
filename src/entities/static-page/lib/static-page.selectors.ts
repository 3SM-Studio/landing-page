import type { StaticPage, StaticPageSection } from '../model/static-page.types';

export function getStaticPageSection(
  page: StaticPage | null | undefined,
  key: string,
): StaticPageSection | undefined {
  return page?.sections.find((section) => section.key === key);
}
