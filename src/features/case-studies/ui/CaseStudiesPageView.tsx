import { Container } from '@/shared/ui/Container';
import type { Locale } from '@/shared/i18n/routing';
import type {
  CaseStudiesFilterItem,
  CaseStudiesListCopy,
  CaseStudiesListPresentation,
} from '../lib/case-studies.types';
import { CaseStudiesFilters } from './CaseStudiesFilters';
import { CaseStudiesHero } from './CaseStudiesHero';
import { CaseStudyBackground } from './CaseStudyBackground';
import { CaseStudyCard } from './CaseStudyCard';
import { CaseStudyFeaturedCard } from './CaseStudyFeaturedCard';

type CaseStudiesPageViewProps = {
  locale: Locale;
  filters: readonly CaseStudiesFilterItem[];
  activeCategory: string;
  presentation: CaseStudiesListPresentation;
  copy: CaseStudiesListCopy;
};

export function CaseStudiesPageView({
  locale,
  filters,
  activeCategory,
  presentation,
  copy,
}: CaseStudiesPageViewProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <CaseStudyBackground />

      <Container className="relative z-10">
        <CaseStudiesHero badge={copy.badge} title={copy.title} description={copy.description} />

        <CaseStudiesFilters filters={filters} activeKey={activeCategory} />

        {presentation.showFeatured && presentation.featuredItem ? (
          <CaseStudyFeaturedCard
            locale={locale}
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
                locale={locale}
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
    </section>
  );
}
