import { cn } from "@/lib/utils";
import linkedinMark from "@/assets/linkedin.svg?url";

type LinkedInBrandButtonProps = {
  href: string;
  /** Screen reader label (e.g. “LinkedIn”) */
  "aria-label": string;
  className?: string;
};

/**
 * LinkedIn company link — uses bundled SVG (SVG Repo / standard LinkedIn mark).
 */
export function LinkedInBrandButton({ href, "aria-label": ariaLabel, className }: LinkedInBrandButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center text-black transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <img
        src={linkedinMark}
        alt=""
        width={24}
        height={24}
        className="block size-6 max-h-full max-w-full object-contain"
        decoding="async"
      />
    </a>
  );
}
