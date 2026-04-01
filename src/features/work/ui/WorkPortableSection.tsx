import { PortableText, type PortableTextBlock } from 'next-sanity';

type WorkPortableSectionProps = {
  title: string;
  body?: PortableTextBlock[];
  emptyLabel: string;
};

export function WorkPortableSection({ title, body, emptyLabel }: WorkPortableSectionProps) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">{title}</p>

      <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white">
        {body?.length ? <PortableText value={body} /> : <p>{emptyLabel}</p>}
      </div>
    </article>
  );
}
