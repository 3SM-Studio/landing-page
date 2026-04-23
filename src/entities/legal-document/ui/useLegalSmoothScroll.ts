'use client';

import { useCallback } from 'react';

function getHeaderOffsetBase() {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-total-offset').trim();
  const cssOffset = Number.parseFloat(raw);

  if (Number.isFinite(cssOffset) && cssOffset > 0) {
    return cssOffset;
  }

  return 88;
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 1023px)').matches;
}

function getScrollOffset() {
  const baseOffset = getHeaderOffsetBase();

  return isMobileViewport() ? baseOffset + 8 : baseOffset + 24;
}

export function useLegalSmoothScroll() {
  return useCallback((id: string) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + window.location.search,
      );
    }

    const top = window.scrollY + element.getBoundingClientRect().top - getScrollOffset();

    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }, []);
}
