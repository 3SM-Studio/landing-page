import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/lib/utils';

type PageTopSectionProps = ComponentPropsWithoutRef<'section'> & {
  overlapHeader?: boolean;
  withAnchorOffset?: boolean;
};

export function PageTopSection({
  className,
  overlapHeader = true,
  withAnchorOffset = false,
  ...props
}: PageTopSectionProps) {
  return (
    <section
      className={cn(
        'relative',
        overlapHeader && '-mt-(--header-total-offset) pt-(--header-total-offset)',
        withAnchorOffset && 'scroll-mt-[calc(var(--header-total-offset)+1rem)]',
        className,
      )}
      {...props}
    />
  );
}
