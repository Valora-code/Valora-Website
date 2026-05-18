import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PinnedStep {
  number: string;       // "01" / "02" / "03"
  eyebrow: string;      // "Steg"
  title: string;
  body: string;
  /** Optional visual: when present, replaces the giant number with an image
   *  (e.g. a product mockup or screenshot). */
  image?: { src: string; alt: string };
  /** Layout variant. "split" (default) = number + copy two-column.
   *  "showcase" = centered image-led panel, copy minimal/absent. */
  variant?: "split" | "showcase";
  /** Panel background. "cream" (default) or "violet" brand canvas. */
  background?: "cream" | "violet";
  /** Showcase-only: small caption rendered ABOVE the image. */
  caption?: string;
  /** Showcase-only: short statement rendered BELOW the image. */
  tagline?: string;
  /** Showcase-only: optional CTA pill rendered with the tagline. */
  cta?: { label: string; onClick: () => void };
}

interface CurtainStepsProps {
  steps: PinnedStep[];
  heading?: ReactNode;
  className?: string;
}

/**
 * Curtain-scroll storytelling. Each step is a full-viewport panel positioned
 * `sticky; top: 0`. As you scroll, later panels slide up and curtain over earlier
 * ones in document order. No JS, no fixed-pinning lock — scroll stays responsive
 * the whole way through. Reduced-motion stacks them as plain blocks.
 */
export const CurtainSteps = ({ steps, heading, className }: CurtainStepsProps) => {
  return (
    <div className={cn("relative", className)}>
      {heading && (
        <div className="mx-auto w-full max-w-[1600px] px-6 pt-20 pb-12 sm:px-10 sm:pt-24 sm:pb-14 lg:px-16">
          {heading}
        </div>
      )}

      <div className="relative">
        {steps.map((s, i) => {
          const isViolet = s.background === "violet";
          const isShowcase = s.variant === "showcase";
          return (
            <section
              key={s.number}
              className={cn(
                "curtain-panel",
                i === 0 && "curtain-panel--first",
                isViolet && "curtain-panel--violet",
              )}
              style={{ zIndex: i + 1 }}
            >
              <div className="curtain-panel-inner">
                {isShowcase ? (
                  /* Showcase — corner-anchored Klarna-style typography.
                     Caption top-left (smaller), tagline bottom-right (hero),
                     image centered. */
                  <div className="relative mx-auto flex min-h-[80vh] w-full max-w-[1400px] flex-col items-center justify-center py-6 md:py-10">
                    {/* Top-left caption — hero-scale, navy on violet so it
                        reads as supporting frame, not competing with tagline */}
                    {s.caption && (
                      <p
                        className="mb-6 font-anton uppercase md:absolute md:left-0 md:top-[8vh] md:mb-0"
                        style={{
                          fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                          lineHeight: 0.95,
                          letterSpacing: "-0.01em",
                          maxWidth: "18ch",
                          textAlign: "left",
                          color: "hsl(221 39% 11% / 0.65)",
                        }}
                      >
                        {s.caption}
                      </p>
                    )}

                    {/* Centered image */}
                    {s.image && (
                      <img
                        src={s.image.src}
                        alt={s.image.alt}
                        className="block h-auto w-full max-w-[44rem] select-none"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    )}

                    {/* Bottom-right tagline + CTA — the Klarna closing line. */}
                    {(s.tagline || s.cta) && (
                      <div className="mt-8 flex flex-col items-center gap-5 md:absolute md:bottom-0 md:right-0 md:mt-0 md:items-end">
                        {s.tagline && (
                          <p
                            className="font-anton text-white"
                            style={{
                              fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                              lineHeight: 0.9,
                              letterSpacing: "-0.025em",
                              maxWidth: "14ch",
                              textAlign: "right",
                            }}
                          >
                            {s.tagline}
                          </p>
                        )}
                        {s.cta && (
                          <button
                            type="button"
                            onClick={s.cta.onClick}
                            className="inline-flex items-center gap-2 rounded-full bg-[#FAF6F0] px-6 py-3 text-[15px] font-bold text-foreground transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-violet)]"
                          >
                            <span>{s.cta.label}</span>
                            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Split — modest violet number + hero-scale copy (Klarna balance) */
                  <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
                    <div className="md:col-span-5">
                      {s.image ? (
                        <img
                          src={s.image.src}
                          alt={s.image.alt}
                          className="block h-auto w-full max-w-[36rem] select-none"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      ) : (
                        <span
                          className="font-anton block leading-none nums-tab"
                          style={{
                            fontSize: "clamp(6rem, 16vw, 13rem)",
                            color: isViolet ? "#FFFFFF" : "var(--brand-violet)",
                            letterSpacing: "-0.04em",
                          }}
                        >
                          {s.number}
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-7">
                      <span className="eyebrow-caption mb-5 block">
                        {s.eyebrow} {s.number}
                      </span>
                      <h3
                        className="mb-6 max-w-[20ch] font-anton text-foreground"
                        style={{
                          fontSize: "clamp(3.3rem, 6.6vw, 6.3rem)" /* +20% */,
                          lineHeight: 0.95,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="max-w-[40ch] text-foreground/75"
                        style={{
                          fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
                          lineHeight: 1.5,
                        }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
