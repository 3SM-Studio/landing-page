'use client';

import { useEffect, useRef } from 'react';

export function HeroParallaxScene() {
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
      root.style.setProperty('--hero-pointer-offset-x', `${(px - 50) * 0.5}px`);
      root.style.setProperty('--hero-pointer-offset-y', `${(py - 50) * 0.38}px`);
    };

    const updateScroll = () => {
      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = 1 - rect.bottom / (rect.height + viewportHeight);
      const clamped = Math.max(0, Math.min(1, progress));

      root.style.setProperty('--hero-scroll-progress', `${clamped}`);
      root.style.setProperty('--hero-scroll-slow', `${clamped * 28}px`);
      root.style.setProperty('--hero-scroll-medium', `${clamped * 56}px`);
      root.style.setProperty('--hero-scroll-fast', `${clamped * 84}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updatePointer(event.clientX, event.clientY);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updateScroll();
      });
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
      className="hero-parallax pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="hero-parallax__halo" />
      <div className="hero-parallax__beam hero-parallax__beam--left" />
      <div className="hero-parallax__beam hero-parallax__beam--center" />
      <div className="hero-parallax__beam hero-parallax__beam--right" />
      <div className="hero-parallax__orb hero-parallax__orb--cyan" />
      <div className="hero-parallax__orb hero-parallax__orb--violet" />
      <div className="hero-parallax__orb hero-parallax__orb--white" />
      <div className="hero-parallax__floor" />
    </div>
  );
}
