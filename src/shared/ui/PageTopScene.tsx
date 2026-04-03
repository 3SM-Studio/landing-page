'use client';

import { useEffect, useRef } from 'react';

type PageTopSceneProps = {
  variant?: 'cyan' | 'violet' | 'mixed';
};

export function PageTopScene({ variant = 'mixed' }: PageTopSceneProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {return;}

    let raf = 0;

    const updatePointer = (x: number, y: number) => {
      const rect = root.getBoundingClientRect();
      const px = ((x - rect.left) / rect.width) * 100;
      const py = ((y - rect.top) / rect.height) * 100;

      root.style.setProperty('--page-top-pointer-x', `${px}%`);
      root.style.setProperty('--page-top-pointer-y', `${py}%`);
      root.style.setProperty('--page-top-offset-x', `${(px - 50) * 0.3}px`);
      root.style.setProperty('--page-top-offset-y', `${(py - 50) * 0.22}px`);
    };

    const updateScroll = () => {
      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      root.style.setProperty('--page-top-progress', `${clamped}`);
      root.style.setProperty('--page-top-shift-slow', `${clamped * 24}px`);
      root.style.setProperty('--page-top-shift-fast', `${clamped * 56}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updatePointer(event.clientX, event.clientY);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateScroll);
    };

    updatePointer(window.innerWidth / 2, window.innerHeight / 3);
    updateScroll();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`page-top-scene page-top-scene--${variant} pointer-events-none absolute inset-0 -z-10 overflow-hidden`}
    >
      <div className="page-top-scene__wash" />
      <div className="page-top-scene__halo" />
      <div className="page-top-scene__beam page-top-scene__beam--left" />
      <div className="page-top-scene__beam page-top-scene__beam--right" />
      <div className="page-top-scene__orb page-top-scene__orb--a" />
      <div className="page-top-scene__orb page-top-scene__orb--b" />
      <div className="page-top-scene__line" />
    </div>
  );
}
