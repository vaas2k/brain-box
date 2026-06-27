'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, input, select, textarea, [role="button"]');
      setIsHoveringInteractive(interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red bg-red/90 transition-all duration-200 ease-out ${isHoveringInteractive ? 'h-8 w-8 border-red bg-transparent' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }}
    />
  );
}
