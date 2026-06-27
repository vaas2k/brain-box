'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayPath, setDisplayPath] = useState(pathname);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (pathname === displayPath) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setDisplayPath(pathname);
      window.setTimeout(() => setIsVisible(true), 80);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [displayPath, pathname]);

  return (
    <div
      key={displayPath}
      className={`min-h-full transition-all duration-400 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}
    >
      {children}
    </div>
  );
}
