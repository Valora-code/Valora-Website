import { useMemo, type ReactNode } from "react";
import { ClerkProvider } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { getClerkPublishableKey } from "@/lib/clerkPublishableKey";
import { marketingClerkAppearance } from "@/lib/clerkMarketingAppearance";

/**
 * Full URL of the page where `<Waitlist />` is embedded. Clerk compares this with the
 * "Waitlist" URL configured in the Clerk Dashboard — they must match or the form stays empty.
 */
function marketingWaitlistPageUrl(): string {
  if (typeof window === "undefined") return "/";
  const base = import.meta.env.BASE_URL ?? "/";
  const pathOnly = base.endsWith("/") ? base.slice(0, -1) || "/" : base;
  const prefix = pathOnly === "/" ? "" : pathOnly;
  return `${window.location.origin}${prefix}/`;
}

/**
 * Clerk must sit under `BrowserRouter` so we can wire SPA navigation (`routerPush` / `routerReplace`).
 */
export function ClerkProviderApp({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const publishableKey = getClerkPublishableKey();
  const waitlistUrl = useMemo(() => marketingWaitlistPageUrl(), []);

  if (!publishableKey) {
    return children;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      waitlistUrl={waitlistUrl}
      routerPush={(to) => void navigate(to)}
      routerReplace={(to) => void navigate(to, { replace: true })}
      appearance={marketingClerkAppearance}
    >
      {children}
    </ClerkProvider>
  );
}
