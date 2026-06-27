"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    // Find all children marked for reveal or the container itself
    const elementsToReveal = currentContainer.querySelectorAll(
      ".reveal-item, .reveal-from-left"
    );
    
    if (elementsToReveal.length > 0) {
      elementsToReveal.forEach((el) => observer.observe(el));
    } else {
      observer.observe(currentContainer);
    }

    return () => {
      if (elementsToReveal.length > 0) {
        elementsToReveal.forEach((el) => observer.unobserve(el));
      } else {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  return containerRef;
}
