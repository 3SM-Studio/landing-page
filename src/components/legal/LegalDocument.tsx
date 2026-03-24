import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '../ui/Container';
import { LegalEntityCard } from './LegalEntityCard';

type Props = {
  entry: {
    slug: string;
    locale: 'pl' | 'en';
    metadata: {
      title: string;
      description?: string;
      updatedAt?: string;
      version?: string;
    };
    content: string;
  };
};

function formatUpdatedAt(date: string | undefined, locale: 'pl' | 'en') {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale === 'pl' ? 'pl-PL' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsed);
}

const mdxComponents = {
  LegalEntityCard,
};

export function LegalDocument({ entry }: Props) {
  const updatedLabel = entry.locale === 'pl' ? 'Ostatnia aktualizacja' : 'Last updated';

  const formattedDate = formatUpdatedAt(entry.metadata.updatedAt, entry.locale);

  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-white/10 pb-6 md:mb-12 md:pb-8">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            {entry.metadata.title}
          </h1>

          {formattedDate ? (
            <p className="mt-4 text-sm text-slate-400">
              {updatedLabel}: {formattedDate}
            </p>
          ) : null}
        </header>

        <article
          className="
            max-w-none text-[15px] leading-8 text-slate-300 md:text-base

            [&_h1]:mt-0
            [&_h1]:text-3xl
            [&_h1]:font-black
            [&_h1]:tracking-tight
            [&_h1]:text-white

            [&_h2]:mt-12
            [&_h2]:border-t
            [&_h2]:border-white/10
            [&_h2]:pt-8
            [&_h2]:text-lg
            [&_h2]:font-bold
            [&_h2]:uppercase
            [&_h2]:tracking-[0.08em]
            [&_h2]:text-white

            [&_h3]:mt-8
            [&_h3]:text-base
            [&_h3]:font-semibold
            [&_h3]:text-white

            [&_p]:my-4
            [&_p]:text-slate-300

            [&_ul]:my-4
            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_ol]:my-4
            [&_ol]:list-decimal
            [&_ol]:pl-6

            [&_li]:my-2
            [&_li]:pl-1

            [&_strong]:font-semibold
            [&_strong]:text-white

            [&_a]:font-medium
            [&_a]:text-3sm-cyan
            [&_a]:underline
            [&_a]:underline-offset-4

            [&_blockquote]:my-6
            [&_blockquote]:border-l-2
            [&_blockquote]:border-white/10
            [&_blockquote]:pl-4
            [&_blockquote]:italic
            [&_blockquote]:text-slate-400

            [&_hr]:my-10
            [&_hr]:border-white/10
          "
        >
          <MDXRemote source={entry.content} components={mdxComponents} />
        </article>
      </div>
    </Container>
  );
}
