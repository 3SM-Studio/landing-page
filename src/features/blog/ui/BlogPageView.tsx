import { Container } from '@/shared/ui/Container';
import type { Locale } from '@/shared/i18n/routing';
import type { BlogFilterItem, BlogListCopy, BlogListPresentation } from '../lib/blog.types';
import { BlogBackground } from './BlogBackground';
import { BlogFilters } from './BlogFilters';
import { BlogHero } from './BlogHero';
import { BlogPostCard } from './BlogPostCard';
import { FeaturedBlogPostCard } from './FeaturedBlogPostCard';

type BlogPageViewProps = {
  locale: Locale;
  filters: readonly BlogFilterItem[];
  activeCategory: string;
  presentation: BlogListPresentation;
  copy: BlogListCopy;
};

export function BlogPageView({
  locale,
  filters,
  activeCategory,
  presentation,
  copy,
}: BlogPageViewProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <BlogBackground />

      <Container className="relative z-10">
        <BlogHero badge={copy.badge} title={copy.title} description={copy.description} />

        <BlogFilters filters={filters} activeKey={activeCategory} />

        {presentation.showFeatured && presentation.featuredPost ? (
          <FeaturedBlogPostCard
            locale={locale}
            post={presentation.featuredPost}
            featuredLabel={copy.featuredLabel}
            featuredHint={copy.featuredHint}
          />
        ) : null}

        {presentation.posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {presentation.posts.map((post) => (
              <BlogPostCard
                key={post._id}
                locale={locale}
                post={post}
                readMoreLabel={copy.readMore}
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
