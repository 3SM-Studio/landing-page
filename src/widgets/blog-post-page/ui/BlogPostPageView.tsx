import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import type { BlogDetailCopy, BlogPost } from '@/entities/blog/model/blog.types';
import { BlogBackground } from '@/entities/blog/ui/BlogBackground';
import { BlogPostBody } from '@/entities/blog/ui/BlogPostBody';
import { BlogPostMeta } from '@/entities/blog/ui/BlogPostMeta';
import { PageTopSection } from '@/shared/ui/page-top-section/PageTopSection';
import { PageBreadcrumbs } from '@/shared/ui/PageBreadcrumbs';

type BlogPostPageViewProps = {
  locale: Locale;
  post: BlogPost;
  copy: BlogDetailCopy;
};

export function BlogPostPageView({ locale, post, copy }: BlogPostPageViewProps) {
  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1400).height(800).fit('crop').url()
    : null;

  return (
    <PageTopSection className="relative overflow-hidden py-24 md:py-32">
      <BlogBackground />

      <Container className="relative z-10">
        <PageBreadcrumbs
          locale={locale}
          items={[
            { label: locale === 'pl' ? 'blog' : 'blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        <article className="mx-auto max-w-4xl">
          <header className="mb-12">
            <BlogPostMeta
              locale={locale}
              categoryLabel={post.category?.title}
              publishedAt={post.publishedAt}
              readTimeMinutes={post.readTimeMinutes}
              size="page"
            />

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="text-lg leading-relaxed text-slate-400 md:text-xl">{post.excerpt}</p>
            ) : null}
          </header>

          {coverImageUrl ? (
            <div className="mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              <Image
                src={coverImageUrl}
                alt={post.coverImageAlt || post.title}
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          ) : null}

          <BlogPostBody body={post.body} emptyLabel={copy.emptyBody} />
        </article>
      </Container>
    </PageTopSection>
  );
}
