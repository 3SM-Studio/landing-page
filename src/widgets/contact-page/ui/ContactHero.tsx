type ContactHeroProps = {
  badge: string;
  titleStart: string;
  titleAccent: string;
  description: string;
};

export function ContactHero({ badge, titleStart, titleAccent, description }: ContactHeroProps) {
  return (
    <div className="mb-32">
      <div className="glass-panel-luxe mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
        <span className="h-2 w-2 rounded-full bg-3sm-cyan shadow-[0_0_8px_#38BDF8]" />
        {badge}
      </div>

      <h2 className="mb-12 font-display text-[46px] font-black leading-[0.9] tracking-tight text-white sm:text-6xl md:text-[100px]">
        {titleStart} <br />
        <span className="bg-linear-to-r from-3sm-cyan via-3sm-teal to-indigo-400 bg-size-[200%_auto] bg-clip-text text-[50px] text-transparent sm:text-6xl md:text-[100px]">
          {titleAccent}
        </span>
      </h2>

      <p className="max-w-2xl text-xl font-medium leading-relaxed text-slate-400 md:text-2xl">
        {description}
      </p>
    </div>
  );
}
