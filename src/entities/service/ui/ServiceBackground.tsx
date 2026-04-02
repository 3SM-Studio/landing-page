import { cn } from '@/shared/lib/utils';

type ServiceBackgroundProps = {
  className?: string;
};

export function ServiceBackground({ className }: ServiceBackgroundProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
      aria-hidden="true"
    >
      <div className="absolute left-[-12%] top-[-18%] h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-6%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-[140px]" />
      <div className="absolute right-[10%] top-[28%] h-[20rem] w-[20rem] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="absolute -left-10 top-0 select-none text-[7rem] font-black uppercase tracking-[-0.08em] text-white/[0.03] md:text-[11rem] xl:text-[14rem]">
        Services
      </div>
    </div>
  );
}
