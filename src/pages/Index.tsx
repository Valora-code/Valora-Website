import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import AnimatedOrb from "@/components/AnimatedOrb";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SystemStatus } from "@/components/SystemStatus";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ScrollReveal } from "@/components/ScrollReveal";

import { ThreeValoraLogo } from "@/components/ThreeValoraLogo";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().trim().email({ message: "Ogiltig e-postadress" }).max(255),
  note: z.string().trim().max(500, { message: "Anteckningen får vara max 500 tecken" }).optional(),
});

const Index = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = waitlistSchema.parse({ email, note });
      const { error } = await supabase.from('waitlist').insert([{
        email: validatedData.email,
        note: validatedData.note || null,
      }]);
      if (error && error.code !== '23505') throw error;
      setSubmitted(true);
      toast({ title: "Tack", description: "Du är nu registrerad för tidig access." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Ogiltig inmatning", description: error.errors[0].message, variant: "destructive" });
      } else {
        toast({ title: "Ett fel uppstod", description: "Försök igen senare.", variant: "destructive" });
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Layered gradient backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh]"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(220 15% 12%) 0%, transparent 100%)' }}
        />
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[50vh] pulse-soft"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, hsl(172 50% 45% / 0.10) 0%, hsl(172 50% 45% / 0.04) 50%, transparent 100%)' }}
        />
      </div>

      {/* Animated teal/emerald orbs */}
      <AnimatedOrb />

      {/* Vignette overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
          <div className="flex items-center justify-between">
            <span className="text-foreground/90 font-medium tracking-[0.2em] text-xs flex items-center gap-2">
              <ValoraLogo size="small" />
            </span>
            <div className="hidden md:flex items-center gap-8">
              {[
                ['why', 'Varför Valora'],
                ['how', 'Hur det fungerar'],
                ['proof', 'Användare'],
                ['faq', 'Vanliga frågor'],
              ].map(([id, label]) => (
                <button key={id} onClick={() => scrollToSection(id)} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  {label}
                </button>
              ))}
              <Button variant="valoraGhost" size="sm" onClick={() => scrollToSection('waitlist')}>
                Gå med i väntelistan
              </Button>
            </div>
            <div className="flex md:hidden items-center gap-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle menu">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-border/30 pt-4">
              {[['why','Varför Valora'],['how','Hur det fungerar'],['proof','Användare'],['faq','Vanliga frågor']].map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  {label}
                </button>
              ))}
              <div className="pt-3">
                <Button variant="valora" size="sm" className="w-full cta-glow" onClick={() => { scrollToSection('waitlist'); setMobileMenuOpen(false); }}>
                  Gå med i väntelistan
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Dramatic centered glass card with glowing arc
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 relative z-10">
        {/* Background glow arc behind hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className="w-[160%] sm:w-[120%] aspect-square rounded-full relative pulse-soft"
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(172 50% 45% / 0.08) 0%, hsl(172 50% 45% / 0.03) 30%, transparent 60%)',
              boxShadow: '0 0 200px 60px hsl(172 50% 45% / 0.05)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Main hero glass card */}
          <div
            className="rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
            style={{
              background: 'hsl(220 14% 9% / 0.5)',
              backdropFilter: 'blur(32px)',
              border: '1px solid hsl(0 0% 100% / 0.07)',
              boxShadow: '0 24px 80px -12px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(0 0% 100% / 0.03) inset, 0 0 120px -40px hsl(172 50% 45% / 0.08)',
            }}
          >
            {/* Subtle inner gradient */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(172 50% 45% / 0.05) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10 space-y-8">
              {/* Badge */}
              <div className="fade-up">
                <span
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase px-4 py-2 rounded-full"
                  style={{
                    background: 'hsl(172 50% 45% / 0.08)',
                    border: '1px solid hsl(172 50% 45% / 0.15)',
                    color: 'hsl(172 50% 65%)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Autonom finansiell optimering
                </span>
              </div>

              {/* Headline */}
              <h1 className="headline-hero fade-up-delay-1">
                <span className="text-gradient-primary">Autonom</span>
                <br />
                <span className="text-foreground">personlig ekonomi.</span>
              </h1>

              {/* Supporting text */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto fade-up-delay-2 leading-relaxed">
                Valora arbetar i bakgrunden och identifierar förbättringar i din ekonomi – enligt dina ramar.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 fade-up-delay-3">
                <MagneticButton strength={0.4}>
                  <Button variant="valora" size="lg" onClick={() => scrollToSection('waitlist')} className="cta-glow min-w-[200px]">
                    Begär tidig tillgång
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button variant="valoraGhost" size="lg" onClick={() => scrollToSection('how')} className="min-w-[180px]">
                    Så fungerar Valora
                  </Button>
                </MagneticButton>
              </div>

              {/* Live savings ticker */}
              <div className="fade-up-delay-3 pt-4">
                <div
                  className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-2xl px-6 py-3.5"
                  style={{
                    background: 'hsl(172 50% 45% / 0.06)',
                    border: '1px solid hsl(172 50% 45% / 0.12)',
                    boxShadow: '0 0 30px hsl(172 50% 45% / 0.06)',
                  }}
                >
                  <CountUpNumber
                    end={148499}
                    suffix=" kr"
                    format={(n) => n.toLocaleString('sv-SE')}
                    className="text-2xl sm:text-3xl font-serif font-medium text-primary tabular-nums"
                  />
                  <span className="text-muted-foreground text-sm">identifierade besparingar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY — Bento grid with liquid glass stats
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="why" className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="headline-section">
                Problemet är inte brist på besparingar.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                Människor vet vad de borde göra – men skjuter upp det. Inte av okunskap, utan på grund av mental belastning och friktion.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Stat card 1 — large */}
            <ScrollReveal delay={100}>
              <InteractiveCard className="group h-full">
                <div
                  className="h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: 'hsl(220 14% 9% / 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(0 0% 100% / 0.06)',
                    boxShadow: '0 2px 20px -4px hsl(0 0% 0% / 0.3)',
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, hsl(172 50% 45% / 0.08), transparent 70%)' }} />
                  <div className="space-y-4 relative z-10">
                    <CountUpNumber end={88} suffix="%" className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary" />
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      har skjutit upp att byta lån eller försäkring – trots att de vet att de borde.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollReveal>

            {/* Stat card 2 */}
            <ScrollReveal delay={200}>
              <InteractiveCard className="group h-full">
                <div
                  className="h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: 'hsl(220 14% 9% / 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(0 0% 100% / 0.06)',
                    boxShadow: '0 2px 20px -4px hsl(0 0% 0% / 0.3)',
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, hsl(200 50% 50% / 0.06), transparent 70%)' }} />
                  <div className="space-y-4 relative z-10">
                    <CountUpNumber end={79} suffix="%" className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary" />
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      känner ibland eller ofta dåligt samvete över att inte ta tag i sin ekonomi.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollReveal>

            {/* Stat card 3 */}
            <ScrollReveal delay={300}>
              <InteractiveCard className="group h-full">
                <div
                  className="h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: 'hsl(220 14% 9% / 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(0 0% 100% / 0.06)',
                    boxShadow: '0 2px 20px -4px hsl(0 0% 0% / 0.3)',
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, hsl(260 40% 50% / 0.06), transparent 70%)' }} />
                  <div className="space-y-4 relative z-10">
                    <CountUpNumber end={56} suffix="%" className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary" />
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      upplever hög mental belastning när de tänker på lån, försäkringar och ekonomi.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollReveal>
          </div>

          {/* Quote card — full width bento piece */}
          <ScrollReveal delay={400}>
            <InteractiveCard className="group">
              <div
                className="rounded-2xl p-8 sm:p-12 md:p-14 relative overflow-hidden"
                style={{
                  background: 'hsl(220 14% 9% / 0.5)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid hsl(0 0% 100% / 0.06)',
                  boxShadow: '0 4px 30px -8px hsl(0 0% 0% / 0.3), 0 0 60px -20px hsl(172 50% 45% / 0.06)',
                }}
              >
                <span className="absolute top-2 left-6 text-[100px] leading-none font-serif select-none pointer-events-none" style={{ color: 'hsl(172 50% 45% / 0.06)' }} aria-hidden="true">"</span>
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light italic leading-relaxed text-foreground mb-6">
                    Jag har vetat i två år att jag borde göra detta – men jag orkade inte.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-border/40" />
                    <p className="text-muted-foreground text-sm font-medium">Kvinna, 63 år</p>
                    <div className="h-px w-12 bg-border/40" />
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* System Status */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <ScrollReveal delay={100}>
        <SystemStatus />
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS — Bento-style step cards
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="how" className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <ScrollReveal>
            <h2 className="headline-section text-center">
              Så fungerar Valora
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                step: '01',
                num: '1',
                title: 'Koppla din ekonomi',
                desc: 'Du ansluter banker, lån och försäkringar – och anger dina villkor och preferenser.',
                accent: 'hsl(172 50% 45%)',
              },
              {
                step: '02',
                num: '2',
                title: 'Valora analyserar',
                desc: 'Systemet bevakar marknaden, identifierar förbättringar och förhandlar kontinuerligt åt dig.',
                accent: 'hsl(172 55% 50%)',
              },
              {
                step: '03',
                num: '3',
                title: 'Du godkänner',
                desc: 'Ett klick. Resten sker automatiskt i bakgrunden. Du behåller alltid kontrollen.',
                accent: 'hsl(172 60% 55%)',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={(i + 1) * 100}>
                <InteractiveCard className="group h-full">
                  <div
                    className="h-full rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden"
                    style={{
                      background: 'hsl(220 14% 9% / 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid hsl(0 0% 100% / 0.06)',
                      boxShadow: '0 2px 20px -4px hsl(0 0% 0% / 0.3)',
                    }}
                  >
                    {/* Step number glow */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 pointer-events-none" style={{ background: `radial-gradient(circle, ${item.accent} / 0.08, transparent 70%)` }} />

                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `${item.accent} / 0.1`,
                          border: `1px solid ${item.accent} / 0.2`,
                        }}
                      >
                        <span className="text-lg font-serif font-medium text-primary">{item.num}</span>
                      </div>
                      <span className="text-xs font-medium text-primary/60 tracking-[0.15em] uppercase">Steg {item.step}</span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="headline-card">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROOF — Bento testimonials
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="proof" className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <ScrollReveal>
            <h2 className="headline-section text-center">
              Verifierad besparing. Verklig mental lättnad.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {[
              { person: 'Privatperson, 63 år', amount: '17 000', quote: 'Jag hade aldrig gjort detta själv. Nu slipper jag tänka.' },
              { person: 'Privatperson, 33 år', amount: '15 000', quote: 'Jag betalar hellre än att behöva bära detta i huvudet.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 100}>
                <InteractiveCard className="group h-full">
                  <div
                    className="h-full rounded-2xl p-6 sm:p-8 relative overflow-hidden"
                    style={{
                      background: 'hsl(220 14% 9% / 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid hsl(0 0% 100% / 0.06)',
                      boxShadow: '0 2px 20px -4px hsl(0 0% 0% / 0.3)',
                    }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, hsl(172 50% 45% / 0.06), transparent 70%)' }} />
                    <div className="relative z-10 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-medium">{item.person}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/8 border border-primary/15 rounded-full px-2.5 py-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Verifierat
                        </span>
                      </div>
                      <div>
                        <div className="text-4xl sm:text-5xl font-serif font-medium text-primary tabular-nums mb-1">{item.amount} kr</div>
                        <div className="text-xs text-muted-foreground">per år i identifierade besparingar</div>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground font-light italic leading-relaxed">
                        "{item.quote}"
                      </p>
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Big quote */}
          <ScrollReveal delay={300}>
            <InteractiveCard className="group">
              <div
                className="rounded-2xl p-8 sm:p-12 md:p-14 text-center relative overflow-hidden"
                style={{
                  background: 'hsl(220 14% 9% / 0.5)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid hsl(0 0% 100% / 0.06)',
                  boxShadow: '0 4px 30px -8px hsl(0 0% 0% / 0.3)',
                }}
              >
                <span className="absolute top-2 left-6 text-[100px] leading-none font-serif select-none pointer-events-none" style={{ color: 'hsl(172 50% 45% / 0.06)' }} aria-hidden="true">"</span>
                <p className="relative z-10 text-xl sm:text-2xl font-serif font-light italic leading-relaxed max-w-2xl mx-auto">
                  Tidigare gav ekonomi mig konstant ångest. Nu känns det mycket enklare.
                </p>
              </div>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TARGET AUDIENCE — Bento cards
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <ScrollReveal>
            <h2 className="headline-section text-center">
              För vem är Valora byggt?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              { title: 'Den upptagna yrkespersonen', desc: 'Du har inte tid att förhandla, jämföra och bevaka. Valora gör det åt dig.', icon: '⚡' },
              { title: 'Familjen med komplex ekonomi', desc: 'Flera lån och försäkringar. Valora håller allt optimerat i bakgrunden.', icon: '🏠' },
              { title: 'Den som vill ha kontroll utan stress', desc: 'Du vill göra rätt – men slippa bära ansvaret mentalt. Valora tar över.', icon: '✦' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 100}>
                <InteractiveCard className="group h-full">
                  <div
                    className="h-full rounded-2xl p-6 sm:p-8 flex flex-col gap-4 relative overflow-hidden"
                    style={{
                      background: 'hsl(220 14% 9% / 0.6)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid hsl(0 0% 100% / 0.06)',
                      boxShadow: '0 2px 20px -4px hsl(0 0% 0% / 0.3)',
                    }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="space-y-2">
                      <h3 className="headline-card">{item.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WAITLIST — Dramatic glass card with arc glow
      ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="waitlist" className="relative z-10 overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div
            className="w-[140%] sm:w-[120%] aspect-[2/1] rounded-[50%] relative -mb-[40%] sm:-mb-[30%]"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, hsl(172 50% 45% / 0.18) 0%, hsl(172 50% 45% / 0.06) 40%, transparent 70%)',
              boxShadow: '0 -40px 120px 40px hsl(172 50% 45% / 0.08), 0 0 80px 20px hsl(172 50% 45% / 0.04)',
            }}
          />
          <div
            className="absolute w-[140%] sm:w-[120%] aspect-[2/1] rounded-[50%] -mb-[40%] sm:-mb-[30%]"
            style={{
              border: '1px solid hsl(172 50% 45% / 0.15)',
              borderBottom: 'none',
              maskImage: 'linear-gradient(to bottom, white 0%, transparent 60%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 60%)',
            }}
          />
        </div>

        <div className="relative z-10 py-24 sm:py-36 lg:py-44 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="max-w-xl w-full mx-auto">
            {!submitted ? (
              <div
                className="relative rounded-2xl p-8 sm:p-10 md:p-12 text-center space-y-6 sm:space-y-8"
                style={{
                  background: 'hsl(220 14% 9% / 0.7)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid hsl(0 0% 100% / 0.08)',
                  boxShadow: '0 8px 60px -12px hsl(0 0% 0% / 0.5), 0 0 0 1px hsl(0 0% 100% / 0.03) inset',
                }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight leading-tight text-foreground">
                    Gå med i väntelistan
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Få exklusiv tidig tillgång till Valora och bli bland de första att optimera din ekonomi autonomt.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div
                    className="flex items-center gap-0 rounded-xl overflow-hidden"
                    style={{
                      background: 'hsl(220 14% 7% / 0.9)',
                      border: '1px solid hsl(0 0% 100% / 0.1)',
                    }}
                  >
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base placeholder:text-muted-foreground/50 h-12 sm:h-14 px-4 sm:px-5"
                      placeholder="din@email.se"
                    />
                    <Button type="submit" variant="valora" className="rounded-lg h-10 sm:h-11 mr-1.5 sm:mr-2 px-5 sm:px-6 text-sm font-medium shrink-0">
                      Begär tillgång
                    </Button>
                  </div>

                  <div className="pt-1">
                    <Textarea
                      id="note"
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      className="bg-transparent border border-border/40 focus-visible:ring-primary/30 min-h-[72px] text-sm placeholder:text-muted-foreground/40 resize-none rounded-xl"
                      placeholder="Valfritt: Vad vill du att Valora ska optimera? (lån, försäkringar...)"
                    />
                  </div>
                </form>

                <div className="flex flex-col items-center gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['hsl(172 50% 45%)', 'hsl(200 50% 50%)', 'hsl(260 40% 55%)'].map((color, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-background" style={{ background: color }} />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Över <span className="text-foreground font-medium">200+</span> har redan gått med
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="relative rounded-2xl p-10 sm:p-14 text-center"
                style={{
                  background: 'hsl(220 14% 9% / 0.7)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid hsl(0 0% 100% / 0.08)',
                  boxShadow: '0 8px 60px -12px hsl(0 0% 0% / 0.5)',
                }}
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-foreground">Tack!</h3>
                  <p className="text-muted-foreground text-base">Du är nu registrerad för tidig access till Valora.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <ScrollReveal delay={150}>
        <div className="relative z-10 h-px separator-sweep bg-border/30" />
        <section id="faq" className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
            <h2 className="headline-section text-center">Vanliga frågor</h2>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: 'Är Valora en bank?', a: 'Nej. Valora är ett autonomt finansiellt system som optimerar din ekonomi ovanpå banker och försäkringsbolag.' },
                { q: 'Behöver jag byta bank?', a: 'Nej – och ibland, ja. Du behöver aldrig byta bank för att använda Valora. Systemet analyserar och optimerar din ekonomi ovanpå dina befintliga aktörer. Om Valora identifierar ett förbättringsförslag som kräver ett faktiskt byte av långivare, sker det först efter att du uttryckligen har godkänt det. Inget sker automatiskt utan ditt samtycke.' },
                { q: 'Är det säkert?', a: 'Ja. All åtkomst sker med samtycke och enligt bankstandard.' },
                { q: 'Vad kostar det?', a: 'Prissättning fastställs vid lansering. Tidiga användare prioriteras.' },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i + 1}`}
                  className="px-5 sm:px-8 rounded-2xl border-none"
                  style={{
                    background: 'hsl(220 14% 9% / 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(0 0% 100% / 0.06)',
                  }}
                >
                  <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-foreground/80 font-light leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="relative z-10 w-full mt-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-foreground/90 font-medium tracking-[0.2em] text-xs">VALORA</span>
              <span className="text-muted-foreground text-sm">Autonomt finansiellt system</span>
            </div>
            <nav className="flex items-center gap-8">
              {['Kontakt', 'Integritet', 'LinkedIn'].map((label) => (
                <a key={label} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">{label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
              <span>Privacy</span>
              <span>Terms</span>
              <span>© {new Date().getFullYear()} Valora</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
