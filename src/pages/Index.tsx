import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SystemStatus } from "@/components/SystemStatus";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
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
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden dot-grid">
      <div className="noise-overlay" />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* ═══ ANIMATED MESH GRADIENTS — Hero background ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full mesh-gradient-1"
          style={{
            top: '10%',
            left: '60%',
            background: 'radial-gradient(circle, hsl(172 50% 45% / 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full mesh-gradient-2"
          style={{
            top: '50%',
            left: '20%',
            background: 'radial-gradient(circle, hsl(200 40% 40% / 0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full mesh-gradient-3"
          style={{
            top: '30%',
            left: '40%',
            background: 'radial-gradient(circle, hsl(172 60% 50% / 0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* ═══ NAVIGATION — Floating pill ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5">
          <div
            className="flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl"
            style={{
              background: 'hsl(220 14% 7% / 0.65)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              border: '1px solid hsl(0 0% 100% / 0.05)',
            }}
          >
            <span className="text-foreground/90 font-medium tracking-[0.2em] text-xs flex items-center gap-2">
              <ValoraLogo size="small" />
            </span>
            <div className="hidden md:flex items-center gap-7">
              {[
                ['why', 'Varför'],
                ['how', 'Hur det fungerar'],
                ['proof', 'Användare'],
                ['faq', 'FAQ'],
              ].map(([id, label]) => (
                <button key={id} onClick={() => scrollToSection(id)} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-light">
                  {label}
                </button>
              ))}
              <Button variant="valora" size="sm" onClick={() => scrollToSection('waitlist')} className="cta-glow text-[13px] h-9 px-5">
                Gå med
              </Button>
            </div>
            <div className="flex md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle menu">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div
              className="md:hidden mt-2 rounded-2xl p-3 space-y-0.5"
              style={{
                background: 'hsl(220 14% 7% / 0.9)',
                backdropFilter: 'blur(24px)',
                border: '1px solid hsl(0 0% 100% / 0.05)',
              }}
            >
              {[['why','Varför Valora'],['how','Hur det fungerar'],['proof','Användare'],['faq','FAQ']].map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/10 font-light">
                  {label}
                </button>
              ))}
              <div className="pt-1.5 px-1">
                <Button variant="valora" size="sm" className="w-full cta-glow" onClick={() => { scrollToSection('waitlist'); setMobileMenuOpen(false); }}>
                  Gå med i väntelistan
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Cinematic with animated mesh + planet arc
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Planet arc */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220%] sm:w-[160%] md:w-[140%] pointer-events-none">
          <div
            className="w-full aspect-square rounded-full hero-arc-glow"
            style={{
              background: 'radial-gradient(circle at 50% 0%, hsl(172 50% 50% / 0.15) 0%, hsl(172 50% 45% / 0.06) 15%, transparent 40%)',
              transform: 'translateY(58%)',
              boxShadow: '0 -80px 200px 60px hsl(172 50% 45% / 0.06)',
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 w-full aspect-square rounded-full"
            style={{
              border: '1px solid hsl(172 55% 55% / 0.2)',
              borderBottom: 'none',
              transform: 'translateY(58%)',
              maskImage: 'linear-gradient(to bottom, white 0%, transparent 12%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 12%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-7 sm:space-y-9">
          {/* Shimmer badge */}
          <div className="fade-up">
            <span
              className="inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shimmer-sweep"
              style={{
                background: 'hsl(0 0% 100% / 0.04)',
                border: '1px solid hsl(0 0% 100% / 0.07)',
                color: 'hsl(0 0% 60%)',
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full animate-pulse"
                style={{ background: 'hsl(172 50% 55%)' }}
              />
              Autonom finansiell optimering
            </span>
          </div>

          {/* Massive headline with extreme contrast */}
          <h1 className="headline-hero fade-up-delay-1 px-2">
            <span className="text-gradient-primary">Autonom</span>
            <br />
            <span className="text-foreground/95">personlig </span>
            <span className="font-serif italic text-foreground/80 font-normal">ekonomi.</span>
          </h1>

          {/* Tiny body text for contrast */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto fade-up-delay-2 leading-relaxed font-light tracking-wide">
            Valora identifierar förbättringar i din ekonomi — automatiskt, enligt dina ramar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 fade-up-delay-3">
            <MagneticButton strength={0.4}>
              <Button variant="valora" size="lg" onClick={() => scrollToSection('waitlist')} className="cta-glow min-w-[200px] h-12 sm:h-13 text-sm">
                Begär tidig tillgång
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button variant="valoraGhost" size="lg" onClick={() => scrollToSection('how')} className="min-w-[170px] h-12 sm:h-13 text-sm font-light">
                Så fungerar det
              </Button>
            </MagneticButton>
          </div>

          {/* Savings ticker — glass pill with animated border */}
          <div className="fade-up-delay-4 pt-3">
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 animated-border"
              style={{
                background: 'hsl(220 14% 7% / 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid hsl(0 0% 100% / 0.05)',
              }}
            >
              <CountUpNumber
                end={148499}
                suffix=" kr"
                format={(n) => n.toLocaleString('sv-SE')}
                className="text-2xl sm:text-3xl font-serif font-medium text-primary tabular-nums"
              />
              <div className="h-4 w-px bg-border/30 hidden sm:block" />
              <span className="text-muted-foreground text-xs sm:text-sm font-light tracking-wide">identifierade besparingar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY — Asymmetric bento grid with cursor spotlight
      ═══════════════════════════════════════════════════════════════ */}
      <section id="why" className="py-28 sm:py-36 lg:py-44 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <p className="caption text-primary/60 fade-up">Problemet</p>
              <h2 className="headline-section">
                Det handlar inte om<br className="hidden sm:block" /> brist på besparingar.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
                Människor vet vad de borde göra — men skjuter upp det. Inte av okunskap, utan på grund av mental belastning.
              </p>
            </div>
          </ScrollReveal>

          {/* ASYMMETRIC bento grid: 2 cols top, 1 wide bottom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Large stat card */}
            <ScrollReveal delay={80}>
              <SpotlightCard className="h-full">
                <div className="p-8 sm:p-10 flex flex-col justify-between min-h-[260px] sm:min-h-[300px]">
                  <CountUpNumber end={88} suffix="%" className="text-6xl sm:text-7xl md:text-8xl font-serif font-medium tracking-tighter text-primary" />
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mt-auto pt-6 max-w-[280px]">
                    har skjutit upp att byta lån eller försäkring — trots att de vet att de borde.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Two stacked cards */}
            <div className="grid grid-rows-2 gap-3 sm:gap-4">
              <ScrollReveal delay={160}>
                <SpotlightCard className="h-full">
                  <div className="p-7 sm:p-8 flex items-center gap-6 sm:gap-8">
                    <CountUpNumber end={79} suffix="%" className="text-4xl sm:text-5xl font-serif font-medium tracking-tighter text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      känner dåligt samvete över att inte ta tag i sin ekonomi.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <SpotlightCard className="h-full">
                  <div className="p-7 sm:p-8 flex items-center gap-6 sm:gap-8">
                    <CountUpNumber end={56} suffix="%" className="text-4xl sm:text-5xl font-serif font-medium tracking-tighter text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">
                      upplever hög mental belastning kring lån och försäkringar.
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </div>

          {/* Full-width quote — glass ultra with shimmer */}
          <ScrollReveal delay={300}>
            <div className="glass-ultra rounded-3xl p-10 sm:p-16 md:p-20 text-center shimmer-sweep">
              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="text-lg sm:text-2xl md:text-3xl font-serif font-light italic leading-relaxed text-foreground/85">
                  "Jag har vetat i två år att jag borde göra detta — men jag orkade inte."
                </p>
                <p className="text-muted-foreground text-xs font-light mt-6 tracking-wide">Kvinna, 63 år</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* System Status */}
      <ScrollReveal delay={100}>
        <SystemStatus />
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS — Step cards with spotlight
      ═══════════════════════════════════════════════════════════════ */}
      <section id="how" className="py-28 sm:py-36 lg:py-44 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          <ScrollReveal>
            <div className="text-center space-y-3">
              <p className="caption text-primary/60">Process</p>
              <h2 className="headline-section">Så fungerar Valora</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { num: '1', title: 'Koppla din ekonomi', desc: 'Du ansluter banker, lån och försäkringar — och anger dina villkor.' },
              { num: '2', title: 'Valora analyserar', desc: 'Systemet bevakar marknaden och identifierar förbättringar kontinuerligt.' },
              { num: '3', title: 'Du godkänner', desc: 'Ett klick. Resten sker automatiskt. Du behåller alltid kontrollen.' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={(i + 1) * 100}>
                <SpotlightCard className="h-full">
                  <div className="p-7 sm:p-8 flex flex-col gap-6 min-h-[220px]">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: 'hsl(172 50% 45% / 0.08)',
                        border: '1px solid hsl(172 50% 45% / 0.12)',
                      }}
                    >
                      <span className="text-sm font-serif font-medium text-primary">{item.num}</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="headline-card">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROOF — Asymmetric testimonial grid
      ═══════════════════════════════════════════════════════════════ */}
      <section id="proof" className="py-28 sm:py-36 lg:py-44 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          <ScrollReveal>
            <div className="text-center space-y-3">
              <p className="caption text-primary/60">Resultat</p>
              <h2 className="headline-section">
                Verifierad besparing.<br className="hidden sm:block" /> Verklig lättnad.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
            {/* Wide testimonial */}
            <ScrollReveal delay={100}>
              <SpotlightCard className="md:col-span-3 h-full">
                <div className="p-8 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-light tracking-wide">Privatperson, 63 år</span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-primary bg-primary/8 border border-primary/12 rounded-full px-2 py-0.5 font-medium">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      Verifierat
                    </span>
                  </div>
                  <div className="text-5xl sm:text-6xl font-serif font-medium text-primary tabular-nums">17 000 kr</div>
                  <div className="text-[11px] text-muted-foreground font-light tracking-wide uppercase">per år i besparingar</div>
                  <p className="text-sm text-muted-foreground font-light italic leading-relaxed pt-2 border-t border-border/20">
                    "Jag hade aldrig gjort detta själv. Nu slipper jag tänka."
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Narrow testimonial */}
            <ScrollReveal delay={200}>
              <SpotlightCard className="md:col-span-2 h-full">
                <div className="p-8 sm:p-10 space-y-6 flex flex-col h-full">
                  <span className="text-xs text-muted-foreground font-light tracking-wide">Privatperson, 33 år</span>
                  <div className="text-4xl sm:text-5xl font-serif font-medium text-primary tabular-nums">15 000 kr</div>
                  <div className="text-[11px] text-muted-foreground font-light tracking-wide uppercase">per år</div>
                  <p className="text-sm text-muted-foreground font-light italic leading-relaxed mt-auto pt-4 border-t border-border/20">
                    "Jag betalar hellre än att bära detta i huvudet."
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Big quote */}
          <ScrollReveal delay={300}>
            <div className="glass-ultra rounded-3xl p-10 sm:p-14 md:p-16 text-center shimmer-sweep">
              <p className="relative z-10 text-lg sm:text-xl md:text-2xl font-serif font-light italic leading-relaxed max-w-xl mx-auto text-foreground/85">
                "Tidigare gav ekonomi mig konstant ångest. Nu känns det mycket enklare."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TARGET AUDIENCE — Asymmetric
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36 lg:py-44 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          <ScrollReveal>
            <div className="text-center space-y-3">
              <p className="caption text-primary/60">Målgrupp</p>
              <h2 className="headline-section">
                Byggt för dig.
              </h2>
            </div>
          </ScrollReveal>

          {/* Asymmetric: 1 wide + 2 narrow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
            <ScrollReveal delay={100}>
              <SpotlightCard className="md:col-span-2 h-full">
                <div className="p-7 sm:p-8 flex flex-col gap-5 min-h-[200px]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(172 50% 45% / 0.08)' }}>
                    <span className="text-primary text-sm">⚡</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="headline-card">Den upptagna</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">Du har inte tid att förhandla och jämföra. Valora gör det åt dig.</p>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <SpotlightCard className="md:col-span-3 h-full">
                <div className="p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                  <div className="space-y-2 flex-1">
                    <h3 className="headline-card">Familjen med komplex ekonomi</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">Flera lån och försäkringar. Valora håller allt optimerat i bakgrunden.</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(172 50% 45% / 0.08)' }}>
                    <span className="text-primary text-sm">🏠</span>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <SpotlightCard>
              <div className="p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(172 50% 45% / 0.08)' }}>
                  <span className="text-primary text-sm">✦</span>
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="headline-card">Den som vill ha kontroll utan stress</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-lg">Du vill göra rätt — men slippa bära ansvaret mentalt. Valora tar över.</p>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WAITLIST — Planet arc + glass ultra + glowing form
      ═══════════════════════════════════════════════════════════════ */}
      <section id="waitlist" className="relative z-10 overflow-hidden">
        {/* Planet arc */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[150%] pointer-events-none">
          <div
            className="w-full aspect-square rounded-full hero-arc-glow"
            style={{
              background: 'radial-gradient(circle at 50% 0%, hsl(172 50% 50% / 0.15) 0%, hsl(172 50% 45% / 0.05) 20%, transparent 45%)',
              transform: 'translateY(62%)',
              boxShadow: '0 -60px 180px 50px hsl(172 50% 45% / 0.05)',
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 w-full aspect-square rounded-full"
            style={{
              border: '1px solid hsl(172 55% 55% / 0.18)',
              borderBottom: 'none',
              transform: 'translateY(62%)',
              maskImage: 'linear-gradient(to bottom, white 0%, transparent 10%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 10%)',
            }}
          />
        </div>

        <div className="relative z-10 py-32 sm:py-44 lg:py-52 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[85vh]">
          <div className="max-w-md w-full mx-auto">
            {!submitted ? (
              <div className="glass-ultra rounded-3xl p-8 sm:p-10 text-center space-y-6 animated-border">
                <div className="relative z-10 space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight leading-tight text-foreground">
                      Gå med i <span className="italic font-normal text-foreground/80">väntelistan</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light max-w-xs mx-auto">
                      Få exklusiv tidig tillgång och bli bland de första att optimera din ekonomi.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div
                      className="flex items-center gap-0 rounded-xl overflow-hidden input-glow transition-all duration-300"
                      style={{
                        background: 'hsl(220 14% 5% / 0.8)',
                        border: '1px solid hsl(0 0% 100% / 0.07)',
                      }}
                    >
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/30 h-12 px-4 font-light"
                        placeholder="din@email.se"
                      />
                      <Button type="submit" variant="valora" className="rounded-lg h-9 mr-1.5 px-5 text-[13px] font-medium shrink-0">
                        Begär tillgång
                      </Button>
                    </div>
                    <Textarea
                      id="note"
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      className="bg-transparent border border-border/20 focus-visible:ring-primary/20 min-h-[64px] text-sm placeholder:text-muted-foreground/25 resize-none rounded-xl font-light input-glow"
                      placeholder="Valfritt: Vad vill du optimera?"
                    />
                  </form>

                  {/* Animated counter instead of fake avatars */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                    <span className="text-xs text-muted-foreground font-light tracking-wide">
                      <CountUpNumber end={247} className="text-foreground font-medium tabular-nums" duration={1500} /> personer väntar på tillgång
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-ultra rounded-3xl p-12 sm:p-16 text-center animated-border">
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-foreground">Tack!</h3>
                  <p className="text-muted-foreground text-xs font-light">Du är nu registrerad för tidig access.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <ScrollReveal delay={100}>
        <section id="faq" className="py-28 sm:py-36 lg:py-44 px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-14 sm:space-y-20">
            <div className="text-center space-y-3">
              <p className="caption text-primary/60">Support</p>
              <h2 className="headline-section">Vanliga frågor</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {[
                { q: 'Är Valora en bank?', a: 'Nej. Valora är ett autonomt finansiellt system som optimerar din ekonomi ovanpå banker och försäkringsbolag.' },
                { q: 'Behöver jag byta bank?', a: 'Nej – och ibland, ja. Du behöver aldrig byta bank för att använda Valora. Systemet analyserar och optimerar din ekonomi ovanpå dina befintliga aktörer. Om Valora identifierar ett förbättringsförslag som kräver ett faktiskt byte av långivare, sker det först efter att du uttryckligen har godkänt det.' },
                { q: 'Är det säkert?', a: 'Ja. All åtkomst sker med samtycke och enligt bankstandard.' },
                { q: 'Vad kostar det?', a: 'Prissättning fastställs vid lansering. Tidiga användare prioriteras.' },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i + 1}`}
                  className="rounded-2xl border-none overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(220 14% 10% / 0.8), hsl(220 14% 7% / 0.6))',
                    border: '1px solid hsl(0 0% 100% / 0.05)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <AccordionTrigger className="text-left font-light text-sm sm:text-base hover:no-underline px-6 sm:px-7">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/70 font-light leading-relaxed px-6 sm:px-7">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="relative z-10 w-full">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-foreground/80 font-medium tracking-[0.25em] text-[10px] uppercase">Valora</span>
              <span className="text-muted-foreground/50 text-[11px] font-light">Autonomt finansiellt system</span>
            </div>
            <nav className="flex items-center gap-6">
              {['Kontakt', 'Integritet', 'LinkedIn'].map((label) => (
                <a key={label} href="#" className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200 font-light">{label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground/40 font-light">
              <span>Privacy</span>
              <span>Terms</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
