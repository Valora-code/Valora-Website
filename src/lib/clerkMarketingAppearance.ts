import type { ClerkProviderProps } from "@clerk/react";

type MarketingClerkAppearance = NonNullable<ClerkProviderProps["appearance"]>;

/**
 * Clerk embedded UI aligned with marketing tokens (`src/index.css` — teal primary).
 */
export const marketingClerkAppearance: MarketingClerkAppearance = {
  layout: {
    socialButtonsVariant: "blockButton",
    socialButtonsPlacement: "bottom",
  },
  variables: {
    colorPrimary: "hsl(172 52% 32%)",
    colorDanger: "hsl(0 72% 48%)",
    colorSuccess: "hsl(172 52% 32%)",
    colorWarning: "hsl(38 92% 50%)",
    colorBackground: "hsl(210 25% 98%)",
    colorInputBackground: "hsl(0 0% 100%)",
    colorInputText: "hsl(220 18% 12%)",
    colorText: "hsl(220 18% 12%)",
    colorTextSecondary: "hsl(220 10% 38%)",
    colorTextOnPrimaryBackground: "hsl(0 0% 100%)",
    colorNeutral: "hsl(210 14% 90%)",
    borderRadius: "0.5rem",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: "0.9375rem",
  },
  elements: {
    rootBox: "w-full",
    card: "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
    headerTitle: "text-xl font-semibold tracking-tight text-foreground",
    headerSubtitle: "text-muted-foreground text-sm",
    formFieldLabel: "text-foreground text-sm font-medium",
    formFieldInput:
      "rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground",
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium",
    footerActionLink: "text-primary font-medium hover:text-primary/90",
    formFieldErrorText: "text-destructive",
    alertText: "text-destructive",
  },
};
