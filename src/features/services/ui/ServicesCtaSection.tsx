type ServicesCtaSectionProps = {
  badge: string;
  title: string;
  description: string;
};

export function ServicesCtaSection({ badge, title, description }: ServicesCtaSectionProps) {
  return (
    <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl md:p-12">
      <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-300">
        {badge}
      </span>

      <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>

      <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
        {description}
      </p>
    </article>
  );
}
