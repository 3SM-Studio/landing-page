type AboutPerspectiveItem = {
  name: string;
  role: string;
  text: string;
};

type AboutPerspectiveSectionProps = {
  title: string;
  description: string;
  items: readonly AboutPerspectiveItem[];
};

export function AboutPerspectiveSection({
  title,
  description,
  items,
}: AboutPerspectiveSectionProps) {
  return (
    <div className="mb-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.name}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300">
              {item.role}
            </p>
            <h3 className="mb-4 text-2xl font-bold text-white">{item.name}</h3>
            <p className="text-sm leading-relaxed text-slate-400 md:text-base">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
