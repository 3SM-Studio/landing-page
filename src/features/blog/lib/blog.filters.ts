import type { Locale } from '@/shared/i18n/routing';
import { BLOG_ALL_CATEGORY_KEY } from './blog.constants';
import { blogCategories, getTranslatedLabel } from './blog.categories';
import type { BlogFilterItem } from './blog.types';

type BuildBlogFiltersOptions = {
  allLabel: string;
};

export function buildBlogFilters(
  locale: Locale,
  options: BuildBlogFiltersOptions,
): BlogFilterItem[] {
  const normalizedCategories = blogCategories.filter(
    (category, index, array) =>
      category.key !== BLOG_ALL_CATEGORY_KEY &&
      array.findIndex((item) => item.key === category.key) === index,
  );

  return [
    {
      key: BLOG_ALL_CATEGORY_KEY,
      label: options.allLabel,
    },
    ...normalizedCategories.map((category) => ({
      key: category.key,
      label: getTranslatedLabel(category.label, locale),
    })),
  ];
}

export function resolveActiveBlogCategory(
  rawCategory: string | undefined,
  filters: readonly BlogFilterItem[],
) {
  if (!rawCategory) {
    return BLOG_ALL_CATEGORY_KEY;
  }

  const allowedKeys = new Set(filters.map((filter) => filter.key));

  return allowedKeys.has(rawCategory) ? rawCategory : BLOG_ALL_CATEGORY_KEY;
}
