'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/shared/ui/Container';
import type {
  CaseStudiesFilterItem,
  CaseStudiesListCopy,
  CaseStudy,
} from '@/entities/case-study/model/case-studies.types';
import { ContentCategoryFilters } from '@/features/content-category-filter/ui/ContentCategoryFilters';
import { CASE_STUDIES_ALL_CATEGORY_KEY } from '@/entities/case-study/model/case-studies.constants';
import { resolveActiveCaseStudiesCategory } from '@/entities/case-study/model/case-studies.filters';
import { createCaseStudiesListPresentation } from '@/entities/case-study/model/case-studies.selectors';
import { CaseStudiesHero } from '@/entities/case-study/ui/CaseStudiesHero';
import { CaseStudyBackground } from '@/entities/case-study/ui/CaseStudyBackground';
import { CaseStudyCard } from '@/entities/case-study/ui/CaseStudyCard';
import { CaseStudyFeaturedCard } from '@/entities/case-study/ui/CaseStudyFeaturedCard';
import { PageTopSection } from '@/shared/ui/page-top-section/PageTopSection';
import type { Locale } from '@/shared/i18n/routing';
import { PageBreadcrumbs } from '@/shared/ui/PageBreadcrumbs';

type CaseStudiesPageViewProps = {
  locale: Locale;
  filters: readonly CaseStudiesFilterItem[];
  items: CaseStudy[];
  copy: CaseStudiesListCopy;
};

export function CaseStudiesPageView({ locale, filters, items, copy }: CaseStudiesPageViewProps) {
  const searchParams = useSearchParams();
  const rawService = searchParams.get('service') ?? undefined;

  const activeServiceKey = useMemo(
    () => resolveActiveCaseStudiesCategory(rawService, filters),
    [filters, rawService],
  );

  const presentation = useMemo(
    () => createCaseStudiesListPresentation(items, activeServiceKey),
    [items, activeServiceKey],
  );

  return (
    <PageTopSection className="relative overflow-hidden py-24 md:py-32">
      <CaseStudyBackground />

      <Container className="relative z-10">
        <PageBreadcrumbs
          locale={locale}
          items={[{ label: locale === 'pl' ? 'realizacje' : 'case studies' }]}
        />

        <CaseStudiesHero badge={copy.badge} title={copy.title} description={copy.description} />

        <ContentCategoryFilters
          filters={filters}
          activeKey={activeServiceKey}
          allKey={CASE_STUDIES_ALL_CATEGORY_KEY}
          paramName="service"
        />

        {presentation.showFeatured && presentation.featuredItem ? (
          <CaseStudyFeaturedCard
            item={presentation.featuredItem}
            featuredLabel={copy.featuredLabel}
            featuredHint={copy.featuredHint}
          />
        ) : null}

        {presentation.items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {presentation.items.map((item) => (
              <CaseStudyCard
                key={item._id}
                item={item}
                clientLabel={copy.clientLabel}
                viewCaseLabel={copy.viewCase}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <p className="text-lg font-semibold text-white">{copy.empty}</p>
          </div>
        )}
      </Container>
    </PageTopSection>
  );
}
