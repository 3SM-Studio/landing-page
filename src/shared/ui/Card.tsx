'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';

type CardProps = React.ComponentProps<'div'> & {
  size?: 'default' | 'sm';
  variant?: 'default' | 'glass' | 'premium';
};

const cardVariantClassName = {
  default:
    'rounded-[40px] border border-white/10 bg-slate-950/50 text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)]',
  glass:
    'rounded-[40px] border border-white/10 bg-slate-950/40 text-white backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.24)]',
  premium: 'glass-card-premium rounded-[56px] border border-white/5 text-white',
} as const;

function Card({ className, size = 'default', variant = 'glass', ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        [
          'group/card relative flex flex-col overflow-hidden',
          'gap-6 py-6 text-sm',
          'data-[size=sm]:gap-4 data-[size=sm]:py-4',
          'has-[>img:first-child]:pt-0',
          '*:[img:first-child]:rounded-t-[inherit]',
          '*:[img:last-child]:rounded-b-[inherit]',
          cardVariantClassName[variant],
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          'group/card-header @container/card-header grid auto-rows-min items-start',
          'gap-2 px-6',
          'group-data-[size=sm]/card:px-4',
          'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
          'has-data-[slot=card-description]:grid-rows-[auto_auto]',
          '[.border-b]:border-white/10 [.border-b]:pb-6',
          'group-data-[size=sm]/card:[.border-b]:pb-4',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        [
          'font-display text-2xl font-bold leading-tight tracking-tight text-white',
          'group-data-[size=sm]/card:text-lg',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-base leading-relaxed text-slate-400', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6 group-data-[size=sm]/card:px-4', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        [
          'flex items-center px-6',
          'group-data-[size=sm]/card:px-4',
          '[.border-t]:border-white/10 [.border-t]:pt-6',
          'group-data-[size=sm]/card:[.border-t]:pt-4',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
