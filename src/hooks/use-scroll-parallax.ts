import { useEffect, useState } from "react";

/**
 * Returns a Y-offset in pixels = window.scrollY × speed.
 * Apply via `transform: translate3d(0, offset px, 0)` on an element to make
 * it appear to scroll slower (positive offset partly cancels the upward scroll).
 *
 * Returns 0 forever if the user prefers reduced motion.
 */
export function useScrollParallax(speed: number = 0.1) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      setOffset(window.scrollY * speed);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return offset;
}
