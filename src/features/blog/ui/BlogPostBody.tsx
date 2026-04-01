import { PortableText } from 'next-sanity';
import type { BlogPost } from '../lib/blog.types';

type BlogPostBodyProps = {
  body: BlogPost['body'];
  emptyLabel: string;
};

export function BlogPostBody({ body, emptyLabel }: BlogPostBodyProps) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      {body?.length ? (
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-a:text-sky-300">
          <PortableText value={body} />
        </div>
      ) : (
        <p className="text-base leading-relaxed text-slate-300">{emptyLabel}</p>
      )}
    </div>
  );
}
