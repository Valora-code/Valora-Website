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
}

const hiddenTransform: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "translate3d(0,14px,0)",
  left: "translate3d(-14px,0,0)",
  right: "translate3d(14px,0,0)",
  none: "translate3d(0,0,0)",
};

const subtleHiddenTransform: Record<NonNullable<ScrollRevealProps["direction"]>, string> = {
  up: "translate3d(0,7px,0)",
  left: "translate3d(-7px,0,0)",
  right: "translate3d(7px,0,0)",
  none: "translate3d(0,0,0)",
};

/** Scroll-in on enter view; use `subtle` for whole-section fades. */
export const ScrollReveal = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
  subtle = false,
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

  const hidden = subtle ? subtleHiddenTransform[direction] : hiddenTransform[direction];
  const duration = subtle ? "0.58s" : "0.52s";

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0,0,0)" : hidden,
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
