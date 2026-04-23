'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { LegalTocItem } from '@/entities/legal-document/model/legal-toc.types';
import { cn } from '@/shared/lib/utils';
import { useLegalSmoothScroll } from './useLegalSmoothScroll';

type Props = {
  items: LegalTocItem[];
  activeId: string | null;
  title: string;
};

type TocNodeProps = {
  item: LegalTocItem;
  activeId: string | null;
  onNavigate: (id: string) => void;
  registerActiveElement: (id: string, element: HTMLLIElement | null) => void;
};

function hasActiveDescendant(item: LegalTocItem, activeId: string | null): boolean {
  if (!activeId || !item.children?.length) {
    return false;
  }

  return item.children.some(
    (child) => child.id === activeId || hasActiveDescendant(child, activeId),
  );
}

function TocNode({ item, activeId, onNavigate, registerActiveElement }: TocNodeProps) {
  const isActive = activeId === item.id;
  const childIsActive = hasActiveDescendant(item, activeId);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const isExpanded = hasChildren ? isActive || childIsActive : false;

  return (
    <li ref={(element) => registerActiveElement(item.id, element)}>
      <button
        type="button"
        onClick={() => onNavigate(item.id)}
        aria-current={isActive ? 'location' : undefined}
        className={cn(
          'flex w-full items-start justify-between rounded-sm px-2 py-2 text-left text-[14px] leading-[18px] transition-colors',
          isActive
            ? 'bg-[#221f1f] font-medium text-white'
            : childIsActive
              ? 'font-medium text-[#221f1f]'
              : 'text-[#4c4948] hover:bg-[#f5f5f1] hover:text-[#221f1f]',
        )}
      >
        <span className="min-w-0 flex-1">{item.title}</span>
        {hasChildren ? (
          <span className={cn('ml-2 mt-0.5 shrink-0 text-[10px]', isExpanded ? 'rotate-90' : '')}>
            ▶
          </span>
        ) : null}
      </button>

      {hasChildren ? (
        <ul
          className={cn(
            'mt-1 space-y-1 overflow-hidden border-l border-[#d5d4d1] pl-3 transition-[max-height,opacity] duration-200',
            isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          )}
          aria-hidden={!isExpanded}
        >
          {item.children?.map((child) => (
            <TocNode
              key={child.id}
              item={child}
              activeId={activeId}
              onNavigate={onNavigate}
              registerActiveElement={registerActiveElement}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function LegalTocDesktop({ items, activeId, title }: Props) {
  const onNavigate = useLegalSmoothScroll();
  const containerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());

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
    if (!activeId) {
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
  }, [activeId]);

  return (
    <aside
      ref={containerRef}
      className="legal-toc-scroll sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto border-r border-[#d5d4d1] pt-6 lg:block"
    >
      <div className="border-t-4 border-[#e50914] pr-6 pt-4">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#6b6b6b]">
          {title}
        </p>
        <nav aria-label={title}>
          <ul className="space-y-1">
            {items.map((item) => (
              <TocNode
                key={item.id}
                item={item}
                activeId={activeId}
                onNavigate={onNavigate}
                registerActiveElement={registerActiveElement}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
