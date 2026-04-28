import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { syncDocumentTheme } from "@/lib/documentTheme";

/**
 * Applies `<html class="dark">` and `color-scheme` after navigation and appearance changes.
 * Marketing routes stay in light tokens so painterly sections are not framed by the dark canvas.
 */
export function DocumentThemeRouteSync() {
  const { pathname } = useLocation();
  const { appearance } = useTheme();

  useLayoutEffect(() => {
    syncDocumentTheme(pathname, appearance);
  }, [pathname, appearance]);

  return null;
}
