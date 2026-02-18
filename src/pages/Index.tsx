import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import AnimatedOrb from "@/components/AnimatedOrb";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SystemStatus } from "@/components/SystemStatus";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ThemeToggle } from "@/components/ThemeToggle";

import { ThreeValoraLogo } from "@/components/ThreeValoraLogo";
import { MagneticButton } from "@/components/MagneticButton";
import { useParallax } from "@/hooks/use-parallax";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
const waitlistSchema = z.object({
  email: z.string().trim().email({
    message: "Ogiltig e-postadress"
  }).max(255),
  note: z.string().trim().max(500, {
    message: "Anteckningen får vara max 500 tecken"
  }).optional()
});
const Index = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    toast
  } = useToast();

  // Parallax effects - enhanced for more pronounced depth
  const bgParallax = useParallax({
    speed: 0.04,
    direction: 'down'
  });
  const logoParallax = useParallax({
    speed: 0.03,
    direction: 'up'
  });

  // Mouse tracking for access port light refraction
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    button.style.setProperty('--mouse-x', `${x}%`);
    button.style.setProperty('--mouse-y', `${y}%`);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate input
      const validatedData = waitlistSchema.parse({
        email,
        note
      });

      // Save to Supabase
      const {
        error
      } = await supabase.from('waitlist').insert([{
        email: validatedData.email,
        note: validatedData.note || null
      }]);

      // Anti-enumeration protection: Always show success to prevent timing attacks
      // Even if the email already exists (duplicate key error), we show success
      // This prevents attackers from determining which emails are in the waitlist
      if (error && error.code !== '23505') {
        // Only show error for non-duplicate database errors
        throw error;
      }
      setSubmitted(true);
      toast({
        title: "Tack",
        description: "Du är nu registrerad för tidig access."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Ogiltig inmatning",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        // Generic error message for all database errors
        // to prevent timing attacks and email enumeration
        toast({
          title: "Ett fel uppstod",
          description: "Försök igen senare.",
          variant: "destructive"
        });
      }
    }
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Layered gradient backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
        {/* Radial gradient from top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh]"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(220 15% 12%) 0%, transparent 100%)' }}
        />
        {/* #1 – Teal hero glow – centrat bakom rubriken */}
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[50vh] pulse-soft"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, hsl(172 50% 45% / 0.10) 0%, hsl(172 50% 45% / 0.04) 50%, transparent 100%)' }}
        />
        {/* Side gradients with teal */}
        <div
          className="absolute top-1/3 left-0 w-[40%] h-[60%]"
          style={{ background: 'radial-gradient(ellipse at 0% 50%, hsl(172 50% 45% / 0.04) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-1/4 right-0 w-[40%] h-[60%]"
          style={{ background: 'radial-gradient(ellipse at 100% 50%, hsl(200 40% 40% / 0.03) 0%, transparent 60%)' }}
        />
      </div>

      {/* Animated teal/emerald orbs */}
      <AnimatedOrb />

      {/* Vignette overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
      </div>


      {/* Fixed Navigation – matches Valora PF minimal style */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
          <div className="flex items-center justify-between">
            {/* Logo – minimal text-only style */}
            <span className="text-foreground/90 font-medium tracking-[0.2em] text-xs flex items-center gap-2">
              <ValoraLogo size="small" />
            </span>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('why')} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                Varför Valora
              </button>
              <button onClick={() => scrollToSection('how')} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                Hur det fungerar
              </button>
              <button onClick={() => scrollToSection('proof')} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                Användare
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                Vanliga frågor
              </button>
              <Button variant="valoraGhost" size="sm" onClick={() => scrollToSection('waitlist')}>
                Gå med i väntelistan
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle menu">
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-border/30 pt-4">
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
            </div>}
        </div>
      </nav>

      {/* Hero Section – centered layout matching Valora Personal Finance */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Headline with gradient text and serif font */}
          <h1 className="headline-hero fade-up mb-6">
            <span className="text-gradient-primary">Autonom</span>
            <br />
            <span className="text-foreground">personlig ekonomi.</span>
          </h1>

          {/* Truth line */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto fade-up-delay-1 mb-4 leading-relaxed">
            Valora arbetar i bakgrunden och identifierar förbättringar i din ekonomi – enligt dina ramar.
          </p>

          {/* Supporting line */}
          <p className="text-base text-muted-foreground/80 fade-up-delay-2 mb-4 font-medium">
            Du behåller kontrollen. Vi gör arbetet.
          </p>

          <p className="text-sm text-muted-foreground/60 fade-up-delay-2 mb-12">
            Gå med på väntelistan och se hur mycket du kan frigöra.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up-delay-3 mb-16">
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

          {/* Live savings ticker – improved pill */}
          <div className="fade-up-delay-3 flex justify-center">
            <div
              className="relative inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 surface-glass rounded-2xl px-7 py-4 border border-primary/20"
              style={{ boxShadow: '0 0 40px hsl(172 50% 45% / 0.12), 0 0 0 1px hsl(172 50% 45% / 0.06) inset' }}
            >
              <CountUpNumber
                end={118816}
                suffix=" kr"
                format={(n) => n.toLocaleString('sv-SE')}
                className="text-3xl sm:text-4xl font-serif font-medium text-primary tabular-nums"
              />
              <span className="text-muted-foreground text-sm">identifierade besparingar</span>
            </div>
          </div>

        </div>
      </section>

      {/* Problem Section - Diagnostic Panel */}
      {/* Section separator */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />

      <section id="why" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <h2 className="headline-section">Problemet är inte brist på besparingar. Det är att människor inte orkar agera.</h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                I både tester och enkätdata framträder samma mönster: människor vet vad de borde göra – 
                men skjuter upp det. Inte av okunskap, utan på grund av mental belastning, friktion och prokrastinering.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <ScrollReveal delay={100}>
            <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                <CountUpNumber end={88} suffix="%" className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary whitespace-nowrap" />
                <div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    har skjutit upp att byta lån eller försäkring – trots att de vet att de borde.
                  </p>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>
            
          <ScrollReveal delay={200}>
            <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                <CountUpNumber end={79} suffix="%" className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary whitespace-nowrap" />
                <div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    känner ibland eller ofta dåligt samvete över att inte ta tag i sin ekonomi.
                  </p>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>
            
          <ScrollReveal delay={300}>
            <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                <CountUpNumber end={56} suffix="%" className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary whitespace-nowrap" />
                <div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    upplever hög mental belastning när de tänker på lån, försäkringar och ekonomi.
                  </p>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>
          </div>
          
          {/* #5 – Quote card med dekorativt citattecken */}
          <ScrollReveal delay={400}>
            <div className="max-w-3xl mx-auto">
              <InteractiveCard className="liquid-glass p-8 sm:p-12 rounded-xl system-glow group chromatic-hover relative overflow-hidden">
                {/* Dekorativt bakgrunds-citattecken */}
                <span className="absolute top-2 left-4 text-[90px] leading-none font-serif select-none pointer-events-none" style={{ color: 'hsl(172 50% 45% / 0.07)' }} aria-hidden="true">"</span>
                <div className="relative z-10">
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light italic leading-relaxed text-foreground mb-6">
                    Jag har vetat i två år att jag borde göra detta – men jag orkade inte.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border/40" />
                    <p className="text-muted-foreground text-sm font-medium">Kvinna, 63 år</p>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* System Status Section */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <ScrollReveal delay={100}>
        <SystemStatus />
      </ScrollReveal>

      {/* How It Works - Interactive Timeline */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="how" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 bg-background-elevated relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          <ScrollReveal>
            <h2 className="headline-section text-center">
              Så fungerar Valora
            </h2>
          </ScrollReveal>
          
          {/* #6 & #7 – Visual Timeline med ikoner, animerad linje och kompakt spacing */}
          <div className="relative max-w-3xl mx-auto">
            {/* Animerad vertikal linje */}
            <div className="absolute left-[27px] top-12 bottom-12 w-px hidden md:block overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              {/* Pulsande dot som rör sig nedåt */}
              <div className="absolute w-1.5 h-8 left-[-3px] rounded-full bg-primary/60 blur-[1px] scan-line" />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <ScrollReveal delay={100}>
                <div className="grid md:grid-cols-[56px_1fr] gap-4 sm:gap-6 items-start relative">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-xl font-serif font-medium text-primary">1</span>
                  </div>
                  <InteractiveCard className="liquid-glass p-5 sm:p-6 rounded-xl group chromatic-hover">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary/70 tracking-widest uppercase">Steg 01</span>
                      </div>
                      <h3 className="headline-card">Koppla din ekonomi</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Du ansluter banker, lån och försäkringar – och anger dina villkor och preferenser.
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="grid md:grid-cols-[56px_1fr] gap-4 sm:gap-6 items-start relative">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-xl font-serif font-medium text-primary">2</span>
                  </div>
                  <InteractiveCard className="liquid-glass p-5 sm:p-6 rounded-xl group chromatic-hover">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary/70 tracking-widest uppercase">Steg 02</span>
                      </div>
                      <h3 className="headline-card">Valora analyserar och förhandlar</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Systemet bevakar marknaden, identifierar förbättringar och förhandlar kontinuerligt åt dig.
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="grid md:grid-cols-[56px_1fr] gap-4 sm:gap-6 items-start relative">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-xl font-serif font-medium text-primary">3</span>
                  </div>
                  <InteractiveCard className="liquid-glass p-5 sm:p-6 rounded-xl group chromatic-hover">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary/70 tracking-widest uppercase">Steg 03</span>
                      </div>
                      <h3 className="headline-card">Du godkänner. Valora verkställer.</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Ett klick. Resten sker automatiskt i bakgrunden.
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section separator */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />

      {/* Proof Section */}
      <section id="proof" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          <ScrollReveal>
            <h2 className="headline-section text-center">
              Verifierad besparing. Verklig mental lättnad.
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal delay={100}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover relative overflow-hidden h-full">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-muted-foreground font-medium">Privatperson, 63 år</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/8 border border-primary/15 rounded-full px-2.5 py-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Verifierat
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-serif font-medium text-primary tabular-nums mb-1">17 000 kr</div>
                <div className="text-xs text-muted-foreground mb-6">per år i identifierade besparingar</div>
                <span className="absolute bottom-2 right-4 text-[72px] leading-none font-serif select-none pointer-events-none" style={{ color: 'hsl(172 50% 45% / 0.07)' }} aria-hidden="true">"</span>
                <p className="text-sm sm:text-base text-muted-foreground font-light italic leading-relaxed">
                  "Jag hade aldrig gjort detta själv. Nu slipper jag tänka."
                </p>
              </InteractiveCard>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover relative overflow-hidden h-full">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-muted-foreground font-medium">Privatperson, 33 år</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/8 border border-primary/15 rounded-full px-2.5 py-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Verifierat
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-serif font-medium text-primary tabular-nums mb-1">15 000 kr</div>
                <div className="text-xs text-muted-foreground mb-6">per år i identifierade besparingar</div>
                <span className="absolute bottom-2 right-4 text-[72px] leading-none font-serif select-none pointer-events-none" style={{ color: 'hsl(172 50% 45% / 0.07)' }} aria-hidden="true">"</span>
                <p className="text-sm sm:text-base text-muted-foreground font-light italic leading-relaxed">
                  "Jag betalar hellre än att behöva bära detta i huvudet."
                </p>
              </InteractiveCard>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={300}>
            <InteractiveCard className="liquid-glass p-8 sm:p-12 rounded-xl max-w-2xl mx-auto group chromatic-hover relative overflow-hidden">
              <span className="absolute top-2 left-4 text-[90px] leading-none font-serif select-none pointer-events-none" style={{ color: 'hsl(172 50% 45% / 0.07)' }} aria-hidden="true">"</span>
              <p className="relative z-10 text-xl sm:text-2xl font-serif font-light italic text-center leading-relaxed">Tidigare gav ekonomi mig konstant ångest. Nu känns det mycket enklare.</p>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Target Audience */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 bg-background-elevated relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          <ScrollReveal>
            <h2 className="headline-section text-center">
              För vem är Valora byggt?
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <ScrollReveal delay={100}>
              <InteractiveCard className="surface-elevated p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <h3 className="headline-card">Den upptagna yrkespersonen</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Du har inte tid att förhandla, jämföra och bevaka. Valora gör det åt dig.
                </p>
              </InteractiveCard>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <InteractiveCard className="surface-elevated p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <h3 className="headline-card">Familjen med komplex ekonomi</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Flera lån och försäkringar. Valora håller allt optimerat i bakgrunden.</p>
              </InteractiveCard>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <InteractiveCard className="surface-elevated p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <h3 className="headline-card">Den som vill ha kontroll utan stress</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Du vill göra rätt – men slippa bära ansvaret mentalt. Valora tar över.
                </p>
              </InteractiveCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="waitlist" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-12 sm:space-y-16">
          <ScrollReveal>
            <div className="text-center space-y-3 sm:space-y-4">
              <p className="text-xs text-primary font-medium tracking-[0.2em] uppercase mb-3">Begränsad tidig tillgång</p>
              <h2 className="headline-section">
                Begär tidig tillgång till Valora
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Vi öppnar Valora successivt för ett begränsat antal användare.
              </p>
            </div>
          </ScrollReveal>
          
          {!submitted ? <form onSubmit={handleSubmit} className="liquid-glass p-6 sm:p-10 rounded-xl space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-light tracking-wide text-foreground">
                  E-post *
                </label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-background-surface border-border" placeholder="din@email.se" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-light tracking-wide text-foreground">
                  Vad vill du att Valora ska optimera åt dig?
                </label>
                <Textarea id="note" value={note} onChange={e => setNote(e.target.value)} className="bg-background-surface border-border min-h-24" placeholder="Bostadslån, privatlån, bilförsäkring, hemförsäkring" />
              </div>
              
              <Button type="submit" variant="valora" className="w-full cta-glow" size="lg">
                Gå med i väntelistan
              </Button>
            </form> : <div className="liquid-glass p-6 sm:p-10 rounded-xl text-center">
              <p className="text-lg sm:text-xl font-light">
                Tack. Du är nu registrerad för tidig access.
              </p>
            </div>}
        </div>
      </section>

      {/* FAQ */}
      <ScrollReveal delay={150}>
      <div className="relative z-10 h-px separator-sweep bg-border/30" />
      <section id="faq" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 bg-background-elevated relative z-10">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <h2 className="headline-section text-center">
            Vanliga frågor
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="liquid-glass px-5 sm:px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline">
                Är Valora en bank?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Nej. Valora är ett autonomt finansiellt system som optimerar din ekonomi ovanpå banker och försäkringsbolag.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="liquid-glass px-5 sm:px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline">
                Behöver jag byta bank?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Nej – och ibland, ja.
                Du behöver aldrig byta bank för att använda Valora. Systemet analyserar och optimerar din ekonomi ovanpå dina befintliga aktörer.
                <br /><br />
                Om Valora identifierar ett förbättringsförslag som kräver ett faktiskt byte av långivare, sker det först efter att du uttryckligen har godkänt det. Inget sker automatiskt utan ditt samtycke.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="liquid-glass px-5 sm:px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline">
                Är det säkert?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Ja. All åtkomst sker med samtycke och enligt bankstandard.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="liquid-glass px-5 sm:px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline">
                Vad kostar det?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                Prissättning fastställs vid lansering. Tidiga användare prioriteras.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      </ScrollReveal>

      {/* Footer – matches Valora Personal Finance */}
      <footer className="relative z-10 w-full mt-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-foreground/90 font-medium tracking-[0.2em] text-xs">VALORA</span>
              <span className="text-muted-foreground text-sm">Autonomt finansiellt system</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                Kontakt
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                Integritet
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                LinkedIn
              </a>
            </nav>
            <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
              <span>Privacy</span>
              <span>Terms</span>
              <span>© {new Date().getFullYear()} Valora</span>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;