import { useState, useEffect, useMemo } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CurtainSteps, type PinnedStep } from "@/components/CurtainSteps";
import { HeroIntro } from "@/components/HeroIntro";
import { MarketingLanguageSwitcher } from "@/components/MarketingLanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import { LinkedInBrandButton } from "@/components/LinkedInBrandButton";
import { MarketingClerkWaitlistEmbed } from "@/components/MarketingClerkWaitlistEmbed";
import { VALORA_LINKEDIN_URL, MARKETING_INFO_EMAIL } from "@/config/marketing";
import { getSignupUrl } from "@/config/valoraApp";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type StatItem = { end: number; text: string };
type ProofCard = { age: string; amount: string; quote: string };
type FaqItem = { q: string; a: string };
type PinnedItem = { title: string; desc: string };

const useNavScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
};

const sectionInner = "mx-auto max-w-6xl px-6 sm:px-8 py-24 sm:py-32 md:py-36";

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navScrolled = useNavScroll();
  const { t } = useTranslation();

  const pinnedItems = t("marketing.brand.pinned.items", { returnObjects: true }) as PinnedItem[];

  const waitlistSchema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email({ message: t("marketing.waitlist.errors.invalidEmail") }).max(255),
      }),
    [t],
  );

  const navLinks = useMemo(
    () =>
      [
        ["why", t("marketing.nav.why")],
        ["how", t("marketing.nav.how")],
        ["proof", t("marketing.nav.proof")],
        ["faq", t("marketing.nav.faq")],
      ] as const,
    [t],
  );

  const problemStats = t("marketing.problem.stats", { returnObjects: true }) as StatItem[];
  const proofCards = t("marketing.proof.cards", { returnObjects: true }) as ProofCard[];
  const faqItems = t("marketing.faq.items", { returnObjects: true }) as FaqItem[];

  const heroProof = proofCards[0];
  const supportingProofs = proofCards.slice(1);

  const parseMoneyAmount = (amount: string) => {
    const digits = amount.replace(/\D/g, "");
    const value = parseInt(digits, 10) || 0;
    const suffix = amount.replace(/[\d\s ]/g, "");
    return { value, suffix };
  };

  const formatMoney = (n: number) => n.toLocaleString("sv-SE").replace(/,/g, " ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = waitlistSchema.parse({ email });
      const subject = encodeURIComponent(t("marketing.waitlist.mailtoSubject"));
      const emailLine = t("marketing.waitlist.mailtoEmailLine");
      const body = encodeURIComponent(`${emailLine} ${validated.email}`);
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";

    if (id === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    // Fixed header slides in once scrollY > 80; offset so section tops aren't hidden under it.
    const header = document.querySelector<HTMLElement>("header");
    const offset = header?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  const scrollToSectionFromNav = (id: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(id));
      });
      return;
    }
    scrollToSection(id);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (window.location.hash !== "#waitlist") return;
    const tid = window.setTimeout(() => {
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(tid);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[var(--brand-violet)]/25">
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-all duration-300 ease-out",
          navScrolled
            ? "translate-y-0 opacity-100 border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
            : "pointer-events-none -translate-y-full opacity-0 border-transparent",
        )}
        aria-hidden={!navScrolled}
      >
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={mobileMenuOpen ? t("marketing.nav.menuCloseAria") : t("marketing.nav.menuAria")}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-nav"
          >
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Valora"
          >
            <ValoraLogo size="small" />
          </button>

          <Button
            variant="valora"
            size="sm"
            className="shrink-0 px-3 text-xs sm:px-5 sm:text-sm"
            onClick={() => scrollToSectionFromNav("waitlist")}
          >
            {t("marketing.hero.ctaWaitlist")}
          </Button>
        </div>

        <div
          id="primary-nav"
          className={cn(
            "border-t border-border bg-background",
            !mobileMenuOpen && "hidden",
          )}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <nav aria-label="Primary" className="space-y-1">
              {navLinks.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSectionFromNav(id)}
                  className="block w-full rounded-md py-3 text-left font-display text-3xl font-normal uppercase tracking-tight text-foreground transition-colors hover:text-[var(--brand-violet)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-4xl"
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="mt-6 flex items-center justify-end border-t border-border pt-6">
              <MarketingLanguageSwitcher />
              <a
                href={signupUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="font-anton text-sm uppercase tracking-[0.18em] text-foreground/65 transition-colors hover:text-foreground"
              >
                {t("marketing.nav.signup")}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — multi-stage cinematic intro. Violet brand canvas with
            "VALORA. / Autopiloten för dina lån" lands first, then the scene
            crossfades to cream with the navy mark drawing itself in. */}
        <section
          id="top"
          className="relative isolate flex h-screen w-full items-center justify-center overflow-hidden"
        >
          <HeroIntro />

          {/* Discreet scroll affordance — just a downward chevron */}
          <button
            type="button"
            onClick={() => scrollToSection("why")}
            aria-label="Scrolla ner"
            className="hero-scroll-cue"
          >
            <svg
              className="hero-scroll-cue-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </section>

        {/* WHY — cream-deep surface. Anton eyebrow + section head + 3-up stats. */}
        <section id="why" className="relative flex min-h-screen items-center overflow-hidden bg-cream-deep scroll-mt-24">
          <ScrollReveal subtle className={cn(sectionInner, "w-full")}>
            <div className="max-w-3xl">
              <p className="eyebrow-caption mb-5">{t("marketing.problem.eyebrow")}</p>
              <h2 className="display-section mb-6">
                <span>{t("marketing.problem.headline1")}</span>{" "}
                <span style={{ color: "hsl(var(--foreground) / 0.45)" }}>{t("marketing.problem.headline2")}</span>
              </h2>
              <p className="body-base max-w-[58ch] sm:text-lg">{t("marketing.problem.body")}</p>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {problemStats.map((item, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="border-t pt-6" style={{ borderColor: "hsl(var(--foreground) / 0.6)" }}>
                    <CountUpNumber
                      end={item.end}
                      suffix="%"
                      className="font-anton block text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.95] text-foreground nums-tab"
                    />
                    <p className="mt-4 text-sm leading-[1.55]" style={{ color: "hsl(var(--foreground) / 0.65)" }}>
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="mt-6 text-xs" style={{ color: "hsl(var(--foreground) / 0.45)" }}>
              {t("marketing.problem.statsFootnote")}
            </p>
          </ScrollReveal>
        </section>

        {/* HOW — curtain-scroll story. Each step is its own sticky panel
            that the next one slides up to cover. No pinning, no trap. */}
        <section id="how" className="relative overflow-visible bg-background scroll-mt-24">
          <CurtainSteps
            steps={[
              ...pinnedItems.map<PinnedStep>((item, i) => ({
                number: String(i + 1).padStart(2, "0"),
                eyebrow: t("marketing.brand.stepLabel"),
                title: item.title,
                body: item.desc,
              })),
              {
                number: "04",
                eyebrow: t("marketing.brand.stepLabel"),
                title: "",
                body: "",
                variant: "showcase" as const,
                background: "violet" as const,
                caption: t("marketing.brand.showcase.caption"),
                tagline: t("marketing.brand.showcase.tagline"),
                cta: {
                  label: t("marketing.hero.ctaWaitlist"),
                  onClick: () => scrollToSection("waitlist"),
                },
                image: {
                  src: "/images/proto-step-3.png",
                  alt: "Valora Hem: God kväll John — sänk dina kostnader med 3 224 kr per år",
                },
              },
            ]}
            heading={
              <div className="max-w-3xl">
                <p className="eyebrow-caption mb-5">{t("marketing.brand.pinned.eyebrow")}</p>
                <h2 className="display-section mb-4">{t("marketing.brand.pinned.headline")}</h2>
                <p className="body-base max-w-[52ch] text-[15px] sm:text-base">
                  {t("marketing.brand.statementSupport")}
                </p>
              </div>
            }
          />
        </section>

        {/* PROOF — the money-as-hero moment. ONE huge violet number, smaller supporting cards. */}
        <section id="proof" className="relative flex min-h-screen items-center overflow-hidden bg-cream-deep scroll-mt-24">
          <div aria-hidden className="glow-honey-br" />
          <div className={cn(sectionInner, "relative w-full")}>
            <ScrollReveal subtle>
              <p className="eyebrow-caption mb-5">{t("marketing.proof.eyebrow")}</p>
              <h2 className="display-section mb-14 max-w-[22ch]">
                <span>{t("marketing.proof.headline1")}</span>{" "}
                <span style={{ color: "hsl(var(--foreground) / 0.45)" }}>{t("marketing.proof.headline2")}</span>
              </h2>
            </ScrollReveal>

            {/* HERO MONEY — left-aligned, the largest typographic moment on the page. */}
            <ScrollReveal direction="up" delay={80}>
              <div className="grid items-end gap-10 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-7">
                  <p className="eyebrow-caption mb-4">
                    {t("marketing.proof.privatePerson")} · {heroProof.age}
                  </p>
                  <div
                    className="display-money max-w-[10ch] nums-tab"
                    style={{ color: "var(--brand-violet)" }}
                  >
                    {(() => {
                      const { value, suffix } = parseMoneyAmount(heroProof.amount);
                      return (
                        <CountUpNumber
                          end={value}
                          duration={1800}
                          format={(n) => formatMoney(n)}
                          suffix={suffix ? ` ${suffix}` : ""}
                        />
                      );
                    })()}
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em]" style={{ color: "hsl(var(--foreground) / 0.55)" }}>
                    {t("marketing.proof.perYear")}
                  </p>
                  <p className="mt-8 max-w-[44ch] text-base leading-[1.6]" style={{ color: "hsl(var(--foreground) / 0.75)" }}>
                    {heroProof.quote}
                  </p>
                </div>

                {/* SUPPORTING CARD — smaller, navy money, restrained white surface */}
                <div className="md:col-span-5">
                  {supportingProofs.map((item, i) => (
                    <article key={i} className="surface-card flex flex-col p-7 sm:p-8">
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <span className="eyebrow-caption">
                          {t("marketing.proof.privatePerson")} · {item.age}
                        </span>
                        <span className="pill-tag-accent">{t("marketing.proof.verified")}</span>
                      </div>
                      <div className="font-anton text-[clamp(3rem,5.5vw,4.5rem)] leading-[0.95] text-foreground nums-tab">
                        {(() => {
                          const { value, suffix } = parseMoneyAmount(item.amount);
                          return (
                            <CountUpNumber
                              end={value}
                              duration={1800}
                              format={(n) => formatMoney(n)}
                              suffix={suffix ? ` ${suffix}` : ""}
                            />
                          );
                        })()}
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: "hsl(var(--foreground) / 0.55)" }}>
                        {t("marketing.proof.perYear")}
                      </p>
                      <p className="mt-6 text-[14px] leading-[1.55]" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
                        {item.quote}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* WAITLIST — moment of decision. Solid violet brand canvas. White form card. */}
        <section
          id="waitlist"
          className="relative flex min-h-screen items-center overflow-hidden scroll-mt-24"
          style={{ background: "var(--brand-violet)" }}
        >
          <ScrollReveal subtle className={cn("relative z-10 mx-auto max-w-xl px-6 py-24 sm:px-8 sm:py-28 md:py-32")}>
            <p
              className="mb-5 text-center font-anton text-[13px] uppercase tracking-[0.16em]"
              style={{ color: "hsl(221 39% 11% / 0.65)" }}
            >
              {t("marketing.waitlist.caption")}
            </p>
            <h2
              className="mb-4 text-center font-anton text-foreground"
              style={{
                fontSize: "clamp(4.5rem, 9vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
              }}
            >
              {t("marketing.waitlist.title")}
            </h2>
            <p
              className="mb-10 text-center text-base sm:text-lg"
              style={{ color: "hsl(221 39% 11% / 0.75)" }}
            >
              {t("marketing.waitlist.subtitle")}
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="surface-card p-7 sm:p-9"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-anton text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "hsl(var(--foreground) / 0.6)" }}
                  >
                    {t("marketing.waitlist.emailLabel")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t("marketing.waitlist.emailPlaceholder")}
                    className="h-auto rounded-lg border border-foreground/10 bg-background px-3.5 py-3 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 focus-visible:border-[var(--brand-violet)] focus-visible:ring-[var(--brand-violet)]/15"
                  />
                </div>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-[16px] font-bold tracking-tight text-foreground transition-all duration-200 hover:bg-[var(--brand-violet-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    style={{ background: "var(--brand-violet)" }}
                  >
                    <span>{t("marketing.waitlist.submit")}</span>
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </form>
            ) : (
              <div className="surface-card p-9 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--brand-violet-soft)" }}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25} style={{ color: "var(--brand-violet-dark)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-foreground sm:text-base">{t("marketing.waitlist.success")}</p>
              </div>
            )}
          </ScrollReveal>
        </section>

        {/* FAQ — cream, clean accordion. No violet here; it's a quiet section. */}
        <section id="faq" className="relative flex min-h-screen items-center overflow-hidden bg-background scroll-mt-24">
          <ScrollReveal subtle className={cn(sectionInner, "w-full max-w-3xl")}>
            <p className="eyebrow-caption mb-5">{t("marketing.faq.eyebrow")}</p>
            <h2 className="display-section mb-12">{t("marketing.faq.title")}</h2>
            <Accordion type="single" collapsible className="border-t border-border">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-semibold hover:no-underline sm:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-[1.6]" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </section>

      </main>

      {/* FOOTER — editorial Guvani-style: 4 columns of plain links above a
          full-bleed Anton wordmark cropped to the bottom. */}
      <footer className="relative overflow-hidden border-t border-border bg-background">
        <div className="mx-auto max-w-[1600px] px-6 pt-20 pb-0 sm:px-10 sm:pt-24 lg:px-16">
          <div className="grid gap-12 sm:grid-cols-3">
            <div>
              <p className="eyebrow-caption mb-6">{t("marketing.footer.colKontakt")}</p>
              <a
                href="mailto:info@valora.se"
                className="text-base text-foreground transition-opacity hover:opacity-70"
              >
                info@valora.se
              </a>
              <div className="mt-4">
                <LinkedInBrandButton
                  href={VALORA_LINKEDIN_URL}
                  aria-label={t("marketing.footer.linkedin")}
                />
              </div>
            </div>

            <div>
              <p className="eyebrow-caption mb-6">{t("marketing.footer.colStudio")}</p>
              <p className="text-base text-foreground">
                {t("marketing.brand.footer.addressLine")}
              </p>
            </div>

            <div>
              <p className="eyebrow-caption mb-6">{t("marketing.footer.colIndex")}</p>
              <ul className="space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("top")}
                    className="text-base text-foreground transition-opacity hover:opacity-70"
                  >
                    {t("marketing.footer.home")}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection("faq")}
                    className="text-base text-foreground transition-opacity hover:opacity-70"
                  >
                    {t("marketing.footer.faqShort")}
                  </button>
                </li>
                <li>
                  <Link
                    to="/integritetspolicy"
                    className="text-base text-foreground transition-opacity hover:opacity-70"
                  >
                    {t("marketing.footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/anvandarvillkor"
                    className="text-base text-foreground transition-opacity hover:opacity-70"
                  >
                    {t("marketing.footer.terms")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom strip — org/copyright */}
          <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-border pt-8 text-xs sm:flex-row sm:items-center" style={{ color: "hsl(var(--foreground) / 0.6)" }}>
            <span>© {new Date().getFullYear()} · {t("marketing.brand.footer.orgLine")}</span>
            <span>{t("marketing.brand.footer.foundedLine")}</span>
          </div>
        </div>

        {/* VALORA wordmark — stretched end-to-end, fully visible */}
        <div
          aria-hidden
          className="select-none overflow-hidden px-3 pt-12 pb-4 sm:px-4 sm:pt-16 sm:pb-6"
        >
          <span
            className="font-anton block w-full text-center text-foreground"
            style={{
              fontSize: "39vw",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            VALORA
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
