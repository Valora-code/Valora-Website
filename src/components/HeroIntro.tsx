import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

interface HeroIntroProps {
  className?: string;
}

/**
 * Single-scene violet hero. Magazine-cover scale.
 *
 *  Wordmark: byte-for-byte identical markup, classes, and inline style to the
 *    footer wordmark (only color is overridden to cream). No `filter` on the
 *    type itself, so Anton's kerning matches the footer exactly.
 *
 *  Animation: center-curtain unfold. The wordmark starts clipped to a thin
 *    vertical sliver at the horizontal centerline (clip-path: inset(0 50%));
 *    the clip then opens outward in both directions to fully reveal the
 *    wordmark. clip-path is a vector mask, not a bitmap filter, so text
 *    rendering stays crisp at every frame.
 */
export const HeroIntro = ({ className }: HeroIntroProps) => {
  const { t } = useTranslation();

  return (
    <div className={cn("hero-intro", className)}>
      <div aria-hidden className="hero-intro-bg" />

      <div className="hero-intro-content">
        <div className="hero-intro-wordmark">
          <div className="select-none overflow-hidden px-3 sm:px-4 w-fit max-w-full">
            <span
              className="hero-intro-valora font-anton block w-fit text-center"
              style={{
                fontSize: "39vw",
                lineHeight: 0.9,
                letterSpacing: "-0.045em",
                color: "#FAF6F0",
              }}
              aria-label="Valora"
            >
              VALORA
            </span>
          </div>
        </div>

        <p className="hero-intro-subtitle">{t("marketing.hero.intro")}</p>
      </div>
    </div>
  );
};
