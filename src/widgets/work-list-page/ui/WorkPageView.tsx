'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/shared/ui/Container';
import type {
  WorkFilterItem,
  WorkListCopy,
  WorkProject,
} from '@/entities/work-project/model/work.types';
import { ContentCategoryFilters } from '@/features/content-category-filter/ui/ContentCategoryFilters';
import { WORK_ALL_CATEGORY_KEY } from '@/entities/work-project/model/work.constants';
import { resolveActiveWorkCategory } from '@/entities/work-project/model/work.filters';
import { createWorkListPresentation } from '@/entities/work-project/model/work.selectors';
import { FeaturedWorkCard } from '@/entities/work-project/ui/FeaturedWorkCard';
import { WorkBackground } from '@/entities/work-project/ui/WorkBackground';
import { WorkCard } from '@/entities/work-project/ui/WorkCard';
import { WorkHero } from '@/entities/work-project/ui/WorkHero';

type WorkPageViewProps = {
  filters: readonly WorkFilterItem[];
  items: WorkProject[];
  copy: WorkListCopy;
};

export function WorkPageView({ filters, items, copy }: WorkPageViewProps) {
  const searchParams = useSearchParams();
  const rawService = searchParams.get('service') ?? undefined;

  const activeServiceKey = useMemo(
    () => resolveActiveWorkCategory(rawService, filters),
    [filters, rawService],
  );

  const presentation = useMemo(
    () => createWorkListPresentation(items, activeServiceKey),
    [items, activeServiceKey],
  );

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <WorkBackground />

      <Container className="relative z-10">
        <WorkHero badge={copy.badge} title={copy.title} description={copy.description} />

        <ContentCategoryFilters
          filters={filters}
          activeKey={activeServiceKey}
          allKey={WORK_ALL_CATEGORY_KEY}
          paramName="service"
        />

        {presentation.showFeatured && presentation.featuredItem ? (
          <FeaturedWorkCard
            item={presentation.featuredItem}
            featuredLabel={copy.featuredLabel}
            featuredHint={copy.featuredHint}
          />
        ) : null}

        {presentation.items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {presentation.items.map((item) => (
              <WorkCard key={item._id} item={item} viewProjectLabel={copy.viewProject} />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <p className="text-lg font-semibold text-white">{copy.empty}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
