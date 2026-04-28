import { Waitlist } from "@clerk/react";
import { MarketingWaitlistMailtoForm } from "@/components/MarketingWaitlistMailtoForm";
import { getSignInUrl } from "@/config/valoraApp";
import { getClerkPublishableKey } from "@/lib/clerkPublishableKey";
import { marketingClerkAppearance } from "@/lib/clerkMarketingAppearance";
import { useTranslation } from "@/lib/i18n";

/**
 * Clerk `<Waitlist />` when a publishable key is set; otherwise the mailto fallback.
 * Which fields appear (e.g. email only vs name + email) is controlled in the Clerk Dashboard
 * for your waitlist instance, not in this component.
 */
export function MarketingClerkWaitlistEmbed() {
  const { t } = useTranslation();
  const signInUrl = getSignInUrl();
  const clerkPublishableKey = getClerkPublishableKey();

  if (!clerkPublishableKey) {
    return <MarketingWaitlistMailtoForm />;
  }

  return (
    <div className="min-h-[12rem] w-full">
      <Waitlist
        appearance={marketingClerkAppearance}
        signInUrl={signInUrl}
        afterJoinWaitlistUrl="/"
        fallback={
          <div className="flex min-h-[10rem] flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <span className="inline-block size-6 animate-pulse rounded-full bg-muted-foreground/25" aria-hidden />
            <span>{t("marketing.waitlist.formLoading")}</span>
          </div>
        }
      />
    </div>
  );
}
