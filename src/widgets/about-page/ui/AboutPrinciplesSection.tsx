type AboutPrinciple = {
  title: string;
  text: string;
};

type AboutPrinciplesSectionProps = {
  items: readonly AboutPrinciple[];
};

export function AboutPrinciplesSection({ items }: AboutPrinciplesSectionProps) {
  return (
    <div className="mb-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <h2 className="mb-4 text-xl font-bold text-white">{item.title}</h2>
          <p className="text-sm leading-relaxed text-slate-400 md:text-base">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
