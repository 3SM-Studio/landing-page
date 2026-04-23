'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { LegalTocItem } from '@/entities/legal-document/model/legal-toc.types';
import { cn } from '@/shared/lib/utils';
import { useLegalSmoothScroll } from './useLegalSmoothScroll';

type Props = {
  items: LegalTocItem[];
  activeId: string | null;
  title: string;
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
};

type TocNodeProps = {
  item: LegalTocItem;
  activeId: string | null;
  onNavigate: (id: string) => void;
  onClose: () => void;
  registerActiveElement: (id: string, element: HTMLLIElement | null) => void;
  expandedIds: Set<string>;
  onToggleExpanded: (id: string) => void;
};

function hasActiveDescendant(item: LegalTocItem, activeId: string | null): boolean {
  if (!activeId || !item.children?.length) {
    return false;
  }

  return item.children.some(
    (child) => child.id === activeId || hasActiveDescendant(child, activeId),
  );
}

function collectExpandedAncestors(
  items: LegalTocItem[],
  activeId: string | null,
  expanded = new Set<string>(),
) {
  for (const item of items) {
    if (!item.children?.length) {
      continue;
    }

    if (hasActiveDescendant(item, activeId)) {
      expanded.add(item.id);
      collectExpandedAncestors(item.children, activeId, expanded);
    }
  }

  return expanded;
}

function TocNode({
  item,
  activeId,
  onNavigate,
  onClose,
  registerActiveElement,
  expandedIds,
  onToggleExpanded,
}: TocNodeProps) {
  const isActive = activeId === item.id;
  const childIsActive = hasActiveDescendant(item, activeId);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const isExpanded = hasChildren ? expandedIds.has(item.id) || childIsActive : false;

  return (
    <li ref={(element) => registerActiveElement(item.id, element)}>
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => {
            onNavigate(item.id);
            onClose();
          }}
          aria-current={isActive ? 'location' : undefined}
          className={cn(
            'flex min-w-0 flex-1 items-start rounded-sm px-2 py-2 text-left text-[14px] leading-[18px] transition-colors',
            isActive
              ? 'bg-[#221f1f] font-medium text-white'
              : childIsActive
                ? 'font-medium text-[#221f1f]'
                : 'text-[#4c4948] hover:bg-[#f5f5f1] hover:text-[#221f1f]',
          )}
        >
          <span className="min-w-0 flex-1">{item.title}</span>
        </button>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggleExpanded(item.id)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Zwiń podsekcje' : 'Rozwiń podsekcje'}
            className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center self-center rounded-sm border border-[#d5d4d1] text-[10px] text-[#221f1f] transition-colors hover:bg-[#f5f5f1]"
          >
            <span
              className={cn('transition-transform duration-200', isExpanded ? 'rotate-90' : '')}
            >
              ▶
            </span>
          </button>
        ) : null}
      </div>

      {hasChildren ? (
        <ul
          className={cn(
            'mt-1 space-y-1 overflow-hidden border-l border-[#d5d4d1] pl-3 transition-[max-height,opacity] duration-200',
            isExpanded ? 'max-h-[1200px] opacity-100' : 'pointer-events-none max-h-0 opacity-0',
          )}
          aria-hidden={!isExpanded}
        >
          {item.children?.map((child) => (
            <TocNode
              key={child.id}
              item={child}
              activeId={activeId}
              onNavigate={onNavigate}
              onClose={onClose}
              registerActiveElement={registerActiveElement}
              expandedIds={expandedIds}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function LegalTocMobile({ items, activeId, title, open, onClose, onToggle }: Props) {
  const onNavigate = useLegalSmoothScroll();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const [manualExpandedIds, setManualExpandedIds] = useState<Set<string>>(new Set());

  const autoExpandedIds = useMemo(
    () => collectExpandedAncestors(items, activeId),
    [items, activeId],
  );

  const expandedIds = useMemo(() => {
    const next = new Set(manualExpandedIds);
    for (const id of autoExpandedIds) {
      next.add(id);
    }
    return next;
  }, [manualExpandedIds, autoExpandedIds]);

  const registerActiveElement = useMemo(
    () => (id: string, element: HTMLLIElement | null) => {
      if (element) {
        itemRefs.current.set(id, element);
        return;
      }

      itemRefs.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !activeId) {
      return;
    }

    const container = containerRef.current;
    const activeElement = itemRefs.current.get(activeId);

    if (!container || !activeElement) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();
    const isAbove = elementRect.top < containerRect.top + 24;
    const isBelow = elementRect.bottom > containerRect.bottom - 24;

    if (isAbove || isBelow) {
      activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (panelRef.current && target && !panelRef.current.contains(target)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  return (
    <div className="lg:hidden print:hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? 'Zamknij spis treści' : 'Otwórz spis treści'}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-[#221f1f] bg-[#221f1f] px-4 py-3 text-[13px] font-semibold leading-none text-white shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="flex flex-col gap-[3px]" aria-hidden="true">
          <span className="block h-[2px] w-4 bg-current" />
          <span className="block h-[2px] w-4 bg-current" />
          <span className="block h-[2px] w-4 bg-current" />
        </span>
        <span>{title}</span>
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-200',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={cn(
          'fixed right-0 top-0 z-50 flex h-dvh w-[min(24rem,88vw)] flex-col border-l border-[#d5d4d1] bg-white shadow-[-16px_0_48px_rgba(0,0,0,0.18)] transition-transform duration-200',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!open}
      >
        <div className="border-b border-[#d5d4d1] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#6b6b6b]">
              {title}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d5d4d1] text-[18px] text-[#221f1f] transition-colors hover:bg-[#f5f5f1]"
              aria-label="Zamknij spis treści"
            >
              ×
            </button>
          </div>
        </div>

        <div ref={containerRef} className="legal-toc-scroll flex-1 overflow-y-auto px-4 py-4 pb-24">
          <nav aria-label={title}>
            <ul className="space-y-1">
              {items.map((item) => (
                <TocNode
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  onNavigate={onNavigate}
                  onClose={onClose}
                  registerActiveElement={registerActiveElement}
                  expandedIds={expandedIds}
                  onToggleExpanded={(id) => {
                    setManualExpandedIds((current) => {
                      const next = new Set(current);
                      if (next.has(id)) {
                        next.delete(id);
                      } else {
                        next.add(id);
                      }
                      return next;
                    });
                  }}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
