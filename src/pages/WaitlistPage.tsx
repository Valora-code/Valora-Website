import { Waitlist } from "@clerk/react";
import { Link } from "react-router-dom";
import { ValoraLogo } from "@/components/ValoraLogo";
import { Button } from "@/components/ui/button";
import { MarketingWaitlistMailtoForm } from "@/components/MarketingWaitlistMailtoForm";
import { getSignInUrl } from "@/config/valoraApp";
import { getClerkPublishableKey } from "@/lib/clerkPublishableKey";
import { marketingClerkAppearance } from "@/lib/clerkMarketingAppearance";
import { useTranslation } from "@/lib/i18n";
import { MarketingLanguageSwitcher } from "@/components/MarketingLanguageSwitcher";
import { MarketingAppearanceToggle } from "@/components/MarketingAppearanceToggle";

export default function WaitlistPage() {
  const { t } = useTranslation();
  const signInUrl = getSignInUrl();
  const clerkPublishableKey = getClerkPublishableKey();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Valora"
          >
            <ValoraLogo size="small" />
          </Link>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <MarketingLanguageSwitcher />
            <MarketingAppearanceToggle />
            <Button variant="outline" size="sm" className="ml-1 h-9 shrink-0" asChild>
              <Link to="/">{t("marketing.waitlist.backHome")}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-12 sm:px-8 sm:py-16">
        <div className="mb-3 flex flex-col gap-2">
          <p className="section-eyebrow">{t("marketing.chrome.chapterWaitlist")}</p>
          <div className="marketing-accent-bar" aria-hidden />
        </div>
        <h1 className="headline-section mb-2">{t("marketing.waitlist.title")}</h1>
        <p className="caption mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{t("marketing.waitlist.caption")}</p>
        <p className="mb-8 text-sm text-muted-foreground">{t("marketing.waitlist.subtitle")}</p>

        {clerkPublishableKey ? (
          <Waitlist
            appearance={marketingClerkAppearance}
            signInUrl={signInUrl}
            afterJoinWaitlistUrl="/"
          />
        ) : (
          <MarketingWaitlistMailtoForm />
        )}
      </main>
    </div>
  );
}
