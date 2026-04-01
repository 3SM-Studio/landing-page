import { ContentCategoryFilters } from '@/shared/ContentCategoryFilters';
import { BLOG_ALL_CATEGORY_KEY } from '../lib/blog.constants';
import type { BlogFilterItem } from '../lib/blog.types';

type BlogFiltersProps = {
  filters: readonly BlogFilterItem[];
  activeKey: string;
};

export function BlogFilters({ filters, activeKey }: BlogFiltersProps) {
  return (
    <ContentCategoryFilters
      filters={filters}
      activeKey={activeKey}
      paramName="category"
      allKey={BLOG_ALL_CATEGORY_KEY}
    />
  );
}
