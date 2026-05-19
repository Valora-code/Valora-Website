import { useWaitlist } from "@clerk/react";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import { z } from "zod";

function firstGlobalMessage(
  global: { message?: string; longMessage?: string }[] | null | undefined,
): string | undefined {
  if (!global?.length) return undefined;
  const g = global[0];
  return g.longMessage ?? g.message;
}

/**
 * Clerk-backed waitlist using `useWaitlist` + themed Valora UI (no `<Waitlist />` chrome).
 * Must render under `ClerkProvider`.
 */
export function MarketingClerkWaitlistForm() {
  const { waitlist, errors, fetchStatus } = useWaitlist();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const emailSchema = useMemo(
    () => z.string().trim().email({ message: t("marketing.waitlist.errors.invalidEmail") }).max(255),
    [t],
  );

  const loading = fetchStatus === "fetching" || waitlist === null;
  const fieldError = errors.fields.emailAddress?.message;
  const globalError = firstGlobalMessage(errors.global);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlist || submitting) return;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: t("marketing.waitlist.toastInvalidTitle"),
        description: parsed.error.errors[0]?.message ?? t("marketing.waitlist.errors.invalidEmail"),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await waitlist.join({ emailAddress: parsed.data });
      if (error) {
        toast({
          title: t("marketing.waitlist.toastErrorTitle"),
          description: error.message || t("marketing.waitlist.toastErrorBody"),
          variant: "destructive",
        });
        return;
      }
      setJoined(true);
      toast({
        title: t("marketing.waitlist.toastThanksTitle"),
        description: t("marketing.waitlist.clerkSuccessToast"),
      });
    } catch {
      toast({
        title: t("marketing.waitlist.toastErrorTitle"),
        description: t("marketing.waitlist.toastErrorBody"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[10rem] flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <span className="inline-block size-6 animate-pulse rounded-full bg-muted-foreground/25" aria-hidden />
        <span>{t("marketing.waitlist.formLoading")}</span>
      </div>
    );
  }

  if (joined) {
    return (
      <div className="surface-card p-9 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--brand-violet-soft)" }}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25} style={{ color: "var(--brand-violet-dark)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm leading-relaxed text-foreground sm:text-base">{t("marketing.waitlist.clerkSuccess")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="surface-card space-y-8 p-7 sm:p-9">
      <div className="space-y-2">
        <label
          htmlFor="waitlist-clerk-email"
          className="font-anton text-[11px] uppercase tracking-[0.16em]"
          style={{ color: "hsl(var(--foreground) / 0.6)" }}
        >
          {t("marketing.waitlist.emailLabel")}
        </label>
        <Input
          id="waitlist-clerk-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
          placeholder={t("marketing.waitlist.emailPlaceholder")}
          className="h-auto rounded-lg border border-foreground/10 bg-background px-3.5 py-3 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 focus-visible:border-[var(--brand-violet)] focus-visible:ring-[var(--brand-violet)]/15"
          aria-invalid={Boolean(fieldError || globalError)}
          aria-describedby={fieldError || globalError ? "waitlist-clerk-email-error" : undefined}
        />
        {(fieldError || globalError) && (
          <p id="waitlist-clerk-email-error" className="text-sm text-destructive" role="alert">
            {fieldError ?? globalError}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="valora"
        className="h-auto w-full rounded-full px-7 py-4 text-[16px] font-bold"
        size="lg"
        disabled={submitting}
      >
        {submitting ? (
          t("marketing.waitlist.submitting")
        ) : (
          <>
            {t("marketing.waitlist.submit")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
