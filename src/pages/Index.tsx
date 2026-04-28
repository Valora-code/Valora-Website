import { useState, useEffect, useMemo } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { StarMark } from "@/components/StarMark";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { PainterlyStepCard } from "@/components/PainterlyStepCard";
import { CountUpNumber } from "@/components/CountUpNumber";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MarketingLanguageSwitcher } from "@/components/MarketingLanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useScrollParallax } from "@/hooks/use-scroll-parallax";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";
import { getSignupUrl } from "@/config/valoraApp";
import { cn } from "@/lib/utils";

type StatItem = { end: number; text: string };
type IndustryItem = { label: string; delay: number };
type ProofCard = { age: string; amount: string; quote: string };
type FaqItem = { q: string; a: string };
type WaitlistOption = { value: string; label: string };
type PinnedItem = { title: string; desc: string };

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

const sectionInner = "mx-auto max-w-6xl px-6 sm:px-8 py-24 sm:py-32 md:py-40";
const sectionInnerTight = "mx-auto max-w-6xl px-6 sm:px-8 py-20 sm:py-24 md:py-28";

const Index = () => {
  const [email, setEmail] = useState("");
  const [optimize, setOptimize] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navScrolled = useNavScroll();
  const heroParallaxY = useScrollParallax(0.1);
  const { t } = useTranslation();
  const signupUrl = getSignupUrl();

  const optimizeOptions = t("marketing.waitlist.optimizeOptions", { returnObjects: true }) as WaitlistOption[];
  const pinnedItems = t("marketing.brand.pinned.items", { returnObjects: true }) as PinnedItem[];

  const waitlistSchema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email({ message: t("marketing.waitlist.errors.invalidEmail") }).max(255),
        optimize: z.array(z.string()).min(1, { message: t("marketing.waitlist.errors.selectAtLeastOne") }),
      }),
    [t],
  );

  const toggleOptimize = (value: string) => {
    setOptimize((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

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
  const proofCards = t("marketing.proof.cards", { returnObjects: true }) as ProofCard[];
  const faqItems = t("marketing.faq.items", { returnObjects: true }) as FaqItem[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = waitlistSchema.parse({ email, optimize });
      const subject = encodeURIComponent(t("marketing.waitlist.mailtoSubject"));
      const emailLine = t("marketing.waitlist.mailtoEmailLine");
      const optimizeLine = t("marketing.waitlist.mailtoOptimizeLine");
      const optimizeLabels = validated.optimize
        .map((v) => optimizeOptions.find((o) => o.value === v)?.label ?? v)
        .join(", ");
      const body = encodeURIComponent(
        [
          `${emailLine} ${validated.email}`,
          `${optimizeLine} ${optimizeLabels}`,
        ].join("\n"),
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
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-strong/25">
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-transparent bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
          navScrolled && "border-border bg-background/95 supports-[backdrop-filter]:bg-background/85",
        )}
      >
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          {/* Left — hamburger */}
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

          {/* Center — logo (absolutely positioned to the geometric center) */}
          <button
            type="button"
            onClick={() => scrollToSection("top")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Valora"
          >
            <ValoraLogo size="small" />
          </button>

          {/* Right — primary CTA */}
          <Button
            variant="valora"
            size="sm"
            className="shrink-0 px-3 text-xs sm:px-5 sm:text-sm"
            onClick={() => scrollToSection("waitlist")}
          >
            {t("marketing.hero.ctaWaitlist")}
          </Button>
        </div>

        {/* Slide-down menu */}
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
                  onClick={() => {
                    scrollToSection(id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-md py-3 text-left font-display text-2xl font-light text-foreground transition-colors hover:text-brand-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-3xl"
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
              <MarketingLanguageSwitcher />
              <a
                href={signupUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("marketing.nav.signup")}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — centered "moment" card on cream canvas. */}
        {/* HERO — atmospheric blob; copy floats on a painterly canvas. */}
        <section id="top" className="relative overflow-hidden bg-background">
          <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 md:pt-28 md:pb-40">
            <div className="relative isolate">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ transform: `translate3d(0, ${heroParallaxY}px, 0)`, willChange: "transform" }}
              >
                <HeroAtmosphere className="absolute left-1/2 top-1/2 h-[150%] w-[125%] max-w-none -translate-x-1/2 -translate-y-1/2 sm:w-[110%]" />
              </div>

              <ScrollReveal
                subtle
                className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-2 py-20 text-center sm:px-6 sm:py-28 md:py-36"
              >
                <h1 className="display-hero mb-8 max-w-[16ch]">
                  <span className="text-foreground">{t("marketing.hero.title1")}</span>{" "}
                  <span className="text-foreground/45">{t("marketing.hero.title2")}</span>
                </h1>
                <p className="body-lead mb-12 max-w-[48ch] text-foreground/75">
                  {t("marketing.hero.subtitle")}
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button variant="valora" size="lg" onClick={() => scrollToSection("waitlist")}>
                    {t("marketing.hero.ctaWaitlist")}
                  </Button>
                  <Button variant="valoraGhost" size="lg" onClick={() => scrollToSection("how")}>
                    {t("marketing.hero.ctaHow")}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
              {t("marketing.hero.trustWaitlist")}{" "}
              <a href={signupUrl} className="font-medium text-foreground underline underline-offset-4 decoration-accent-strong/60 hover:decoration-accent-strong">
                {t("marketing.nav.signup")}
              </a>
              {t("marketing.hero.trustSignupSuffix")}
              {" · "}
              <Link to="/integritetspolicy" className="font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground">
                {t("marketing.footer.privacy")}
              </Link>
              {" · "}
              <Link to="/anvandarvillkor" className="font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground">
                {t("marketing.footer.terms")}
              </Link>
            </p>
          </div>
        </section>

        {/* WHY — problem text, featured Talentium-style card, then stats. */}
        <section id="why" className="relative overflow-hidden bg-cream-deep scroll-mt-24">
          {/* Soft fade from previous section's cream */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#FAF6F0] to-transparent"
          />
          <ScrollReveal subtle className={sectionInner}>
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("marketing.problem.eyebrow")}
              </p>
              <h2 className="display-section mb-6">
                {t("marketing.problem.headline1")}{" "}
                <span className="text-foreground/40">{t("marketing.problem.headline2")}</span>
              </h2>
              <p className="text-base leading-[1.65] text-muted-foreground sm:text-lg">{t("marketing.problem.body")}</p>
            </div>

            {/* FEATURED CARD — painterly Stockholm-dusk panel; edges feather into cream. */}
            <ScrollReveal scale={0.92} className="mx-auto mt-16 max-w-3xl sm:mt-20 md:max-w-4xl">
            <div className="relative">
              {/* Painterly backdrop = real photo + atmospheric overlays + grain. Edges feather into cream. */}
              <div
                aria-hidden
                className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[#1A2D2A] sm:rounded-[2.25rem]"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 110% 110% at center, black 55%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 110% 110% at center, black 55%, transparent 100%)",
                }}
              >
                {/* Base photo layer — Monet-style oil painting: sunset garden, willows, water lily pond. */}
                <img
                  src="/images/marknaden-painting.jpg"
                  alt=""
                  className="painterly-parallax absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter: "blur(5px) saturate(1.5) brightness(1.03) contrast(1.12)",
                    transform: "scale(1.14)",
                  }}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Atmospheric overlay = lavender-sunset gradient + watercolor zones + heavy grain */}
                <svg
                  viewBox="0 0 800 600"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Vertical base — Monet garden: peach sunset → warm green → forest → deep water */}
                    <linearGradient id="duskCardBg" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#E8A87C" stopOpacity="0.32" />
                      <stop offset="28%" stopColor="#A88A6E" stopOpacity="0.22" />
                      <stop offset="55%" stopColor="#5A7A4E" stopOpacity="0.2" />
                      <stop offset="78%" stopColor="#2A4F5E" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#142A38" stopOpacity="0.62" />
                    </linearGradient>

                    {/* Painterly color clouds — tuned to the painting's palette */}
                    <radialGradient id="duskWarmGlow" cx="38%" cy="20%" r="44%">
                      <stop offset="0%" stopColor="#F2B888" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#F2B888" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="duskCoolMist" cx="80%" cy="78%" r="46%">
                      <stop offset="0%" stopColor="#3A6E80" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#3A6E80" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="duskDeepShade" cx="88%" cy="92%" r="36%">
                      <stop offset="0%" stopColor="#0C1F2A" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#0C1F2A" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="duskHighlight" cx="22%" cy="18%" r="32%">
                      <stop offset="0%" stopColor="#F8D3A8" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#F8D3A8" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="duskAmberSpark" cx="55%" cy="46%" r="28%">
                      <stop offset="0%" stopColor="#7E9A5E" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#7E9A5E" stopOpacity="0" />
                    </radialGradient>
                    {/* Extra cloud for richer painterly mixing — warm peach reflection low-right */}
                    <radialGradient id="duskPeachCloud" cx="68%" cy="62%" r="28%">
                      <stop offset="0%" stopColor="#E89A6C" stopOpacity="0.38" />
                      <stop offset="100%" stopColor="#E89A6C" stopOpacity="0" />
                    </radialGradient>

                    {/* Text-readability scrim — darkens the upper portion so cream text reads on bright sunset */}
                    <linearGradient id="duskTextScrim" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
                      <stop offset="40%" stopColor="#000000" stopOpacity="0.32" />
                      <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>

                    {/* Heavier canvas tooth — lower frequency = bigger noise grains, reads as paint-stroke texture */}
                    <filter id="duskGrain" x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                      <feColorMatrix
                        values="0 0 0 0 0.95
                                0 0 0 0 0.92
                                0 0 0 0 0.85
                                0 0 0 1 -0.4"
                      />
                    </filter>
                  </defs>

                  {/* Semi-transparent gradient — lets the photo peek through */}
                  <rect width="100%" height="100%" fill="url(#duskCardBg)" />
                  {/* Painterly color clouds */}
                  <rect width="100%" height="100%" fill="url(#duskWarmGlow)" />
                  <rect width="100%" height="100%" fill="url(#duskCoolMist)" />
                  <rect width="100%" height="100%" fill="url(#duskDeepShade)" />
                  <rect width="100%" height="100%" fill="url(#duskHighlight)" />
                  <rect width="100%" height="100%" fill="url(#duskAmberSpark)" />
                  <rect width="100%" height="100%" fill="url(#duskPeachCloud)" />
                  {/* Text-readability scrim — sits over the painting + clouds, darkens upper area for cream text */}
                  <rect width="100%" height="100%" fill="url(#duskTextScrim)" />
                  {/* Heavy grain — pushed for canvas-tooth, oil-painting feel */}
                  <rect
                    width="100%"
                    height="100%"
                    filter="url(#duskGrain)"
                    opacity="1"
                    style={{ mixBlendMode: "overlay" }}
                  />
                </svg>
              </div>

              {/* Content — cream text layered on top, no mask so it stays sharp */}
              <div className="relative z-10 flex flex-col p-8 sm:p-10 md:p-14">
                <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#F8F1E0] backdrop-blur-sm">
                  {t("marketing.industry.eyebrow")}
                </span>
                <h3
                  className="display-section mb-5 max-w-[18ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.05]"
                  style={{ color: "#F8F1E0" }}
                >
                  {t("marketing.industry.headline1")}{" "}
                  <span style={{ color: "rgba(248, 241, 224, 0.55)" }}>
                    {t("marketing.industry.headline2")}
                  </span>
                </h3>
                <p
                  className="mb-7 max-w-[58ch] text-[15px] leading-[1.6] sm:text-base"
                  style={{ color: "rgba(248, 241, 224, 0.82)" }}
                >
                  {t("marketing.industry.body")}
                </p>
                <ul className="mb-9 space-y-2.5">
                  {industryItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex gap-2.5 text-[14px] leading-[1.5]"
                      style={{ color: "rgba(248, 241, 224, 0.75)" }}
                    >
                      <StarMark size={9} className="mt-1.5 shrink-0 text-[#E8D29F]" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="valoraOnDark"
                  size="lg"
                  className="self-start"
                  onClick={() => scrollToSection("how")}
                >
                  {t("marketing.industry.cta")}
                </Button>
              </div>
            </div>
            </ScrollReveal>

            <div className="mt-20 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {problemStats.map((item, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="border-t border-foreground pt-6">
                    <CountUpNumber
                      end={item.end}
                      suffix="%"
                      className="font-display block text-6xl font-light leading-[0.95] text-foreground sm:text-7xl nums-prop"
                    />
                    <p className="mt-4 text-sm leading-[1.55] text-muted-foreground">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground/80">{t("marketing.problem.statsFootnote")}</p>
          </ScrollReveal>
        </section>

        {/* HOW — merged "Din ekonomi, autonomt" + "Så fungerar Valora". 3 painterly cards, zigzag layout. */}
        <section id="how" className="relative overflow-hidden bg-background scroll-mt-24">
          {/* Soft fade from previous section's cream-deep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#F5F0E8] to-transparent"
          />
          <div className={sectionInner}>
            <ScrollReveal subtle>
              <div className="max-w-3xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t("marketing.brand.pinned.eyebrow")}
                </p>
                <h2 className="display-section mb-6">{t("marketing.brand.pinned.headline")}</h2>
                <p className="body-lead">{t("marketing.brand.statementSupport")}</p>
              </div>
            </ScrollReveal>

            <div className="mt-16 space-y-10 sm:mt-20 sm:space-y-16">
              {/* CARD 01 — gradient panel using the hero atmosphere palette (cream → mint → deep teal). */}
              <ScrollReveal direction="left" delay={80} scale={0.92}>
                <div className="mr-auto max-w-3xl">
                  <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]">
                    {/* Hero-palette gradient backdrop + painterly grain */}
                    <svg
                      aria-hidden
                      viewBox="0 0 800 500"
                      preserveAspectRatio="xMidYMid slice"
                      className="absolute inset-0 h-full w-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="card1HeroGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#F8F1E0" />
                          <stop offset="22%" stopColor="#FFE9B2" />
                          <stop offset="42%" stopColor="#E5EDD8" />
                          <stop offset="60%" stopColor="#A8CFC4" />
                          <stop offset="82%" stopColor="#1a7a6e" />
                          <stop offset="100%" stopColor="#0D5048" />
                        </linearGradient>
                        <radialGradient id="card1WarmCloud" cx="28%" cy="35%" r="36%">
                          <stop offset="0%" stopColor="#FFE9B2" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#FFE9B2" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="card1MintCloud" cx="72%" cy="55%" r="40%">
                          <stop offset="0%" stopColor="#A8CFC4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#A8CFC4" stopOpacity="0" />
                        </radialGradient>
                        <filter id="card1Grain" x="0%" y="0%" width="100%" height="100%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                          <feColorMatrix
                            values="0 0 0 0 0.95
                                    0 0 0 0 0.92
                                    0 0 0 0 0.85
                                    0 0 0 1 -0.5"
                          />
                        </filter>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#card1HeroGrad)" />
                      <rect width="100%" height="100%" fill="url(#card1WarmCloud)" />
                      <rect width="100%" height="100%" fill="url(#card1MintCloud)" />
                      <rect
                        width="100%"
                        height="100%"
                        filter="url(#card1Grain)"
                        opacity="0.55"
                        style={{ mixBlendMode: "overlay" }}
                      />
                    </svg>

                    {/* Content — text sits in the upper light zone where slate ink reads cleanly */}
                    <div className="relative z-10 p-8 sm:p-10 md:p-14">
                      <span className="pill-tag-accent mb-6 inline-flex w-fit">
                        {`${t("marketing.brand.stepLabel")} 01`}
                      </span>
                      <h3 className="display-section mb-5 max-w-[18ch] text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.05] text-foreground">
                        {pinnedItems[0].title}
                      </h3>
                      <p className="max-w-[58ch] text-[15px] leading-[1.6] text-foreground/75 sm:text-base">
                        {pinnedItems[0].desc}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* CARD 02 — painterly oil-painting (moody trees + dramatic clouds), dusk overlay. */}
              <ScrollReveal direction="right" delay={80} scale={0.92}>
                <div className="ml-auto max-w-3xl">
                  <PainterlyStepCard
                    eyebrow={`${t("marketing.brand.stepLabel")} 02`}
                    title={pinnedItems[1].title}
                    body={pinnedItems[1].desc}
                    imageSrc="/images/process-2-painting.webp"
                    variant="dusk"
                  />
                </div>
              </ScrollReveal>

              {/* CARD 03 — painterly oil-painting forest (sage sky · teal trees · blue water). */}
              <ScrollReveal direction="left" delay={80} scale={0.92}>
                <div className="mr-auto max-w-3xl">
                  <PainterlyStepCard
                    eyebrow={`${t("marketing.brand.stepLabel")} 03`}
                    title={pinnedItems[2].title}
                    body={pinnedItems[2].desc}
                    imageSrc="/images/process-3-painting.jpg"
                    variant="forest"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* PROOF — verified savings only. Audience moves to its own dark block. */}
        <section id="proof" className="relative overflow-hidden bg-[#E5F0EB] scroll-mt-24">
          {/* Soft fade from previous section's cream */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#FAF6F0] to-transparent"
          />
          <div className={sectionInner}>
            <ScrollReveal subtle>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t("marketing.proof.eyebrow")}
              </p>
              <h2 className="display-section mb-16 max-w-[20ch]">
                {t("marketing.proof.headline1")}{" "}
                <span className="text-foreground/40">{t("marketing.proof.headline2")}</span>
              </h2>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {proofCards.map((item, i) => {
                const proofImages = ["/images/proof-1.jpeg", "/images/proof-2.avif"];
                const direction = i % 2 === 0 ? "left" : "right";
                return (
                  <ScrollReveal key={i} direction={direction} delay={i * 120} scale={0.92}>
                    <div className="relative">
                    {/* Painterly backdrop = real photo + heavy overlay + grain. Edges feather into the page. */}
                    <div
                      aria-hidden
                      className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[#15121E] sm:rounded-[2.25rem]"
                      style={{
                        WebkitMaskImage:
                          "radial-gradient(ellipse 110% 110% at center, black 55%, transparent 100%)",
                        maskImage:
                          "radial-gradient(ellipse 110% 110% at center, black 55%, transparent 100%)",
                      }}
                    >
                      <img
                        src={proofImages[i] ?? proofImages[0]}
                        alt=""
                        className="painterly-parallax absolute inset-0 h-full w-full object-cover"
                        style={{
                          filter: "blur(7px) saturate(1.7) brightness(1.06) contrast(1.18)",
                          transform: "scale(1.14)",
                        }}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />

                      <svg
                        viewBox="0 0 600 700"
                        preserveAspectRatio="xMidYMid slice"
                        className="absolute inset-0 h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          {/* Universal painterly evening palette — works for both lake/mountain photos */}
                          <linearGradient id={`proofBg-${i}`} x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#241F3A" stopOpacity="0.42" />
                            <stop offset="28%" stopColor="#5A4565" stopOpacity="0.3" />
                            <stop offset="55%" stopColor="#B87858" stopOpacity="0.26" />
                            <stop offset="78%" stopColor="#2A3F4A" stopOpacity="0.42" />
                            <stop offset="100%" stopColor="#15121E" stopOpacity="0.65" />
                          </linearGradient>

                          {/* Painterly color clouds — pulled back so the photo reads */}
                          <radialGradient id={`proofWarmGlow-${i}`} cx="32%" cy="58%" r="46%">
                            <stop offset="0%" stopColor="#D89060" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#D89060" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id={`proofCoolMist-${i}`} cx="78%" cy="22%" r="50%">
                            <stop offset="0%" stopColor="#7186AE" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#7186AE" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id={`proofDeepShade-${i}`} cx="85%" cy="92%" r="40%">
                            <stop offset="0%" stopColor="#0B0814" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0B0814" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id={`proofHighlight-${i}`} cx="22%" cy="18%" r="34%">
                            <stop offset="0%" stopColor="#D9C2D8" stopOpacity="0.38" />
                            <stop offset="100%" stopColor="#D9C2D8" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id={`proofSpark-${i}`} cx="55%" cy="80%" r="26%">
                            <stop offset="0%" stopColor="#5C7A8E" stopOpacity="0.42" />
                            <stop offset="100%" stopColor="#5C7A8E" stopOpacity="0" />
                          </radialGradient>

                          {/* Canvas-tooth grain — bigger grains, painted feel */}
                          <filter
                            id={`proofGrain-${i}`}
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                          >
                            <feTurbulence
                              type="fractalNoise"
                              baseFrequency="0.85"
                              numOctaves="3"
                              stitchTiles="stitch"
                            />
                            <feColorMatrix
                              values="0 0 0 0 0.95
                                      0 0 0 0 0.92
                                      0 0 0 0 0.85
                                      0 0 0 1 -0.4"
                            />
                          </filter>
                        </defs>

                        <rect width="100%" height="100%" fill={`url(#proofBg-${i})`} />
                        <rect width="100%" height="100%" fill={`url(#proofWarmGlow-${i})`} />
                        <rect width="100%" height="100%" fill={`url(#proofCoolMist-${i})`} />
                        <rect width="100%" height="100%" fill={`url(#proofDeepShade-${i})`} />
                        <rect width="100%" height="100%" fill={`url(#proofHighlight-${i})`} />
                        <rect width="100%" height="100%" fill={`url(#proofSpark-${i})`} />
                        <rect
                          width="100%"
                          height="100%"
                          filter={`url(#proofGrain-${i})`}
                          opacity="1"
                          style={{ mixBlendMode: "overlay" }}
                        />
                      </svg>
                    </div>

                    {/* Content — cream text on top */}
                    <div className="relative z-10 flex flex-col p-8 sm:p-10 md:p-12">
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                        <span
                          className="text-xs uppercase tracking-[0.14em]"
                          style={{ color: "rgba(248, 241, 224, 0.7)" }}
                        >
                          {t("marketing.proof.privatePerson")} · {item.age}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F8F1E0] backdrop-blur-sm">
                          {t("marketing.proof.verified")}
                        </span>
                      </div>
                      <div
                        className="font-display text-5xl font-light leading-[0.95] sm:text-6xl nums-prop"
                        style={{ color: "#F8F1E0" }}
                      >
                        {item.amount}
                      </div>
                      <p
                        className="mt-3 text-xs uppercase tracking-[0.14em]"
                        style={{ color: "rgba(248, 241, 224, 0.7)" }}
                      >
                        {t("marketing.proof.perYear")}
                      </p>
                      <p
                        className="mt-8 text-[15px] italic leading-[1.6]"
                        style={{ color: "rgba(248, 241, 224, 0.85)" }}
                      >
                        {item.quote}
                      </p>
                    </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* WAITLIST — slide 5: signup form on a painterly starry-night canvas. */}
        <section
          id="waitlist"
          className="relative overflow-hidden bg-[#3D5C5A] scroll-mt-24"
        >
          {/* Top fade — mint pastel bleeds into the teal landscape */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-72 bg-gradient-to-b from-[#E5F0EB] to-transparent"
          />
          {/* Bottom fade — teal landscape dissolves into cream for the next section */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-72 bg-gradient-to-t from-[#FAF6F0] to-transparent"
          />

          {/* Painterly teal-landscape backdrop — real watercolor base + gradient overlays + grain */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* Base photo — teal forest watercolor, blurred + saturated for painterly punch */}
            <img
              src="/images/teal-landscape.webp"
              alt=""
              className="painterly-parallax absolute inset-0 h-full w-full object-cover"
              style={{
                filter: "blur(8px) saturate(1.45) brightness(1.05) contrast(1.1)",
                transform: "scale(1.14)",
              }}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Atmospheric overlay — semi-transparent teal palette + watercolor zones + grain */}
            <svg
              viewBox="0 0 1200 900"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Teal mist gradient — sky-mist top → forest-deep bottom, alpha-transparent so photo reads */}
                <linearGradient id="tealMist" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#7AA8A0" stopOpacity="0.42" />
                  <stop offset="40%" stopColor="#5C8A82" stopOpacity="0.32" />
                  <stop offset="70%" stopColor="#3D6A5F" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1F3D38" stopOpacity="0.72" />
                </linearGradient>

                {/* Painterly cloud swirls — soft teal/forest tones */}
                <radialGradient id="tealMistCloud" cx="22%" cy="35%" r="42%">
                  <stop offset="0%" stopColor="#A8CFC8" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#A8CFC8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tealForestDeep" cx="78%" cy="78%" r="42%">
                  <stop offset="0%" stopColor="#1F3D38" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#1F3D38" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tealMidGlow" cx="55%" cy="50%" r="38%">
                  <stop offset="0%" stopColor="#5E9088" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#5E9088" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tealHighlight" cx="32%" cy="22%" r="28%">
                  <stop offset="0%" stopColor="#C8E0DA" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#C8E0DA" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tealForestEdge" cx="80%" cy="30%" r="32%">
                  <stop offset="0%" stopColor="#3F6E62" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3F6E62" stopOpacity="0" />
                </radialGradient>

                {/* Canvas-tooth grain */}
                <filter id="tealGrain" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix
                    values="0 0 0 0 0.95
                            0 0 0 0 0.95
                            0 0 0 0 0.9
                            0 0 0 1 -0.5"
                  />
                </filter>
              </defs>

              <rect width="100%" height="100%" fill="url(#tealMist)" />
              <rect width="100%" height="100%" fill="url(#tealMistCloud)" />
              <rect width="100%" height="100%" fill="url(#tealForestDeep)" />
              <rect width="100%" height="100%" fill="url(#tealMidGlow)" />
              <rect width="100%" height="100%" fill="url(#tealHighlight)" />
              <rect width="100%" height="100%" fill="url(#tealForestEdge)" />
              <rect
                width="100%"
                height="100%"
                filter="url(#tealGrain)"
                opacity="0.65"
                style={{ mixBlendMode: "overlay" }}
              />
            </svg>
          </div>

          <ScrollReveal subtle className={cn("relative z-10 mx-auto max-w-xl px-6 py-20 sm:px-8 sm:py-24 md:py-28")}>
            <p
              className="mb-4 text-center text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: "rgba(248, 241, 224, 0.65)" }}
            >
              {t("marketing.waitlist.caption")}
            </p>
            <h2 className="display-section mb-3 text-center text-[clamp(1.6rem,3.2vw,2.25rem)]" style={{ color: "#F8F1E0" }}>
              {t("marketing.waitlist.title")}
            </h2>
            <p
              className="mb-8 text-center text-sm sm:text-base"
              style={{ color: "rgba(248, 241, 224, 0.78)" }}
            >
              {t("marketing.waitlist.subtitle")}
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="overflow-hidden rounded-2xl border border-white/30 bg-white/85 p-7 shadow-[0_30px_80px_-30px_rgba(8,18,26,0.45)] backdrop-blur-2xl sm:p-9"
              >
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
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
                    className="h-auto rounded-lg border border-foreground/10 bg-white/70 px-3.5 py-3 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70 focus-visible:border-brand-teal focus-visible:ring-brand-teal/15"
                  />
                </div>

                {/* Hairline divider for editorial rhythm */}
                <div className="my-6 h-px w-full bg-foreground/8" />

                {/* Optimize checkboxes — premium chip-style toggles */}
                <fieldset>
                  <legend className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t("marketing.waitlist.optimizeLabel")}
                  </legend>
                  <p className="mt-2 text-xs text-muted-foreground/85">{t("marketing.waitlist.optimizeHint")}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {optimizeOptions.map((opt) => {
                      const checked = optimize.includes(opt.value);
                      return (
                        <label
                          key={opt.value}
                          htmlFor={`optimize-${opt.value}`}
                          className={cn(
                            "group flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 transition-all duration-150",
                            checked
                              ? "border-brand-teal bg-brand-teal/8 shadow-[inset_0_0_0_1px_hsl(var(--accent-strong)/0.2)]"
                              : "border-foreground/10 bg-white/40 hover:border-foreground/25 hover:bg-white/60",
                          )}
                        >
                          <span className="text-[13.5px] font-medium text-foreground">{opt.label}</span>
                          <Checkbox
                            id={`optimize-${opt.value}`}
                            checked={checked}
                            onCheckedChange={() => toggleOptimize(opt.value)}
                            className="h-[18px] w-[18px]"
                          />
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Submit — primary dark pill, tighter and more refined */}
                <button
                  type="submit"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-semibold tracking-tight text-white transition-all duration-200 hover:bg-foreground/92 hover:shadow-[0_8px_24px_-8px_rgba(8,18,26,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <span>{t("marketing.waitlist.submit")}</span>
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            ) : (
              <div className="rounded-2xl border border-white/30 bg-white/85 p-9 text-center shadow-[0_30px_80px_-30px_rgba(8,18,26,0.45)] backdrop-blur-2xl">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal-light">
                  <svg className="h-5 w-5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-foreground sm:text-base">{t("marketing.waitlist.success")}</p>
              </div>
            )}
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative overflow-hidden bg-background scroll-mt-24">
          <ScrollReveal subtle className={cn(sectionInner, "max-w-3xl")}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t("marketing.faq.eyebrow")}
            </p>
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
                  <AccordionContent className="pb-6 text-[15px] leading-[1.6] text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </section>

      </main>

      {/* FOOTER — establishment signals: regulator, org, founding, address. */}
      <footer className="border-t border-border bg-background">
        <ScrollReveal subtle>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
              <div className="max-w-sm">
                <span className="font-display text-3xl font-light text-foreground">Valora</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("marketing.footer.tagline")}</p>
              </div>
              <div className="grid gap-x-12 gap-y-8 sm:grid-cols-3">
                <div className="space-y-1.5 text-sm">
                  <p className="font-medium text-foreground">{t("marketing.brand.footer.orgLine")}</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="font-medium text-foreground">{t("marketing.brand.footer.foundedLine")}</p>
                  <p className="text-muted-foreground">{t("marketing.brand.footer.addressLine")}</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  <Link to="/integritetspolicy" className="block text-muted-foreground transition-colors hover:text-foreground">
                    {t("marketing.footer.privacy")}
                  </Link>
                  <Link to="/anvandarvillkor" className="block text-muted-foreground transition-colors hover:text-foreground">
                    {t("marketing.footer.terms")}
                  </Link>
                  <a href="mailto:info@valora.se" className="block text-muted-foreground transition-colors hover:text-foreground">
                    {t("marketing.footer.contact")}
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
              <span>© {new Date().getFullYear()} Guvani Labs AB</span>
              <span className="font-display text-sm italic font-light text-foreground/70">
                {t("marketing.brand.statement")}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default Index;
