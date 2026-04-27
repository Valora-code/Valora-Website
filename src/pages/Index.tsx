import { useState, useEffect, useMemo } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MarketingLanguageSwitcher } from "@/components/MarketingLanguageSwitcher";
import { MarketingAppearanceToggle } from "@/components/MarketingAppearanceToggle";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useTranslation } from "@/lib/i18n";
import { getSignupUrl } from "@/config/valoraApp";
import { useMarketingScroll } from "@/hooks/use-marketing-scroll";
import { cn } from "@/lib/utils";

const HERO_SAVINGS_NUMBER_LOCALE = "sv-SE";

type StatItem = { end: number; text: string };
type IndustryItem = { label: string; delay: number };
type HowStep = { step: string; title: string; desc: string };
type ProofCard = { age: string; amount: string; quote: string };
type AudienceCard = { title: string; desc: string };
type FaqItem = { q: string; a: string };

const useNavScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
};

const sectionClass = "scroll-mt-24 border-t border-border bg-background";
const sectionInner = "mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 md:py-24";
const altSectionClass = "scroll-mt-24 border-t border-border bg-muted/40 dark:bg-muted/20";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navScrolled = useNavScroll();
  const { scrollY, readProgress, reducedMotion } = useMarketingScroll();
  const { t } = useTranslation();
  const signupUrl = getSignupUrl();
  const heroParallaxY = reducedMotion ? 0 : Math.min(scrollY, 520) * 0.055;

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
  const industryItems = t("marketing.industry.items", { returnObjects: true }) as IndustryItem[];
  const howSteps = t("marketing.how.steps", { returnObjects: true }) as HowStep[];
  const proofCards = t("marketing.proof.cards", { returnObjects: true }) as ProofCard[];
  const audienceItems = t("marketing.audience.items", { returnObjects: true }) as AudienceCard[];
  const faqItems = t("marketing.faq.items", { returnObjects: true }) as FaqItem[];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <header
        className={cn(
          "relative sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 shadow-[inset_0_-1px_0_0_hsl(var(--border)/0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 dark:border-border/80 dark:bg-background/75 dark:supports-[backdrop-filter]:bg-background/55",
          navScrolled && "border-border/90 shadow-sm dark:shadow-black/20",
        )}
      >
        {!reducedMotion ? (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-primary/[0.08] dark:bg-primary/[0.12]" aria-hidden>
            <div
              className="h-full w-full origin-left bg-primary/45 dark:bg-primary/40"
              style={{ transform: `scaleX(${readProgress})` }}
            />
          </div>
        ) : null}
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-4 py-2.5 sm:gap-8 sm:px-6 md:py-3 lg:max-w-7xl lg:gap-10 lg:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="shrink-0 rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Valora"
          >
            <ValoraLogo size="small" />
          </button>

          <nav className="hidden min-w-0 items-center gap-7 md:flex lg:gap-9" aria-label="Primary">
            {navLinks.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="shrink-0 rounded-md text-sm font-medium text-foreground/90 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-foreground/85"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden min-w-0 flex-1 md:block" aria-hidden />

          <div className="hidden shrink-0 items-center gap-1 sm:gap-2 md:flex">
            <MarketingLanguageSwitcher />
            <MarketingAppearanceToggle />
            <Button variant="valora" size="sm" className="ml-2 h-9 shrink-0 rounded-full px-5 text-sm" asChild>
              <a href={signupUrl}>{t("marketing.nav.signup")}</a>
            </Button>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 md:hidden">
            <MarketingLanguageSwitcher />
            <MarketingAppearanceToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex min-h-10 min-w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={mobileMenuOpen ? t("marketing.nav.menuCloseAria") : t("marketing.nav.menuAria")}
              aria-expanded={mobileMenuOpen}
              aria-controls="primary-mobile-nav"
            >
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="primary-mobile-nav"
          className={cn(
            "border-t border-border/70 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/88 dark:bg-background/92 md:hidden",
            !mobileMenuOpen && "hidden",
          )}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mx-auto w-full max-w-6xl space-y-0.5 px-4 py-3 sm:px-6 lg:max-w-7xl lg:px-8">
            {navLinks.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  scrollToSection(id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full rounded-md py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {label}
              </button>
            ))}
            <div className="pt-3">
              <Button variant="valora" size="sm" className="w-full" asChild>
                <a href={signupUrl} onClick={() => setMobileMenuOpen(false)}>
                  {t("marketing.nav.signup")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="scroll-mt-24 relative overflow-hidden border-b border-border bg-background">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[min(26rem,50vh)] bg-[radial-gradient(ellipse_72%_52%_at_50%_-5%,hsl(var(--primary)/0.08),transparent_58%)] will-change-transform dark:bg-[radial-gradient(ellipse_72%_52%_at_50%_-5%,hsl(var(--primary)/0.14),transparent_58%)]"
            style={
              reducedMotion
                ? undefined
                : { transform: `translate3d(0, ${heroParallaxY}px, 0)` }
            }
            aria-hidden
          />
          <ScrollReveal subtle className={`${sectionInner} relative max-w-3xl`}>
            <div className="mb-5 flex flex-col gap-2">
              <p className="section-eyebrow">{t("marketing.hero.eyebrow")}</p>
              <div className="marketing-accent-bar" aria-hidden />
            </div>
            <h1 className="headline-hero mb-6">
              <span className="text-foreground">{t("marketing.hero.title1")}</span>{" "}
              <span className="text-muted-foreground">{t("marketing.hero.title2")}</span>
            </h1>
            <p className="body-large mb-10">{t("marketing.hero.subtitle")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="valora" size="lg" className="h-11 px-7" onClick={() => scrollToSection("waitlist")}>
                {t("marketing.hero.ctaWaitlist")}
              </Button>
              <Button variant="outline" size="lg" className="h-11 border-border px-7" onClick={() => scrollToSection("how")}>
                {t("marketing.hero.ctaHow")}
              </Button>
            </div>

            <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted-foreground">
              {t("marketing.hero.trustWaitlist")}{" "}
              <a href={signupUrl} className="font-medium text-primary underline-offset-2 hover:underline">
                {t("marketing.nav.signup")}
              </a>
              {t("marketing.hero.trustSignupSuffix")}
              {" · "}
              <Link to="/integritetspolicy" className="font-medium text-primary underline-offset-2 hover:underline">
                {t("marketing.footer.privacy")}
              </Link>
              {" · "}
              <Link to="/anvandarvillkor" className="font-medium text-primary underline-offset-2 hover:underline">
                {t("marketing.footer.terms")}
              </Link>
            </p>

            <div className="card-modern marketing-card-lift mt-14 p-6 shadow-sm shadow-primary/5 sm:p-8">
              <p className="caption mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{t("marketing.chrome.signal")}</p>
              <div className="flex flex-wrap items-baseline gap-2">
                <CountUpNumber
                  end={190451}
                  suffix={t("marketing.savings.suffix")}
                  format={(n) => n.toLocaleString(HERO_SAVINGS_NUMBER_LOCALE)}
                  className="text-3xl font-semibold tabular-nums tracking-tight text-primary sm:text-4xl"
                />
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{t("marketing.savings.caption")}</p>
            </div>
          </ScrollReveal>
        </section>

        <section id="why" className={`${sectionClass} relative overflow-hidden`}>
          <ScrollReveal subtle className="relative">
            <div
              className="marketing-scroll-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              aria-hidden
            />
            <div className={sectionInner}>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <div className="mb-3 flex flex-col gap-2">
                    <p className="section-eyebrow">{t("marketing.chrome.chapterWhy")}</p>
                    <div className="marketing-accent-bar" aria-hidden />
                  </div>
                  <h2 className="headline-section mb-5">
                    {t("marketing.problem.headline1")}{" "}
                    <span className="text-muted-foreground">{t("marketing.problem.headline2")}</span>
                  </h2>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("marketing.problem.body")}</p>
                </div>
                <div className="card-modern marketing-card-lift p-6 sm:p-8">
                  <div className="mb-3 flex flex-col gap-2">
                    <p className="caption text-xs font-semibold uppercase tracking-wide text-primary">{t("marketing.industry.caption")}</p>
                    <div className="marketing-accent-bar" aria-hidden />
                  </div>
                  <h3 className="mb-6 text-xl font-semibold leading-snug sm:text-2xl">
                    {t("marketing.industry.headline1")}{" "}
                    <span className="text-muted-foreground">{t("marketing.industry.headline2")}</span>
                  </h3>
                  <ul className="space-y-3">
                    {industryItems.map((item) => (
                      <li key={item.label} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {problemStats.map((item, i) => (
                  <div key={i} className="card-modern marketing-card-lift p-6">
                    <CountUpNumber end={item.end} suffix="%" className="mb-2 block text-3xl font-semibold tabular-nums text-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground/90 sm:text-left">{t("marketing.problem.statsFootnote")}</p>

              <blockquote className="mx-auto mt-14 max-w-2xl rounded-lg border border-border bg-muted/30 px-6 py-8 text-center dark:bg-muted/10 sm:px-10 sm:py-10">
                <p className="text-lg font-medium leading-snug text-foreground sm:text-xl">{t("marketing.problem.quote")}</p>
                <footer className="mt-4 text-xs text-muted-foreground">{t("marketing.problem.quoteAttribution")}</footer>
              </blockquote>
            </div>
          </ScrollReveal>
        </section>

        <section id="how" className={`${altSectionClass} relative overflow-hidden`}>
          <ScrollReveal subtle className="relative">
            <div
              className="marketing-scroll-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              aria-hidden
            />
            <div className={sectionInner}>
              <div className="mb-3 flex flex-col gap-2">
                <p className="section-eyebrow">{t("marketing.chrome.chapterHow")}</p>
                <div className="marketing-accent-bar" aria-hidden />
              </div>
              <h2 className="headline-section mb-10 max-w-2xl">{t("marketing.how.title")}</h2>

              <ol className="mx-auto max-w-2xl list-none space-y-10 p-0">
                {howSteps.map((item) => (
                  <li key={item.step}>
                    <div className="flex gap-4 sm:gap-5">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-xs font-semibold text-primary shadow-sm shadow-primary/10"
                        aria-hidden
                      >
                        {item.step}
                      </span>
                      <div className="min-w-0 border-l-2 border-primary/15 pl-4 pt-0.5 sm:pl-5">
                        <h3 className="headline-card text-base sm:text-lg">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </section>

        <section id="proof" className={`${sectionClass} relative overflow-hidden`}>
          <ScrollReveal subtle className="relative">
            <div
              className="marketing-scroll-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              aria-hidden
            />
            <div className={sectionInner}>
              <div className="mb-3 flex flex-col gap-2">
                <p className="section-eyebrow">{t("marketing.chrome.chapterProof")}</p>
                <div className="marketing-accent-bar" aria-hidden />
              </div>
              <h2 className="headline-section mb-12 max-w-2xl">
                {t("marketing.proof.headline1")}{" "}
                <span className="text-muted-foreground">{t("marketing.proof.headline2")}</span>
              </h2>

              <div className="mb-10 grid gap-4 md:grid-cols-2">
                {proofCards.map((item, i) => (
                  <div key={i} className="card-accent marketing-card-lift flex flex-col p-6 sm:p-7">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {t("marketing.proof.privatePerson")} · {item.age}
                      </span>
                      <span className="rounded border border-primary/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        {t("marketing.proof.verified")}
                      </span>
                    </div>
                    <div className="text-3xl font-semibold tabular-nums text-primary sm:text-4xl">{item.amount}</div>
                    <p className="mb-4 text-xs text-muted-foreground">{t("marketing.proof.perYear")}</p>
                    <p className="mt-auto text-sm italic leading-relaxed text-muted-foreground">{item.quote}</p>
                  </div>
                ))}
              </div>

              <div className="mx-auto max-w-2xl rounded-lg border border-border bg-muted/25 px-6 py-8 text-center dark:bg-muted/10 sm:px-8">
                <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">{t("marketing.proof.quoteBottom")}</p>
              </div>

              <div className="mt-20">
                <h2 className="headline-section mb-8 text-center">{t("marketing.audience.title")}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {audienceItems.map((item, i) => (
                    <div key={i} className="card-modern marketing-card-lift p-6">
                      <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="waitlist" className={`${altSectionClass} relative overflow-hidden`}>
          <ScrollReveal subtle className="relative">
            <div
              className="marketing-scroll-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              aria-hidden
            />
            <div className={`${sectionInner} max-w-lg`}>
              <div className="mb-3 flex flex-col gap-2">
                <p className="section-eyebrow">{t("marketing.chrome.chapterWaitlist")}</p>
                <div className="marketing-accent-bar" aria-hidden />
              </div>
              <h2 className="headline-section mb-2">{t("marketing.waitlist.title")}</h2>
              <p className="caption mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{t("marketing.waitlist.caption")}</p>
              <p className="mb-8 text-sm text-muted-foreground">{t("marketing.waitlist.subtitle")}</p>

              <div className="card-accent marketing-card-lift space-y-6 rounded-lg p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-muted-foreground">{t("marketing.waitlist.homeTeaser")}</p>
                <Button variant="valora" className="h-11 w-full sm:w-auto" size="lg" asChild>
                  <Link to="/waitlist">{t("marketing.waitlist.openForm")}</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="faq" className={`${sectionClass} relative overflow-hidden`}>
          <ScrollReveal subtle className="relative">
            <div
              className="marketing-scroll-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
              aria-hidden
            />
            <div className={`${sectionInner} max-w-2xl`}>
              <div className="mb-3 flex flex-col items-center gap-2">
                <p className="section-eyebrow text-center">{t("marketing.chrome.faqEyebrow")}</p>
                <div className="marketing-accent-bar" aria-hidden />
              </div>
              <h2 className="headline-section mb-10 text-center">{t("marketing.faq.title")}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="card-modern marketing-card-lift rounded-lg border-0 px-4 data-[state=open]:bg-muted/30 sm:px-5 dark:data-[state=open]:bg-muted/10"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-medium hover:no-underline sm:text-base">{item.q}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <ScrollReveal subtle>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row sm:px-8">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <span className="text-sm font-semibold text-foreground">Valora</span>
              <span className="text-center text-xs text-muted-foreground sm:text-left">{t("marketing.footer.tagline")}</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {[
                { label: t("marketing.footer.privacy"), to: "/integritetspolicy" },
                { label: t("marketing.footer.terms"), to: "/anvandarvillkor" },
              ].map(({ label, to }) => (
                <Link key={to} to={to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {label}
                </Link>
              ))}
              <a href="mailto:info@valora.se" className="text-muted-foreground transition-colors hover:text-foreground">
                {t("marketing.footer.contact")}
              </a>
            </nav>
            <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default Index;
