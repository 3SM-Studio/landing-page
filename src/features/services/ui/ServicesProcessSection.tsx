type ProcessStep = {
  title: string;
  text: string;
};

type ServicesProcessSectionProps = {
  title: string;
  description: string;
  steps: readonly ProcessStep[];
};

export function ServicesProcessSection({ title, description, steps }: ServicesProcessSectionProps) {
  return (
    <div className="mb-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => (
          <article
            key={step.title}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <h3 className="mb-4 text-xl font-bold text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400 md:text-base">{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
