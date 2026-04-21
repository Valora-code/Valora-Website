import { useState, useEffect, useRef, useMemo } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { MarketingLanguageSwitcher } from "@/components/MarketingLanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";
import { getSignupUrl } from "@/config/valoraApp";

/** Hero savings figure: always sv-SE grouping so it matches valora-tech.com (non-breaking space thousands). */
const HERO_SAVINGS_NUMBER_LOCALE = "sv-SE";

type StatItem = { end: number; text: string };
type IndustryItem = { label: string; delay: number };
type HowStep = { step: string; title: string; desc: string };
type ProofCard = { age: string; amount: string; quote: string };
type AudienceCard = { title: string; desc: string };
type FaqItem = { q: string; a: string };

// Cursor-following ambient glow
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, hsl(172 55% 52% / 0.04), transparent 60%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 hidden md:block" />;
};

// Nav with scroll-based opacity
const useNavScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
};

const Index = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navScrolled = useNavScroll();
  const { t } = useTranslation();
  const signupUrl = getSignupUrl();

  const waitlistSchema = useMemo(
    () =>
      z.object({
        email: z.string().trim().email({ message: t('marketing.waitlist.errors.invalidEmail') }).max(255),
        note: z.string().trim().max(500, { message: t('marketing.waitlist.errors.noteMax') }).optional(),
      }),
    [t],
  );

  const navLinks = useMemo(
    () =>
      [
        ['why', t('marketing.nav.why')],
        ['how', t('marketing.nav.how')],
        ['proof', t('marketing.nav.proof')],
        ['faq', t('marketing.nav.faq')],
      ] as const,
    [t],
  );

  const problemStats = t('marketing.problem.stats', { returnObjects: true }) as StatItem[];
  const industryItems = t('marketing.industry.items', { returnObjects: true }) as IndustryItem[];
  const howSteps = t('marketing.how.steps', { returnObjects: true }) as HowStep[];
  const proofCards = t('marketing.proof.cards', { returnObjects: true }) as ProofCard[];
  const audienceItems = t('marketing.audience.items', { returnObjects: true }) as AudienceCard[];
  const faqItems = t('marketing.faq.items', { returnObjects: true }) as FaqItem[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = waitlistSchema.parse({ email, note });
      const subject = encodeURIComponent(t('marketing.waitlist.mailtoSubject'));
      const noteLine = t('marketing.waitlist.mailtoNoteLine');
      const emailLine = t('marketing.waitlist.mailtoEmailLine');
      const body = encodeURIComponent(
        [
          `${emailLine} ${validatedData.email}`,
          "",
          validatedData.note ? `${noteLine}\n${validatedData.note}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      );
      window.location.href = `mailto:info@valora.se?subject=${subject}&body=${body}`;
      setSubmitted(true);
      toast({
        title: t('marketing.waitlist.toastThanksTitle'),
        description: t('marketing.waitlist.toastThanksBody'),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('marketing.waitlist.toastInvalidTitle'),
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t('marketing.waitlist.toastErrorTitle'),
          description: t('marketing.waitlist.toastErrorBody'),
          variant: "destructive",
        });
      }
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <CursorGlow />

      {/* Subtle top ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, hsl(220 14% 10%) 0%, transparent 100%)' }} />
      </div>

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navScrolled ? 'hsl(220 14% 5% / 0.92)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(20px)' : 'none',
          borderBottom: navScrolled ? '1px solid hsl(220 12% 16% / 0.3)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between gap-3">
            <ValoraLogo size="small" />

            <div className="hidden md:flex flex-1 items-center justify-end gap-8 min-w-0">
              {navLinks.map(([id, label]) => (
                <button key={id} type="button" onClick={() => scrollToSection(id)}
                  className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 relative group shrink-0">
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground/40 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <div className="flex items-center gap-2 shrink-0">
                <MarketingLanguageSwitcher />
                <MagneticButton strength={0.15}>
                  <Button variant="valora" size="sm" asChild>
                    <a href={signupUrl}>{t('marketing.nav.signup')}</a>
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div className="flex md:hidden items-center gap-0.5 shrink-0">
              <MarketingLanguageSwitcher />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('marketing.nav.menuAria')}
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu with animation */}
          <div
            className="md:hidden overflow-hidden transition-all duration-300 ease-out"
            style={{
              maxHeight: mobileMenuOpen ? '380px' : '0',
              opacity: mobileMenuOpen ? 1 : 0,
              pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            }}
          >
            <div className="pt-4 pb-2 space-y-1 border-t border-border/20 mt-4">
              {navLinks.map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </button>
              ))}
              <div className="pt-3">
                <Button variant="valora" size="sm" className="w-full" asChild>
                  <a href={signupUrl} onClick={() => setMobileMenuOpen(false)}>
                    {t('marketing.nav.signup')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-20 relative z-10">
        {/* Vignette gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 80% 55% at 50% 38%, hsl(172 50% 45% / 0.06) 0%, transparent 72%),
              radial-gradient(ellipse 55% 70% at 50% 0%, hsl(172 55% 50% / 0.04) 0%, transparent 52%),
              radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, hsl(220 14% 4% / 0.55) 100%)
            `
          }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="headline-hero fade-up mb-8">
            <span className="text-foreground">{t('marketing.hero.title1')}</span>
            <br />
            <span className="text-foreground/50 transition-colors duration-700 hover:text-foreground/70">{t('marketing.hero.title2')}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto fade-up-delay-1 mb-14 leading-relaxed font-light font-sans">
            {t('marketing.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up-delay-2 mb-24">
            <MagneticButton strength={0.3}>
              <Button variant="valora" size="lg" onClick={() => scrollToSection('waitlist')} className="cta-glow min-w-[200px]">
                {t('marketing.hero.ctaWaitlist')}
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <Button variant="valoraGhost" size="lg" onClick={() => scrollToSection('how')} className="min-w-[180px]">
                {t('marketing.hero.ctaHow')}
              </Button>
            </MagneticButton>
          </div>

          {/* Savings counter */}
          <div className="fade-up-delay-3">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 border border-border/25 rounded-full px-10 py-4 sm:py-5 bg-background-elevated/55 backdrop-blur-sm transition-all duration-500 hover:border-border/40 hover:bg-background-elevated/80">
              <CountUpNumber
                end={190451}
                suffix={t('marketing.savings.suffix')}
                format={(n) => n.toLocaleString(HERO_SAVINGS_NUMBER_LOCALE)}
                className="text-3xl sm:text-4xl font-serif font-normal text-primary tabular-nums tracking-tight"
              />
              <span className="text-muted-foreground text-sm">{t('marketing.savings.caption')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section id="why" className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="headline-section mb-6">
                {t('marketing.problem.headline1')}<br />
                <span className="text-muted-foreground">{t('marketing.problem.headline2')}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
                {t('marketing.problem.body')}
              </p>
            </div>
          </ScrollReveal>

          {/* Bento grid stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            {problemStats.map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-modern rounded-2xl p-8 h-full group hover:scale-[1.01] transition-transform duration-300">
                  <CountUpNumber end={item.end} suffix="%" className="text-5xl font-sans font-normal text-primary mb-4 block tabular-nums" />
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quote */}
          <ScrollReveal delay={400}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-2xl sm:text-3xl font-serif font-normal italic leading-relaxed text-foreground/90 mb-4">
                {t('marketing.problem.quote')}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-border/40" />
                <p className="text-sm text-muted-foreground">{t('marketing.problem.quoteAttribution')}</p>
                <div className="h-px w-8 bg-border/40" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── INDUSTRY PROBLEMS ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section className="py-24 sm:py-32 px-6 bg-background-elevated relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="caption text-primary mb-4 block">{t('marketing.industry.caption')}</span>
              <h2 className="headline-section max-w-3xl mx-auto">
                {t('marketing.industry.headline1')}<br />
                <span className="text-muted-foreground">{t('marketing.industry.headline2')}</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            {industryItems.map((item, i) => (
              <ScrollReveal key={i} delay={item.delay}>
                <div className="flex items-center gap-5 py-5 border-b border-border/15 last:border-0 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(172_50%_45%/0.45)] transition-all duration-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section id="how" className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-20">{t('marketing.how.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {howSteps.map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-modern rounded-2xl p-8 h-full group hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/12 group-hover:border-primary/25 transition-all duration-300">
                      <span className="text-[11px] font-medium text-primary/70">{item.step}</span>
                    </div>
                    <div className="h-px flex-1 bg-border/20 group-hover:bg-border/40 transition-colors duration-500" />
                  </div>
                  <h3 className="headline-card mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROOF ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section id="proof" className="py-24 sm:py-32 lg:py-40 px-6 bg-background-elevated relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-20">
              {t('marketing.proof.headline1')}<br />
              <span className="text-muted-foreground">{t('marketing.proof.headline2')}</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
            {proofCards.map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-accent rounded-2xl p-8 h-full group hover:scale-[1.005] transition-transform duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-muted-foreground">
                      {t('marketing.proof.privatePerson')}, {item.age}
                    </span>
                    <span className="text-[11px] text-primary border border-primary/15 rounded-full px-3 py-1 group-hover:border-primary/30 transition-colors duration-300">
                      {t('marketing.proof.verified')}
                    </span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-sans font-normal tabular-nums text-primary mb-1">{item.amount}</div>
                  <div className="text-xs text-muted-foreground mb-8">{t('marketing.proof.perYear')}</div>
                  <p className="text-sm text-muted-foreground font-light italic leading-relaxed">{item.quote}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="card-modern rounded-2xl p-10 max-w-4xl mx-auto text-center">
              <p className="text-xl sm:text-2xl font-serif font-normal italic text-foreground/80 leading-relaxed">
                {t('marketing.proof.quoteBottom')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── AUDIENCE ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-20">{t('marketing.audience.title')}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {audienceItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-modern rounded-2xl p-8 h-full group hover:scale-[1.01] transition-transform duration-300">
                  <h3 className="headline-card mb-3 group-hover:text-foreground transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WAITLIST ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section id="waitlist" className="py-24 sm:py-32 lg:py-40 px-6 bg-background-elevated relative z-10">
        <div className="max-w-xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="caption text-primary mb-4 block">{t('marketing.waitlist.caption')}</span>
              <h2 className="headline-section mb-4">{t('marketing.waitlist.title')}</h2>
              <p className="text-base text-muted-foreground font-light">
                {t('marketing.waitlist.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="card-accent rounded-2xl p-8 sm:p-10 space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-light text-foreground/80">{t('marketing.waitlist.emailLabel')}</label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="bg-background border-border/50 focus:border-primary/40 transition-colors duration-300" placeholder={t('marketing.waitlist.emailPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="note" className="text-sm font-light text-foreground/80">{t('marketing.waitlist.noteLabel')}</label>
                  <Textarea id="note" value={note} onChange={e => setNote(e.target.value)}
                    className="bg-background border-border/50 focus:border-primary/40 transition-colors duration-300 min-h-24"
                    placeholder={t('marketing.waitlist.notePlaceholder')} />
                </div>
                <MagneticButton strength={0.1} className="w-full">
                  <Button type="submit" variant="valora" className="w-full cta-glow" size="lg">
                    {t('marketing.waitlist.submit')}
                  </Button>
                </MagneticButton>
              </form>
            ) : (
              <div className="card-modern rounded-2xl p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-light">{t('marketing.waitlist.success')}</p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <section id="faq" className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-16">{t('marketing.faq.title')}</h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="card-modern px-6 sm:px-8 rounded-xl border-none data-[state=open]:bg-background-surface transition-colors duration-300">
                  <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-foreground/70 font-light leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 w-full">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-foreground/80 font-medium tracking-[0.2em] text-xs">VALORA</span>
              <span className="text-muted-foreground text-sm font-light">{t('marketing.footer.tagline')}</span>
            </div>
            <nav className="flex items-center gap-6">
              {[
                { label: t('marketing.footer.privacy'), to: '/integritetspolicy' },
                { label: t('marketing.footer.terms'), to: '/anvandarvillkor' },
              ].map(({ label, to }) => (
                <Link key={to} to={to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light relative group">
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground/30 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <a href="mailto:info@valora.se"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-light relative group">
                {t('marketing.footer.contact')}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground/30 transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>
            <span className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} Valora</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
