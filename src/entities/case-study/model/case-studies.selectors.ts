import { CASE_STUDIES_ALL_CATEGORY_KEY } from './case-studies.constants';
import type { CaseStudiesListPresentation, CaseStudy } from './case-studies.types';

function selectFeaturedCaseStudy(items: CaseStudy[]) {
  return (
    items.find((item) => item.isFeaturedGlobal) ?? items.find((item) => item.featured) ?? items[0]
  );
}

function filterCaseStudiesByCategory(items: CaseStudy[], activeCategory: string) {
  if (activeCategory === CASE_STUDIES_ALL_CATEGORY_KEY) {
    return items;
  }

  return items.filter((item) => item.primaryService?.serviceKey === activeCategory);
}

export function createCaseStudiesListPresentation(
  items: CaseStudy[],
  activeCategory: string,
): CaseStudiesListPresentation {
  const filteredItems = filterCaseStudiesByCategory(items, activeCategory);
  const featuredItem =
    activeCategory === CASE_STUDIES_ALL_CATEGORY_KEY ? selectFeaturedCaseStudy(items) : undefined;

  if (!featuredItem) {
    return {
      featuredItem: undefined,
      items: filteredItems,
      showFeatured: false,
    };
  }

  return {
    featuredItem,
    items: filteredItems.filter((item) => item._id !== featuredItem._id),
    showFeatured: true,
  };
}
