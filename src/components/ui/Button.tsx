import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none',
    'border border-transparent bg-clip-padding font-bold transition-all outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-3 focus-visible:ring-3sm-cyan/40 focus-visible:outline-none',
    'active:translate-y-px',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'rounded-3xl',
          'bg-white text-[#020617]',
          'shadow-[0_24px_48px_-20px_rgba(255,255,255,0.2)]',
          'hover:bg-slate-50',
          'hover:-translate-y-0.5 hover:scale-[1.01]',
          'hover:shadow-[0_30px_60px_-24px_rgba(255,255,255,0.3)]',
        ].join(' '),

        secondary: [
          'rounded-3xl',
          'border-white/12 bg-white/5 text-slate-50',
          'backdrop-blur-xl',
          'hover:border-3sm-cyan/50 hover:bg-white/10',
          'hover:-translate-y-0.5 hover:scale-[1.01]',
        ].join(' '),

        glossy: [
          'rounded-3xl',
          'border-white/10 text-slate-50',
          'bg-[linear-gradient(180deg,rgba(30,41,59,0.8)_0%,rgba(15,23,42,0.9)_100%)]',
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_25px_-5px_rgba(0,0,0,0.3)]',
          'hover:border-3sm-cyan/50',
          'hover:-translate-y-0.5',
          'hover:bg-[linear-gradient(180deg,rgba(51,65,85,0.9)_0%,rgba(30,41,59,1)_100%)]',
          'hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_35px_-10px_rgba(56,189,248,0.3)]',
        ].join(' '),

        text: [
          'rounded-none border-transparent bg-transparent p-0',
          'text-xs uppercase tracking-[0.3em] text-white',
          'hover:text-3sm-cyan',
          'shadow-none',
        ].join(' '),
      },

      size: {
        sm: 'min-h-11 gap-2 px-5 py-3 text-sm',
        md: 'min-h-12 gap-2.5 px-6 py-3.5 text-sm md:text-base',
        lg: 'min-h-14 gap-3 px-8 py-4 text-base md:min-h-16 md:px-10 md:py-5 md:text-lg',

        icon: 'size-10 rounded-2xl',
        'icon-xs': 'size-8 rounded-2xl [&_svg:not([class*=size-])]:size-3',
        'icon-sm': 'size-9 rounded-2xl',
        'icon-lg': 'size-11 rounded-3xl [&_svg:not([class*=size-])]:size-5',
      },
    },

    compoundVariants: [
      { variant: 'text', size: 'sm', className: 'min-h-0 gap-0 px-0 py-0' },
      { variant: 'text', size: 'md', className: 'min-h-0 gap-0 px-0 py-0' },
      { variant: 'text', size: 'lg', className: 'min-h-0 gap-0 px-0 py-0' },
      { variant: 'text', size: 'icon', className: 'size-auto gap-0 p-0' },
      { variant: 'text', size: 'icon-xs', className: 'size-auto gap-0 p-0' },
      { variant: 'text', size: 'icon-sm', className: 'size-auto gap-0 p-0' },
      { variant: 'text', size: 'icon-lg', className: 'size-auto gap-0 p-0' },
    ],

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  children,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const isText = variant === 'text';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...(!asChild ? { type: type ?? 'button' } : {})}
      {...props}
    >
      {isText ? (
        <>
          <span>{children}</span>
          <span className="ml-4 h-px w-10 bg-current transition-all duration-300 group-hover/button:w-16" />
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
