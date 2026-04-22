import { useEffect, useState } from "react";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Throttled document scroll: vertical offset for parallax and 0–1 reading progress.
 * Updates stop when `prefers-reduced-motion: reduce` is active (checked each frame).
 */
export function useMarketingScroll() {
  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  const [scrollY, setScrollY] = useState(0);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onMq);

    let ticking = false;
    const tick = () => {
      ticking = false;
      if (mq.matches) return;
      const st = window.scrollY;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setScrollY(st);
      setReadProgress(max <= 0 ? 0 : Math.min(1, Math.max(0, st / max)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick, { passive: true });

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return { scrollY, readProgress, reducedMotion };
}
