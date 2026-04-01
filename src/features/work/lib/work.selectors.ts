import { WORK_ALL_CATEGORY_KEY } from './work.constants';
import type { WorkListPresentation, WorkProject } from './work.types';

function selectFeaturedWorkItem(items: WorkProject[]) {
  return items.find((item) => item.featured) ?? items[0];
}

function filterWorkByCategory(items: WorkProject[], activeCategory: string) {
  if (activeCategory === WORK_ALL_CATEGORY_KEY) {
    return items;
  }

  return items.filter((item) => item.category === activeCategory);
}

export function createWorkListPresentation(
  items: WorkProject[],
  activeCategory: string,
): WorkListPresentation {
  const filteredItems = filterWorkByCategory(items, activeCategory);
  const featuredItem =
    activeCategory === WORK_ALL_CATEGORY_KEY ? selectFeaturedWorkItem(filteredItems) : undefined;

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
