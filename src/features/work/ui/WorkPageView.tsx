import { Container } from '@/shared/ui/Container';
import type { Locale } from '@/shared/i18n/routing';
import type { WorkFilterItem, WorkListCopy, WorkListPresentation } from '../lib/work.types';
import { FeaturedWorkCard } from './FeaturedWorkCard';
import { WorkBackground } from './WorkBackground';
import { WorkCard } from './WorkCard';
import { WorkFilters } from './WorkFilters';
import { WorkHero } from './WorkHero';

type WorkPageViewProps = {
  locale: Locale;
  filters: readonly WorkFilterItem[];
  activeCategory: string;
  presentation: WorkListPresentation;
  copy: WorkListCopy;
};

export function WorkPageView({
  locale,
  filters,
  activeCategory,
  presentation,
  copy,
}: WorkPageViewProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <WorkBackground />

      <Container className="relative z-10">
        <WorkHero badge={copy.badge} title={copy.title} description={copy.description} />

        <WorkFilters filters={filters} activeKey={activeCategory} />

        {presentation.showFeatured && presentation.featuredItem ? (
          <FeaturedWorkCard
            locale={locale}
            item={presentation.featuredItem}
            featuredLabel={copy.featuredLabel}
            featuredHint={copy.featuredHint}
          />
        ) : null}

        {presentation.items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {presentation.items.map((item) => (
              <WorkCard
                key={item._id}
                locale={locale}
                item={item}
                viewProjectLabel={copy.viewProject}
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
