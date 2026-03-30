'use client';

import { startTransition, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type FilterItem = {
  key: string;
  label: string;
};

type ContentCategoryFiltersProps = {
  filters: readonly FilterItem[];
  activeKey: string;
  paramName?: string;
  allKey?: string;
  className?: string;
};

export function ContentCategoryFilters({
  filters,
  activeKey,
  paramName = 'category',
  allKey = 'all',
  className,
}: ContentCategoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const previousTopRef = useRef<number | null>(null);
  const pendingRef = useRef(false);

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  const handleFilterChange = useCallback(
    (nextKey: string) => {
      if (nextKey === activeKey) {return;}

      if (wrapperRef.current) {
        previousTopRef.current = wrapperRef.current.getBoundingClientRect().top;
        pendingRef.current = true;
      }

      const nextParams = new URLSearchParams(searchParams.toString());

      if (nextKey === allKey) {
        nextParams.delete(paramName);
      } else {
        nextParams.set(paramName, nextKey);
      }

      const nextQuery = nextParams.toString();
      const nextHref = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      startTransition(() => {
        router.replace(nextHref, { scroll: false });
      });
    },
    [activeKey, allKey, paramName, pathname, router, searchParams],
  );

  useLayoutEffect(() => {
    if (!pendingRef.current) {return;}
    if (!wrapperRef.current) {return;}
    if (previousTopRef.current === null) {return;}

    const nextTop = wrapperRef.current.getBoundingClientRect().top;
    const delta = nextTop - previousTopRef.current;

    if (delta !== 0) {
      window.scrollBy(0, delta);
    }

    pendingRef.current = false;
    previousTopRef.current = null;
  }, [queryString]);

  return (
    <div ref={wrapperRef} className={cn('mb-10 flex flex-wrap gap-3', className)}>
      {filters.map((filter) => {
        const isActive = activeKey === filter.key;

        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => handleFilterChange(filter.key)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              isActive
                ? 'border-sky-400/40 bg-sky-400/10 text-white'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white',
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
