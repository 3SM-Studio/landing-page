import type { Service } from '@/entities/service/model/service.types';
import {
  buildServiceFilters,
  resolveActiveServiceKey,
} from '@/entities/service/model/service.filters';
import { CASE_STUDIES_ALL_CATEGORY_KEY } from './case-studies.constants';
import type { CaseStudiesFilterItem } from './case-studies.types';

type BuildCaseStudiesFiltersOptions = {
  allLabel: string;
};

export function buildCaseStudiesFilters(
  services: readonly Service[],
  options: BuildCaseStudiesFiltersOptions,
): CaseStudiesFilterItem[] {
  return buildServiceFilters(services, {
    allLabel: options.allLabel,
    allKey: CASE_STUDIES_ALL_CATEGORY_KEY,
  });
}

export function resolveActiveCaseStudiesCategory(
  rawCategory: string | undefined,
  filters: readonly CaseStudiesFilterItem[],
) {
  return resolveActiveServiceKey(rawCategory, filters, CASE_STUDIES_ALL_CATEGORY_KEY);
}
