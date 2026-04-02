import type { WorkFilterItem } from './work.types';
import { WORK_ALL_CATEGORY_KEY } from './work.constants';
import {
  buildServiceFilters,
  resolveActiveServiceKey,
} from '@/entities/service/model/service.filters';
import type { Service } from '@/entities/service/model/service.types';

type BuildWorkFiltersOptions = {
  allLabel: string;
};

export function buildWorkFilters(
  services: readonly Service[],
  options: BuildWorkFiltersOptions,
): WorkFilterItem[] {
  return buildServiceFilters(services, {
    allLabel: options.allLabel,
    allKey: WORK_ALL_CATEGORY_KEY,
  });
}

export function resolveActiveWorkCategory(
  rawCategory: string | undefined,
  filters: readonly WorkFilterItem[],
) {
  return resolveActiveServiceKey(rawCategory, filters, WORK_ALL_CATEGORY_KEY);
}
