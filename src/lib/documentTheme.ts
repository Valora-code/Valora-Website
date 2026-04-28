import type { Appearance } from "@/hooks/use-theme";

/** Routes where the UI is designed as a fixed light palette (hardcoded creams / teals). */
const LIGHT_ONLY_PATHNAMES = new Set(["/", "/integritetspolicy", "/anvandarvillkor"]);

/**
 * Keeps `<html class="dark">` and `color-scheme` aligned with the current route and
 * stored appearance. Marketing pages ignore dark mode so they do not inherit the
 * violet “.dark” canvas behind painterly sections.
 */
export function syncDocumentTheme(pathname: string, appearance: Appearance) {
  const forceLight = LIGHT_ONLY_PATHNAMES.has(pathname);
  const useDark = !forceLight && appearance === "dark";
  const root = document.documentElement;
  root.classList.toggle("dark", useDark);
  root.style.colorScheme = forceLight ? "light" : useDark ? "dark" : "light";
}
