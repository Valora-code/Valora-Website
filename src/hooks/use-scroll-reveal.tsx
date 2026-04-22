import { useEffect, useRef, useState } from "react";

export interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  rootMargin?: string;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0,
    delay = 0,
    rootMargin = "0px 0px 22% 0px",
  } = options;

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;

    const el = elementRef.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let rafFallback: number | null = null;
    let done = false;

    const applyReveal = () => {
      if (delay > 0) {
        timeoutId = window.setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    };

    let observer: IntersectionObserver;

    const reveal = () => {
      if (done) return;
      done = true;
      observer.disconnect();
      applyReveal();
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    for (const entry of observer.takeRecords()) {
      if (entry.isIntersecting) {
        reveal();
        break;
      }
    }

    rafFallback = requestAnimationFrame(() => {
      rafFallback = null;
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) {
        reveal();
      }
    });

    return () => {
      if (rafFallback !== null) cancelAnimationFrame(rafFallback);
      observer.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [delay, isVisible, threshold, rootMargin]);

  return { elementRef, isVisible };
};
