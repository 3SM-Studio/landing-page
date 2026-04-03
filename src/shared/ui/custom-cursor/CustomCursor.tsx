'use client';

import { useCustomCursor } from '@/shared/lib/useCustomCursor';
import './custom-cursor.css';

export function CustomCursor() {
  useCustomCursor();

  return (
    <>
      <div
        className="custom-cursor-ring"
        data-cursor-ring
        data-state="default"
        aria-hidden="true"
      />
      <div className="custom-cursor-dot" data-cursor-dot data-state="default" aria-hidden="true" />
    </>
  );
}
