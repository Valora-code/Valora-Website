import { MarketingClerkWaitlistForm } from "@/components/MarketingClerkWaitlistForm";
import { MarketingWaitlistMailtoForm } from "@/components/MarketingWaitlistMailtoForm";
import { getSignInUrl } from "@/config/valoraApp";
import { getClerkPublishableKey } from "@/lib/clerkPublishableKey";

/**
 * Themed waitlist via Clerk `useWaitlist` when a publishable key is set; otherwise the mailto fallback.
 * Email-only join matches a typical Clerk Waitlist dashboard configuration.
 */
export function MarketingClerkWaitlistEmbed() {
  const signInUrl = getSignInUrl();
  const clerkPublishableKey = getClerkPublishableKey();

  if (!clerkPublishableKey) {
    return <MarketingWaitlistMailtoForm />;
  }

  return (
    <div className="min-h-[12rem] w-full">
      <MarketingClerkWaitlistForm signInUrl={signInUrl} />
    </div>
  );
}
