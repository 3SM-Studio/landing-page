import type { Locale } from '@/shared/i18n/routing';
import { WORK_ALL_CATEGORY_KEY } from './work.constants';
import { getTranslatedLabel, workCategories } from './work.categories';
import type { WorkFilterItem } from './work.types';

type BuildWorkFiltersOptions = {
  allLabel: string;
};

export function buildWorkFilters(
  locale: Locale,
  options: BuildWorkFiltersOptions,
): WorkFilterItem[] {
  const normalizedCategories = workCategories.filter(
    (category, index, array) =>
      category.key !== WORK_ALL_CATEGORY_KEY &&
      array.findIndex((item) => item.key === category.key) === index,
  );

  return [
    {
      key: WORK_ALL_CATEGORY_KEY,
      label: options.allLabel,
    },
    ...normalizedCategories.map((category) => ({
      key: category.key,
      label: getTranslatedLabel(category.label, locale),
    })),
  ];
}

export function resolveActiveWorkCategory(
  rawCategory: string | undefined,
  filters: readonly WorkFilterItem[],
) {
  if (!rawCategory) {
    return WORK_ALL_CATEGORY_KEY;
  }

  const allowedKeys = new Set(filters.map((filter) => filter.key));

  return allowedKeys.has(rawCategory) ? rawCategory : WORK_ALL_CATEGORY_KEY;
}
