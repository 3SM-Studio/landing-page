import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap select-none',
    'font-bold transition-all',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-3sm-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'rounded-3xl',
          'bg-white text-[#020617]',
          'shadow-[0_24px_48px_-20px_rgba(255,255,255,0.2)]',
          'hover:-translate-y-0.5 hover:scale-[1.01]',
          'hover:bg-slate-50',
          'hover:shadow-[0_30px_60px_-24px_rgba(255,255,255,0.3)]',
          'active:translate-y-0 active:scale-[0.99]',
        ].join(' '),

        secondary: [
          'rounded-3xl',
          'border border-white/12 bg-white/5 text-slate-50',
          'backdrop-blur-xl',
          'hover:-translate-y-0.5 hover:scale-[1.01]',
          'hover:border-3sm-cyan/50 hover:bg-white/10',
          'active:translate-y-0 active:scale-[0.99]',
        ].join(' '),

        glossy: [
          'rounded-3xl',
          'border border-white/10 text-slate-50',
          'bg-[linear-gradient(180deg,rgba(30,41,59,0.8)_0%,rgba(15,23,42,0.9)_100%)]',
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_25px_-5px_rgba(0,0,0,0.3)]',
          'hover:-translate-y-0.5',
          'hover:border-3sm-cyan/50',
          'hover:bg-[linear-gradient(180deg,rgba(51,65,85,0.9)_0%,rgba(30,41,59,1)_100%)]',
          'hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_35px_-10px_rgba(56,189,248,0.3)]',
          'active:translate-y-0 active:scale-[0.99]',
        ].join(' '),

        text: [
          'rounded-none p-0',
          'text-xs uppercase tracking-[0.3em] text-white',
          'hover:text-3sm-cyan',
        ].join(' '),
      },

      size: {
        sm: 'min-h-11 px-5 py-3 text-sm',
        md: 'min-h-12 px-6 py-3.5 text-sm md:text-base',
        lg: 'min-h-14 px-8 py-4 text-base md:min-h-16 md:px-10 md:py-5 md:text-lg',
      },
    },

    compoundVariants: [
      {
        variant: 'text',
        size: 'sm',
        className: 'min-h-0 px-0 py-0',
      },
      {
        variant: 'text',
        size: 'md',
        className: 'min-h-0 px-0 py-0',
      },
      {
        variant: 'text',
        size: 'lg',
        className: 'min-h-0 px-0 py-0',
      },
    ],

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = React.ComponentProps<'button'> &
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
  const Comp = asChild ? Slot : 'button';
  const isText = variant === 'text';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
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
