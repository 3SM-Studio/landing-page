type BlogHeroProps = {
  badge: string;
  title: string;
  description: string;
};

export function BlogHero({ badge, title, description }: BlogHeroProps) {
  return (
    <div className="mb-16 max-w-4xl">
      <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-sky-300 backdrop-blur-xl">
        <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]" />
        {badge}
      </div>

      <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
        {title.split('\n').map((line, index, array) => (
          <span key={`${line}-${index}`}>
            {line}
            {index < array.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>

      <p className="max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">{description}</p>
    </div>
  );
}
