import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { ArrowRight, Shield, Lock, UserCheck, ChevronRight } from "lucide-react";

const waitlistSchema = z.object({
  email: z.string().trim().email({ message: "Ogiltig e-postadress" }).max(255),
});

const Index = () => {
  const [email, setEmail] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (emailValue: string, setDone: (v: boolean) => void) => {
    try {
      const validatedData = waitlistSchema.parse({ email: emailValue });
      const { error } = await supabase.from('waitlist').insert([{
        email: validatedData.email,
        note: null,
      }]);
      if (error && error.code !== '23505') throw error;
      setDone(true);
      toast({ title: "You're on the list", description: "We'll be in touch when early access opens." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Invalid email", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <ValoraLogo size="small" />
          <div className="hidden md:flex items-center gap-8">
            {[
              ['how', 'How it works'],
              ['benefits', 'Benefits'],
              ['trust', 'Trust & safety'],
              ['faq', 'FAQ'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection('cta')}
              className="h-8 px-4 text-[13px] rounded-lg"
            >
              Join early access
            </Button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-1">
            {[['how','How it works'],['benefits','Benefits'],['trust','Trust & safety'],['faq','FAQ']].map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)}
                className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </button>
            ))}
            <Button size="sm" className="w-full mt-2" onClick={() => scrollToSection('cta')}>
              Join early access
            </Button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left */}
          <div className="space-y-8 max-w-xl">
            <div className="fade-up space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-[-0.032em] text-foreground">
                Autonomous personal finance, quietly running in the background.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[52ch]">
                Valora continuously analyzes your loans and insurance and routes you to better terms via licensed partners — without adding another dashboard to your life.
              </p>
            </div>

            <div className="fade-up-delay-1 flex flex-wrap items-center gap-3">
              {!heroSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(heroEmail, setHeroSubmitted); }} className="flex items-center gap-2 w-full sm:w-auto">
                  <Input
                    type="email"
                    value={heroEmail}
                    onChange={e => setHeroEmail(e.target.value)}
                    required
                    className="h-11 w-full sm:w-64 rounded-lg bg-secondary border-border text-sm placeholder:text-muted-foreground/50"
                    placeholder="you@email.com"
                  />
                  <Button type="submit" className="h-11 px-5 rounded-lg text-sm shrink-0">
                    Join early access
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </form>
              ) : (
                <p className="text-sm text-primary font-medium">✓ You're on the list. We'll be in touch.</p>
              )}
            </div>

            <div className="fade-up-delay-2 flex items-center gap-2">
              <button
                onClick={() => scrollToSection('how')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                See how it works <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="fade-up-delay-3 text-xs text-muted-foreground/60 leading-relaxed">
              Built with licensed partners. You stay in control of every change.
            </p>
          </div>

          {/* Right — Abstract system visualization */}
          <div className="fade-up-delay-2 hidden lg:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Abstract routing visualization */}
              <svg viewBox="0 0 400 400" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* You node */}
                <rect x="30" y="170" width="80" height="60" rx="8" className="fill-secondary stroke-border" strokeWidth="1" />
                <text x="70" y="205" textAnchor="middle" className="fill-foreground text-[13px] font-medium">You</text>

                {/* Valora node — center */}
                <rect x="160" y="155" width="80" height="90" rx="12" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
                <text x="200" y="195" textAnchor="middle" className="fill-primary text-[12px] font-medium">Valora</text>
                <text x="200" y="215" textAnchor="middle" className="fill-muted-foreground text-[9px]">analyzes</text>
                <text x="200" y="228" textAnchor="middle" className="fill-muted-foreground text-[9px]">continuously</text>

                {/* Partner nodes */}
                <rect x="290" y="80" width="80" height="48" rx="6" className="fill-secondary stroke-border" strokeWidth="1" />
                <text x="330" y="108" textAnchor="middle" className="fill-muted-foreground text-[10px]">Lender A</text>

                <rect x="290" y="176" width="80" height="48" rx="6" className="fill-secondary stroke-border" strokeWidth="1" />
                <text x="330" y="204" textAnchor="middle" className="fill-muted-foreground text-[10px]">Insurer B</text>

                <rect x="290" y="272" width="80" height="48" rx="6" className="fill-secondary stroke-border" strokeWidth="1" />
                <text x="330" y="300" textAnchor="middle" className="fill-muted-foreground text-[10px]">Lender C</text>

                {/* Connecting lines */}
                <line x1="110" y1="200" x2="160" y2="200" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="240" y1="180" x2="290" y2="104" className="stroke-primary/20" strokeWidth="1" />
                <line x1="240" y1="200" x2="290" y2="200" className="stroke-primary/20" strokeWidth="1" />
                <line x1="240" y1="220" x2="290" y2="296" className="stroke-primary/20" strokeWidth="1" />

                {/* Flow dots */}
                <circle cx="135" cy="200" r="2" className="fill-muted-foreground/40" />
                <circle cx="265" cy="140" r="2" className="fill-primary/30" />
                <circle cx="265" cy="200" r="2" className="fill-primary/30" />
                <circle cx="265" cy="260" r="2" className="fill-primary/30" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW VALORA WORKS ── */}
      <section id="how" className="py-24 sm:py-32 lg:py-40 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
                Three steps to autonomous optimization.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 rounded-2xl overflow-hidden">
            {[
              {
                step: '01',
                title: 'Connect your financial data',
                desc: 'Link your loans, insurance, and accounts securely. Set your preferences and constraints.',
              },
              {
                step: '02',
                title: 'Valora continuously analyzes',
                desc: 'The system monitors rates, coverage gaps, and market conditions around the clock.',
              },
              {
                step: '03',
                title: 'Approve and execute',
                desc: 'You review recommendations and approve with one click. Valora executes via licensed partners.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 100}>
                <div className="bg-card p-8 sm:p-10 h-full flex flex-col gap-6">
                  <span className="text-xs font-medium text-primary tracking-wider">{item.step}</span>
                  <div className="space-y-3 mt-auto">
                    <h3 className="text-base font-semibold text-foreground tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT VALORA DOES ── */}
      <section id="benefits" className="py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Benefits</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
                What Valora does for you.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Lower your interest costs over time',
                desc: 'Valora continuously scans for better loan terms and refinancing opportunities across licensed partners.',
              },
              {
                title: 'Close coverage gaps without over-insuring',
                desc: 'Your insurance portfolio is analyzed for redundancies and gaps — adjustments happen only with your approval.',
              },
              {
                title: 'Replace manual comparisons with continuous optimization',
                desc: 'No more spreadsheets or comparison sites. Valora runs in the background, every day.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-border transition-colors duration-300 h-full flex flex-col gap-4">
                  <h3 className="text-base font-semibold text-foreground tracking-tight leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY, TRUST, CONTROL ── */}
      <section id="trust" className="py-24 sm:py-32 lg:py-40 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Trust & safety</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
                Built for trust. Designed for control.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: 'Bank-grade security',
                desc: 'All data is encrypted at rest and in transit. We follow best-in-class security practices.',
              },
              {
                icon: Shield,
                title: 'Licensed partners only',
                desc: 'Valora operates through regulated, licensed financial partners. We never hold your money.',
              },
              {
                icon: UserCheck,
                title: 'You approve every change',
                desc: 'Valora cannot move money or change terms without your explicit confirmation. Full autonomy, full control.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl bg-card border border-border/50 h-full flex flex-col gap-5">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO VALORA IS FOR ── */}
      <section className="py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-16 sm:mb-20">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Who it's for</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
                Built for ambitious professionals who want fewer financial decisions, not more dashboards.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Founders & operators',
                desc: 'Who want their loans and insurance continuously optimized while they build.',
              },
              {
                title: 'Busy professionals',
                desc: 'Who know they should refinance and compare, but never find the time.',
              },
              {
                title: 'Families with complex finances',
                desc: 'Multiple loans, multiple policies — Valora keeps everything optimized.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl border border-border/30 hover:border-border/60 transition-colors duration-300 h-full">
                  <h3 className="text-base font-semibold text-foreground tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT STAGE & ROADMAP ── */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 sm:mb-16">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">Current stage</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight mb-6">
                Currently in private beta.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                We're working with a small group of early users to refine the experience before opening up.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 tracking-tight">What works today</h3>
                <ul className="space-y-3">
                  {[
                    'Loan monitoring and comparison',
                    'Insurance gap analysis',
                    'Automated partner matching',
                    'One-click approval flow',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 tracking-tight">Coming next</h3>
                <ul className="space-y-3">
                  {[
                    'Expanded partner network',
                    'Savings and investment optimization',
                    'BankID integration',
                    'Open beta launch',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 sm:py-32 lg:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 sm:mb-16">
              <p className="text-xs font-medium text-primary tracking-widest uppercase mb-4">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
                Common questions.
              </h2>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible>
            {[
              { q: 'Is Valora a bank?', a: 'No. Valora is an autonomous optimization layer that works on top of your existing banks and insurance providers. We never hold your money.' },
              { q: 'Do I need to switch banks?', a: 'No. Valora works with your existing financial setup. If switching a provider is recommended, it only happens with your explicit approval.' },
              { q: 'How does Valora make money?', a: 'Valora earns a fee from partner institutions when a successful optimization is executed. You never pay extra.' },
              { q: 'Is my data safe?', a: 'Yes. All data is encrypted, access is consent-based, and we follow strict regulatory standards.' },
              { q: 'What does early access cost?', a: 'Pricing will be finalized at launch. Early access users will be prioritized and receive preferential terms.' },
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i + 1}`}
                className="border-b border-border/40"
              >
                <AccordionTrigger className="text-left text-sm sm:text-[15px] font-medium hover:no-underline py-6 text-foreground/90 hover:text-foreground transition-colors">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="cta" className="py-24 sm:py-32 lg:py-40 px-6 bg-secondary/30 border-t border-border/30">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="space-y-6 mb-10">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] leading-tight">
                Let Valora handle the financial maintenance work.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Join the early access list and be among the first to run your loans and insurance on autopilot.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(email, setSubmitted); }} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="h-11 w-full sm:flex-1 rounded-lg bg-card border-border text-sm placeholder:text-muted-foreground/50"
                  placeholder="you@email.com"
                />
                <Button type="submit" className="h-11 px-6 rounded-lg text-sm w-full sm:w-auto shrink-0">
                  Join early access
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            ) : (
              <p className="text-sm text-primary font-medium">✓ You're on the list. We'll be in touch soon.</p>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/30">
        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/60 tracking-wider uppercase text-[11px]">Valora</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
