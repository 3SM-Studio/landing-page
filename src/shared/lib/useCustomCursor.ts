'use client';

import { useEffect } from 'react';

type UseCustomCursorOptions = {
  maxVelocityScale?: number;
  velocityStrength?: number;
  ringLerp?: number;
  scaleLerp?: number;
};

type CursorState = 'default' | 'interactive' | 'pressed';

export function useCustomCursor({
  maxVelocityScale = 1.35,
  velocityStrength = 0.012,
  ringLerp = 0.18,
  scaleLerp = 0.14,
}: UseCustomCursorOptions = {}) {
  useEffect(() => {
    const dot = document.querySelector<HTMLElement>('[data-cursor-dot]');
    const ring = document.querySelector<HTMLElement>('[data-cursor-ring]');

    if (!dot || !ring) {
      return;
    }

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    document.documentElement.classList.add('is-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;

    let ringX = -100;
    let ringY = -100;

    let lastMouseX = -100;
    let lastMouseY = -100;

    let currentVelocityScale = 1;
    let targetVelocityScale = 1;

    let currentRingScale = 1;
    let targetRingScale = 1;

    let currentDotScale = 1;
    let targetDotScale = 1;

    let state: CursorState = 'default';
    let rafId = 0;

    const setState = (nextState: CursorState) => {
      state = nextState;

      dot.dataset.state = nextState;
      ring.dataset.state = nextState;

      if (nextState === 'interactive') {
        targetRingScale = 1.18;
        targetDotScale = 1.04;
        return;
      }

      if (nextState === 'pressed') {
        targetRingScale = 0.92;
        targetDotScale = 0.92;
        return;
      }

      targetRingScale = 1;
      targetDotScale = 1;
    };

    const setDotPosition = (x: number, y: number) => {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    const setRingPosition = (x: number, y: number) => {
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
    };

    const render = () => {
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      targetVelocityScale = Math.min(1 + distance * velocityStrength, maxVelocityScale);

      ringX += (mouseX - ringX) * ringLerp;
      ringY += (mouseY - ringY) * ringLerp;

      currentVelocityScale += (targetVelocityScale - currentVelocityScale) * scaleLerp;
      currentRingScale += (targetRingScale - currentRingScale) * 0.16;
      currentDotScale += (targetDotScale - currentDotScale) * 0.18;

      setDotPosition(mouseX, mouseY);
      setRingPosition(ringX, ringY);

      dot.style.setProperty('--cursor-scale', `${currentVelocityScale * currentDotScale}`);
      ring.style.setProperty('--cursor-scale', `${currentVelocityScale * currentRingScale}`);

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      if (state === 'default') {
        targetRingScale = 1;
        targetDotScale = 1;
      } else if (state === 'interactive') {
        targetRingScale = 1.18;
        targetDotScale = 1.04;
      } else {
        targetRingScale = 0.92;
        targetDotScale = 0.92;
      }

      targetVelocityScale += (1 - targetVelocityScale) * 0.12;

      rafId = window.requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]',
      );

      if (state !== 'pressed') {
        setState(interactive ? 'interactive' : 'default');
      }
    };

    const handleMouseDown = () => {
      setState('pressed');
    };

    const handleMouseUp = () => {
      const hovered = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      const interactive = hovered?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]',
      );

      setState(interactive ? 'interactive' : 'default');
    };

    rafId = window.requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.documentElement.classList.remove('is-custom-cursor');
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [maxVelocityScale, velocityStrength, ringLerp, scaleLerp]);
}
