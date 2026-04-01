import { ContentCategoryFilters } from '@/shared/ContentCategoryFilters';
import { CASE_STUDIES_ALL_CATEGORY_KEY } from '../lib/case-studies.constants';
import type { CaseStudiesFilterItem } from '../lib/case-studies.types';

type CaseStudiesFiltersProps = {
  filters: readonly CaseStudiesFilterItem[];
  activeKey: string;
};

export function CaseStudiesFilters({ filters, activeKey }: CaseStudiesFiltersProps) {
  return (
    <ContentCategoryFilters
      filters={filters}
      activeKey={activeKey}
      paramName="category"
      allKey={CASE_STUDIES_ALL_CATEGORY_KEY}
    />
  );
}
