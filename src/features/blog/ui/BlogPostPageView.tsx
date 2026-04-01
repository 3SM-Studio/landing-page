import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import type { BlogDetailCopy, BlogPost } from '../lib/blog.types';
import { BlogBackground } from './BlogBackground';
import { BlogPostBody } from './BlogPostBody';
import { BlogPostMeta } from './BlogPostMeta';

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
    <section className="relative overflow-hidden py-24 md:py-32">
      <BlogBackground />

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/blog"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            {copy.backToBlog}
          </Link>
        </div>

        <article className="mx-auto max-w-4xl">
          <header className="mb-12">
            <BlogPostMeta
              locale={locale}
              category={post.category}
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
    </section>
  );
}
