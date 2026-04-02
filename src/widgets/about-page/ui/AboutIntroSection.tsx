type AboutIntroSectionProps = {
  eyebrow: readonly [string, string];
  title: string;
  text: string;
  capabilities: readonly string[];
  noteLabel: string;
  noteText: string;
};

export function AboutIntroSection({
  eyebrow,
  title,
  text,
  capabilities,
  noteLabel,
  noteText,
}: AboutIntroSectionProps) {
  return (
    <div className="mb-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <article className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
          <span>{eyebrow[0]}</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span>{eyebrow[1]}</span>
        </div>

        <h2 className="mb-5 text-3xl font-black leading-tight text-white md:text-5xl">{title}</h2>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">{text}</p>

        <div className="flex flex-wrap gap-3">
          {capabilities.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </article>

      <article className="flex min-h-[260px] items-end rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0.55)_45%,rgba(2,6,23,0.95)_100%)] p-8 md:p-10">
        <div>
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            {noteLabel}
          </span>

          <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-base">{noteText}</p>
        </div>
      </article>
    </div>
  );
}
