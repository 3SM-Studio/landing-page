import type { Locale } from '@/shared/i18n/routing';
import { CASE_STUDIES_ALL_CATEGORY_KEY } from './case-studies.constants';
import { caseStudiesCategories, getTranslatedLabel } from './case-studies.categories';
import type { CaseStudiesFilterItem } from './case-studies.types';

type BuildCaseStudiesFiltersOptions = {
  allLabel: string;
};

export function buildCaseStudiesFilters(
  locale: Locale,
  options: BuildCaseStudiesFiltersOptions,
): CaseStudiesFilterItem[] {
  const normalizedCategories = caseStudiesCategories.filter(
    (category, index, array) =>
      category.key !== CASE_STUDIES_ALL_CATEGORY_KEY &&
      array.findIndex((item) => item.key === category.key) === index,
  );

  return [
    {
      key: CASE_STUDIES_ALL_CATEGORY_KEY,
      label: options.allLabel,
    },
    ...normalizedCategories.map((category) => ({
      key: category.key,
      label: getTranslatedLabel(category.label, locale),
    })),
  ];
}

export function resolveActiveCaseStudiesCategory(
  rawCategory: string | undefined,
  filters: readonly CaseStudiesFilterItem[],
) {
  if (!rawCategory) {
    return CASE_STUDIES_ALL_CATEGORY_KEY;
  }

  const allowedKeys = new Set(filters.map((filter) => filter.key));

  return allowedKeys.has(rawCategory) ? rawCategory : CASE_STUDIES_ALL_CATEGORY_KEY;
}
