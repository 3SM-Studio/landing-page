import * as React from 'react';

import { cn } from '@/shared/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          'w-full min-w-0',
          'rounded-3xl border border-white/10 bg-slate-950/40',
          'px-6 py-5 text-base text-white',
          'placeholder:text-slate-500',
          'outline-none transition-all',
          'focus:border-3sm-cyan/60 focus:bg-slate-900/60',
          'focus:shadow-[0_0_20px_rgba(56,189,248,0.12)]',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-red-400/60 aria-invalid:shadow-[0_0_20px_rgba(248,113,113,0.12)]',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white',
          'md:text-base',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
