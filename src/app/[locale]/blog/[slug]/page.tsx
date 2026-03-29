import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { blogPosts, formatBlogPostDate, getBlogPostBySlug } from '@/lib/data/blog-posts';

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${post.title} | Blog | 3SM`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = formatBlogPostDate(post.publishedAt, locale === 'en' ? 'en-US' : 'pl-PL');

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mb-10">
          <Link
            href="/blog"
            locale={locale}
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Wróć do bloga
          </Link>
        </div>

        <article className="mx-auto max-w-4xl">
          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{formattedDate}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
              {post.title}
            </h1>

            <p className="text-lg leading-relaxed text-slate-400 md:text-xl">{post.excerpt}</p>
          </header>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <p className="mb-8 text-lg leading-relaxed text-slate-300">{post.content.intro}</p>

            <div className="space-y-10">
              {post.content.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="text-base leading-relaxed text-slate-300 md:text-lg">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Podsumowanie</h2>
              <p className="text-base leading-relaxed text-slate-300 md:text-lg">
                {post.content.summary}
              </p>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
