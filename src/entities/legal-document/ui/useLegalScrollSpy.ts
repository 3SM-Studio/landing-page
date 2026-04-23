'use client';

import { useEffect, useMemo, useState } from 'react';
import type { LegalTocItem } from '@/entities/legal-document/model/legal-toc.types';
import { flattenLegalToc } from '@/entities/legal-document/model/legal-toc.lib';

function getHeaderOffsetBase() {
  if (typeof window === 'undefined') {
    return 88;
  }

  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-total-offset').trim();
  const cssOffset = Number.parseFloat(raw);

  if (Number.isFinite(cssOffset) && cssOffset > 0) {
    return cssOffset;
  }

  return 88;
}

function getSpyOffset() {
  const baseOffset = getHeaderOffsetBase();
  const isMobile = window.matchMedia('(max-width: 1023px)').matches;

  return isMobile ? baseOffset + 10 : baseOffset + 28;
}

function resolveInitialActiveId(flatItems: LegalTocItem[]): string | null {
  return flatItems[0]?.id ?? null;
}

export function useLegalScrollSpy(items: LegalTocItem[]) {
  const flatItems = useMemo(() => flattenLegalToc(items), [items]);
  const fallbackActiveId = useMemo(() => resolveInitialActiveId(flatItems), [flatItems]);
  const [activeId, setActiveId] = useState<string | null>(() => resolveInitialActiveId(flatItems));

  useEffect(() => {
    const elements = flatItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) {
      return;
    }

    let frameId = 0;

    const updateActiveIdFromScroll = () => {
      const anchorY = window.scrollY + getSpyOffset();
      let currentSection = elements[0] ?? null;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        const top = window.scrollY + rect.top;

        if (top <= anchorY) {
          currentSection = element;
          continue;
        }

        break;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        currentSection = elements.at(-1) ?? currentSection;
      }

      const nextId = currentSection?.id ?? null;
      setActiveId((currentId) => (currentId === nextId ? currentId : nextId));
    };

    const requestUpdate = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updateActiveIdFromScroll);
    };

    requestUpdate();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('orientationchange', requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('orientationchange', requestUpdate);
    };
  }, [flatItems]);

  return activeId && flatItems.some((item) => item.id === activeId) ? activeId : fallbackActiveId;
}
