import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";

/**
 * Fallback when `VITE_CLERK_PUBLISHABLE_KEY` is not set (e.g. local dev without `.env`).
 * Mirrors the previous mailto-based waitlist flow.
 */
export function MarketingWaitlistMailtoForm() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const waitlistSchema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email({ message: t("marketing.waitlist.errors.invalidEmail") }).max(255),
        note: z.string().trim().max(500, { message: t("marketing.waitlist.errors.noteMax") }).optional(),
      }),
    [t],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = waitlistSchema.parse({ email, note });
      const subject = encodeURIComponent(t("marketing.waitlist.mailtoSubject"));
      const noteLine = t("marketing.waitlist.mailtoNoteLine");
      const emailLine = t("marketing.waitlist.mailtoEmailLine");
      const body = encodeURIComponent(
        [`${emailLine} ${validatedData.email}`, "", validatedData.note ? `${noteLine}\n${validatedData.note}` : ""]
          .filter(Boolean)
          .join("\n"),
      );
      window.location.href = `mailto:info@valora.se?subject=${subject}&body=${body}`;
      setSubmitted(true);
      toast({
        title: t("marketing.waitlist.toastThanksTitle"),
        description: t("marketing.waitlist.toastThanksBody"),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t("marketing.waitlist.toastInvalidTitle"),
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("marketing.waitlist.toastErrorTitle"),
          description: t("marketing.waitlist.toastErrorBody"),
          variant: "destructive",
        });
      }
    }
  };

  if (submitted) {
    return (
      <div className="card-modern marketing-card-lift p-10 text-center">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-base leading-relaxed text-foreground">{t("marketing.waitlist.success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-accent marketing-card-lift space-y-5 rounded-lg p-6 sm:p-8">
      <p className="text-sm text-muted-foreground">{t("marketing.waitlist.fallbackHint")}</p>
      <div className="space-y-2">
        <label htmlFor="waitlist-fallback-email" className="text-sm font-medium text-foreground">
          {t("marketing.waitlist.emailLabel")}
        </label>
        <Input
          id="waitlist-fallback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background"
          placeholder={t("marketing.waitlist.emailPlaceholder")}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="waitlist-fallback-note" className="text-sm font-medium text-foreground">
          {t("marketing.waitlist.noteLabel")}
        </label>
        <Textarea
          id="waitlist-fallback-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="min-h-24 bg-background"
          placeholder={t("marketing.waitlist.notePlaceholder")}
        />
      </div>
      <Button type="submit" variant="valora" className="h-11 w-full" size="lg">
        {t("marketing.waitlist.submit")}
      </Button>
    </form>
  );
}
