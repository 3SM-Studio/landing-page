import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'primary' | 'secondary' | 'glossy' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  'inline-flex items-center justify-center rounded-3xl font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[rgba(56,189,248,0.9)] disabled:pointer-events-none disabled:opacity-50';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'primary-cta bg-white text-[#020617] shadow-[0_24px_48px_-20px_rgba(255,255,255,0.2)] hover:bg-slate-50 hover:shadow-[0_30px_60px_-24px_rgba(255,255,255,0.3)]',
  secondary:
    'secondary-cta border border-white/12 text-slate-50 hover:border-[rgba(56,189,248,0.5)]',
  glossy: 'secondary-cta glossy-button border border-white/12 text-slate-50',
  text: 'text-cta rounded-none p-0 text-xs uppercase tracking-[0.3em] text-white hover:text-3sm-cyan',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-5 py-3 text-sm',
  md: 'min-h-12 px-6 py-3.5 text-sm md:text-base',
  lg: 'min-h-14 px-8 py-4 text-base md:min-h-16 md:px-10 md:py-5 md:text-lg',
};

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ');
}

export function Button({
  asChild = false,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const isText = variant === 'text';

  return (
    <Comp
      className={cn(baseClasses, !isText && sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {isText ? (
        <>
          <span>{children}</span>
          <span className="text-cta-line bg-current" />
        </>
      ) : (
        children
      )}
    </Comp>
  );
}
