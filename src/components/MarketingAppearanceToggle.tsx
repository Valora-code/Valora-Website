import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useTranslation } from "@/lib/i18n";

export function MarketingAppearanceToggle() {
  const { appearance, toggleAppearance } = useTheme();
  const { t } = useTranslation();
  const isDark = appearance === "dark";

  return (
    <button
      type="button"
      onClick={toggleAppearance}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/40 bg-background/40 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={t("shell.appearance.toggle")}
      title={t("shell.appearance.toggle")}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
