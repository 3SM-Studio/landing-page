import type { ElementType, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
}: ContainerProps<T>) {
  const Comp = as || 'div';

  return <Comp className={cn('mx-auto w-full max-w-7xl px-6', className)}>{children}</Comp>;
}
