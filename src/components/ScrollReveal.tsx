import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  /**
   * Softer section-level fade: smaller motion, slightly longer ease,
   * triggers a bit earlier (good for tall blocks).
   */
  subtle?: boolean;
  /**
   * Scale multiplier in the hidden state. Defaults to 1 (no scale).
   * Use values like 0.96 for "comes into focus" feel.
   */
  scale?: number;
}

const hiddenTransform: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "translate3d(0,40px,0)",
  left: "translate3d(-60px,0,0)",
  right: "translate3d(60px,0,0)",
  none: "translate3d(0,0,0)",
};

const subtleHiddenTransform: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "translate3d(0,16px,0)",
  left: "translate3d(-16px,0,0)",
  right: "translate3d(16px,0,0)",
  none: "translate3d(0,0,0)",
};

/** Scroll-in on enter view; use `subtle` for whole-section fades. */
export const ScrollReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
  subtle = false,
  scale,
}: ScrollRevealProps) => {
  const { elementRef, isVisible } = useScrollReveal({
    delay,
    ...(subtle
      ? {
          // Slightly larger “early” zone for full-section fades
          rootMargin: "0px 0px 28% 0px",
          threshold: 0,
        }
      : {}),
  });

  const hiddenTranslate = subtle ? subtleHiddenTransform[direction] : hiddenTransform[direction];
  const hiddenScale = scale && scale !== 1 ? `scale(${scale})` : "";
  const visibleScale = scale && scale !== 1 ? "scale(1)" : "";
  const duration = subtle ? "0.7s" : "0.85s";

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `${visibleScale} translate3d(0,0,0)`.trim()
          : `${hiddenScale} ${hiddenTranslate}`.trim(),
        transitionProperty: "opacity, transform",
        transitionDuration: duration,
        transitionTimingFunction: subtle ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
};
