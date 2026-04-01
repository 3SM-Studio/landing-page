import { ContentCategoryFilters } from '@/shared/ContentCategoryFilters';
import { WORK_ALL_CATEGORY_KEY } from '../lib/work.constants';
import type { WorkFilterItem } from '../lib/work.types';

type WorkFiltersProps = {
  filters: readonly WorkFilterItem[];
  activeKey: string;
};

export function WorkFilters({ filters, activeKey }: WorkFiltersProps) {
  return (
    <ContentCategoryFilters
      filters={filters}
      activeKey={activeKey}
      paramName="category"
      allKey={WORK_ALL_CATEGORY_KEY}
    />
  );
}
