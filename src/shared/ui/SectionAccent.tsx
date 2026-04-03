'use client';

import { useEffect, useRef } from 'react';

type SectionAccentProps = {
  variant?: 'cyan' | 'violet' | 'mixed';
  mood?: 'soft' | 'medium' | 'strong';
  align?: 'left' | 'center' | 'right';
  className?: string;
};

export function SectionAccent({
  variant = 'mixed',
  mood = 'medium',
  align = 'center',
  className = '',
}: SectionAccentProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {return;}

    let raf = 0;

    const updateScroll = () => {
      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      root.style.setProperty('--section-progress', `${clamped}`);
      root.style.setProperty('--section-shift-a', `${clamped * 30}px`);
      root.style.setProperty('--section-shift-b', `${clamped * -24}px`);
      root.style.setProperty('--section-shift-beam', `${clamped * 36}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={[
        'section-accent pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        `section-accent--${variant}`,
        `section-accent--${mood}`,
        `section-accent--${align}`,
        className,
      ].join(' ')}
    >
      <div className="section-accent__wash" />
      <div className="section-accent__beam" />
      <div className="section-accent__orb section-accent__orb--a" />
      <div className="section-accent__orb section-accent__orb--b" />
      <div className="section-accent__line" />
    </div>
  );
}
