'use client';

import { useEffect, useRef } from 'react';

export function HeroScene() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {return;}

    let raf = 0;

    const updatePointer = (x: number, y: number) => {
      const rect = root.getBoundingClientRect();
      const px = ((x - rect.left) / rect.width) * 100;
      const py = ((y - rect.top) / rect.height) * 100;

      root.style.setProperty('--hero-pointer-x', `${px}%`);
      root.style.setProperty('--hero-pointer-y', `${py}%`);
      root.style.setProperty('--hero-pointer-x-offset', `${(px - 50) * 0.45}px`);
      root.style.setProperty('--hero-pointer-y-offset', `${(py - 50) * 0.35}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updatePointer(event.clientX, event.clientY);
      });
    };

    updatePointer(window.innerWidth / 2, window.innerHeight / 3);

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="hero-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="hero-scene__halo" />
      <div className="hero-scene__beam hero-scene__beam--left" />
      <div className="hero-scene__beam hero-scene__beam--center" />
      <div className="hero-scene__beam hero-scene__beam--right" />
      <div className="hero-scene__orb hero-scene__orb--cyan" />
      <div className="hero-scene__orb hero-scene__orb--violet" />
      <div className="hero-scene__orb hero-scene__orb--white" />
      <div className="hero-scene__floor" />
    </div>
  );
}
