type ServiceItem = {
  name: string;
  description: string;
  deliverables: string[];
};

type ServicesGridSectionProps = {
  items: readonly ServiceItem[];
};

export function ServicesGridSection({ items }: ServicesGridSectionProps) {
  return (
    <div className="mb-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((service) => (
        <article
          key={service.name}
          className="group flex h-full flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
        >
          <h2 className="mb-4 text-2xl font-bold leading-tight text-white transition group-hover:text-sky-200">
            {service.name}
          </h2>

          <p className="mb-6 text-sm leading-relaxed text-slate-400 md:text-base">
            {service.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {service.deliverables.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
