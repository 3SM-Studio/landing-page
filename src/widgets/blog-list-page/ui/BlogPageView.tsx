'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/shared/ui/Container';
import type { Locale } from '@/shared/i18n/routing';
import type { BlogFilterItem, BlogListCopy, BlogPost } from '@/entities/blog/model/blog.types';
import { ContentCategoryFilters } from '@/features/content-category-filter/ui/ContentCategoryFilters';
import { BlogBackground } from '@/entities/blog/ui/BlogBackground';
import { BLOG_ALL_CATEGORY_KEY } from '@/entities/blog/model/blog.constants';
import { resolveActiveBlogCategory } from '@/entities/blog/model/blog.filters';
import { createBlogListPresentation } from '@/entities/blog/model/blog.selectors';
import { BlogHero } from '@/entities/blog/ui/BlogHero';
import { BlogPostCard } from '@/entities/blog/ui/BlogPostCard';
import { FeaturedBlogPostCard } from '@/entities/blog/ui/FeaturedBlogPostCard';
import { PageTopSection } from '@/shared/ui/page-top-section/PageTopSection';

type BlogPageViewProps = {
  locale: Locale;
  filters: readonly BlogFilterItem[];
  posts: BlogPost[];
  copy: BlogListCopy;
};

export function BlogPageView({ locale, filters, posts, copy }: BlogPageViewProps) {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('category') ?? undefined;

  const activeCategory = useMemo(
    () => resolveActiveBlogCategory(rawCategory, filters),
    [filters, rawCategory],
  );

  const presentation = useMemo(
    () => createBlogListPresentation(posts, activeCategory),
    [posts, activeCategory],
  );

  return (
    <PageTopSection className="relative overflow-hidden py-24 md:py-32">
      <BlogBackground />

      <Container className="relative z-10">
        <BlogHero badge={copy.badge} title={copy.title} description={copy.description} />

        <ContentCategoryFilters
          filters={filters}
          activeKey={activeCategory}
          allKey={BLOG_ALL_CATEGORY_KEY}
        />

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
    </PageTopSection>
  );
}
