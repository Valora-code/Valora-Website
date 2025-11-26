import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SystemStatus } from "@/components/SystemStatus";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DataParticles } from "@/components/DataParticles";
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
  email: z.string().trim().email({ message: "Ogiltig e-postadress" }).max(255),
  note: z.string().trim().max(500, { message: "Anteckningen får vara max 500 tecken" }).optional(),
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
      const validatedData = waitlistSchema.parse({ email, note });

      // Save to Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: validatedData.email,
            note: validatedData.note || null,
          }
        ]);

      // Always show success message to prevent email enumeration attacks
      // Even if email already exists, we don't reveal this to the user
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
        // Generic error message for all database errors (including duplicates)
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
      {/* Vignette overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
      </div>
      
      {/* Depth layer - distant background with parallax and ambient life */}
      <div className="fixed inset-0 z-0">
        <DataParticles />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-elevated to-background opacity-60" style={bgParallax} />
        <div className="absolute inset-0 ambient-liquid" style={{
        willChange: 'transform',
        transform: `${bgParallax.transform?.replace('translateY(', 'translateY(') || 'translateY(0px)'} scale(1.2)`
      }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01),transparent_60%)]" style={{
        willChange: 'transform',
        transform: `${bgParallax.transform?.replace('translateY(', 'translateY(') || 'translateY(0px)'} scale(1.1)`
      }} />
      </div>

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <ValoraLogo size="small" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('why')} className="interactive-element text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                VARFÖR VALORA
              </button>
              <button onClick={() => scrollToSection('how')} className="interactive-element text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                HUR DET FUNGERAR
              </button>
              <button onClick={() => scrollToSection('proof')} className="interactive-element text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                BEVIS
              </button>
              <button onClick={() => scrollToSection('faq')} className="interactive-element text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                VANLIGA FRÅGOR
              </button>
              <MagneticButton strength={0.3}>
                <Button variant="glass" size="sm" onClick={() => scrollToSection('waitlist')}>
                  Gå med i väntelistan
                </Button>
              </MagneticButton>
              
              {/* Theme Toggle */}
              <div className="pl-2 border-l border-border/30">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeToggle />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="interactive-element p-2" aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
              <button onClick={() => {
            scrollToSection('why');
            setMobileMenuOpen(false);
          }} className="block w-full text-left py-2 text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                VARFÖR VALORA
              </button>
              <button onClick={() => {
            scrollToSection('how');
            setMobileMenuOpen(false);
          }} className="block w-full text-left py-2 text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                HUR DET FUNGERAR
              </button>
              <button onClick={() => {
            scrollToSection('proof');
            setMobileMenuOpen(false);
          }} className="block w-full text-left py-2 text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                BEVIS
              </button>
              <button onClick={() => {
            scrollToSection('faq');
            setMobileMenuOpen(false);
          }} className="block w-full text-left py-2 text-sm font-light text-secondary hover:text-foreground transition-all tracking-wide">
                VANLIGA FRÅGOR
              </button>
              <Button variant="glass" size="sm" className="w-full" onClick={() => {
            scrollToSection('waitlist');
            setMobileMenuOpen(false);
          }}>
                Gå med i väntelistan
              </Button>
            </div>}
        </div>
      </nav>

      {/* Hero Section - System Entry Zone */}
      <ScrollReveal>
      <section className="min-h-screen flex items-center px-4 sm:px-6 pt-32 sm:pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: 3D Rotating Valora Logo */}
            <div className="fade-in-up system-glow order-2 lg:order-1 flex items-center justify-center" style={logoParallax}>
              <ThreeValoraLogo />
            </div>
            
            {/* Right: Content */}
            <div className="space-y-8 lg:space-y-16 order-1 lg:order-2">
              <div className="space-y-6 lg:space-y-8 fade-in-up" style={{
                animationDelay: '0.3s'
              }}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight tracking-tighter leading-[0.95] max-w-2xl">
                  Din autonoma ekonomi.
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-secondary font-light leading-relaxed max-w-xl">
                  Ett intelligent finansiellt system som analyserar, förhandlar och förbättrar 
                  dina lån och försäkringar – helt automatiskt, inom dina regler.
                </p>
              </div>
              
              <div className="space-y-4 lg:space-y-5 max-w-xl">
                <div className="flex items-start gap-3 slide-in-left" style={{
                  animationDelay: '0.5s'
                }}>
                  <div className="w-1 h-1 rounded-full bg-foreground mt-2.5 pulse-soft" />
                  <p className="text-sm sm:text-base text-secondary font-light">Automatiskt bättre villkor – utan manuell jämförelse</p>
                </div>
                <div className="flex items-start gap-3 slide-in-left" style={{
                  animationDelay: '0.7s'
                }}>
                  <div className="w-1 h-1 rounded-full bg-foreground mt-2.5 pulse-soft" style={{
                    animationDelay: '0.5s'
                  }} />
                  <p className="text-sm sm:text-base text-secondary font-light">Full kontroll via policyer och samtycke</p>
                </div>
                <div className="flex items-start gap-3 slide-in-left" style={{
                  animationDelay: '0.9s'
                }}>
                  <div className="w-1 h-1 rounded-full bg-foreground mt-2.5 pulse-soft" style={{
                    animationDelay: '1s'
                  }} />
                  <p className="text-sm sm:text-base text-secondary font-light">Lägre kostnader, mindre mental belastning</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-4 fade-in-up" style={{
                animationDelay: '1.1s'
              }}>
                <MagneticButton strength={0.4}>
                  <button onClick={() => scrollToSection('waitlist')} onMouseMove={handleMouseMove} className="access-port group">
                    <span className="relative z-10 text-sm font-light tracking-[0.15em] uppercase">
                      Begär tidig tillgång
                    </span>
                  </button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <button onClick={() => scrollToSection('how')} className="interactive-element text-secondary hover:text-foreground transition-all text-sm tracking-wide pt-2">
                    Så fungerar Valora →
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Problem Section - Diagnostic Panel */}
      <section id="why" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border relative z-10">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-tight">Problemet är inte brist på besparingar. Det är att människor inte orkar agera.</h2>
              <p className="text-base sm:text-lg text-secondary font-light leading-relaxed">
                I både tester och enkätdata framträder samma mönster: människor vet vad de borde göra – 
                men skjuter upp det. Inte av okunskap, utan på grund av mental belastning, friktion och prokrastinering.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <ScrollReveal delay={100}>
            <InteractiveCard className="diagnostic-row liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                <CountUpNumber end={88} suffix="%" className="text-5xl sm:text-6xl font-mono font-light tracking-tighter text-foreground whitespace-nowrap" />
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                  har skjutit upp att byta lån eller försäkring – trots att de vet att de borde.
                </p>
              </div>
            </InteractiveCard>
          </ScrollReveal>
            
          <ScrollReveal delay={200}>
            <InteractiveCard className="diagnostic-row liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                <CountUpNumber end={79} suffix="%" className="text-5xl sm:text-6xl font-mono font-light tracking-tighter text-foreground whitespace-nowrap" />
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                  känner ibland eller ofta dåligt samvete över att inte ta tag i sin ekonomi.
                </p>
              </div>
            </InteractiveCard>
          </ScrollReveal>
            
          <ScrollReveal delay={300}>
            <InteractiveCard className="diagnostic-row liquid-glass p-6 sm:p-8 rounded-xl group chromatic-hover">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
                <CountUpNumber end={56} suffix="%" className="text-5xl sm:text-6xl font-mono font-light tracking-tighter text-foreground whitespace-nowrap" />
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                  upplever hög mental belastning när de tänker på lån, försäkringar och ekonomi.
                </p>
              </div>
            </InteractiveCard>
          </ScrollReveal>
          </div>
          
          <ScrollReveal delay={400}>
            <div className="max-w-3xl mx-auto">
              <InteractiveCard className="liquid-glass p-6 sm:p-10 rounded-xl border-l-2 border-foreground/20 system-glow group chromatic-hover">
                <p className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed mb-4">
                  "Jag har vetat i två år att jag borde göra detta – men jag orkade inte."
                </p>
                <p className="text-secondary text-sm tracking-wide">– kvinna, 63år</p>
              </InteractiveCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* System Status Section */}
      <ScrollReveal delay={100}>
        <SystemStatus />
      </ScrollReveal>

      {/* How It Works - Interactive Timeline */}
      <section id="how" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border bg-background-elevated relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-center">
              Så fungerar Valora
            </h2>
          </ScrollReveal>
          
          {/* Visual Timeline */}
          <div className="relative">
            {/* Connecting vertical line */}
            <div className="absolute left-[50px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
            
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              <ScrollReveal delay={100}>
                <div className="grid md:grid-cols-[100px_1fr] gap-6 sm:gap-8 items-start relative">
                  {/* Number with glow */}
                  <div className="relative">
                    <div className="text-4xl sm:text-5xl font-extralight stat-accent stat-breathe relative z-10">01</div>
                    <div className="absolute inset-0 blur-2xl opacity-30 stat-accent">01</div>
                  </div>
                  <InteractiveCard className="liquid-glass p-5 sm:p-6 rounded-xl group chromatic-hover">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight">Koppla din ekonomi</h3>
                      <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                        Du ansluter banker, lån och försäkringar – och anger dina villkor och preferenser.
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              </ScrollReveal>
              
              <div className="h-px bg-border separator-sweep" />
              
              <ScrollReveal delay={200}>
                <div className="grid md:grid-cols-[100px_1fr] gap-6 sm:gap-8 items-start relative">
                  <div className="relative">
                    <div className="text-4xl sm:text-5xl font-extralight stat-accent stat-breathe relative z-10">02</div>
                    <div className="absolute inset-0 blur-2xl opacity-30 stat-accent">02</div>
                  </div>
                  <InteractiveCard className="liquid-glass p-5 sm:p-6 rounded-xl group chromatic-hover">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight">Valora analyserar och förhandlar</h3>
                      <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                        Systemet bevakar marknaden, identifierar förbättringar och förhandlar kontinuerligt åt dig.
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              </ScrollReveal>
              
              <div className="h-px bg-border separator-sweep" />
              
              <ScrollReveal delay={300}>
                <div className="grid md:grid-cols-[100px_1fr] gap-6 sm:gap-8 items-start relative">
                  <div className="relative">
                    <div className="text-4xl sm:text-5xl font-extralight stat-accent stat-breathe relative z-10">03</div>
                    <div className="absolute inset-0 blur-2xl opacity-30 stat-accent">03</div>
                  </div>
                  <InteractiveCard className="liquid-glass p-5 sm:p-6 rounded-xl group chromatic-hover">
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight">Du godkänner. Valora verkställer.</h3>
                      <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
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

      {/* Proof Section */}
      <section id="proof" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border relative z-10">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-center">
              Verifierad besparing. Verklig mental lättnad.
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal delay={100}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <div className="text-2xl sm:text-3xl font-light">privatperson, 63 </div>
                <div className="text-3xl sm:text-4xl font-mono font-light text-secondary tabular-nums">ca 17 000 kr/år</div>
                <p className="text-sm sm:text-base text-secondary font-light italic pt-2 sm:pt-4">
                  "Jag hade aldrig gjort detta själv. Nu slipper jag tänka."
                </p>
              </InteractiveCard>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <div className="text-2xl sm:text-3xl font-light">privatperson, 33</div>
                <div className="text-3xl sm:text-4xl font-mono font-light text-secondary tabular-nums">ca 15 000 kr/år</div>
                <p className="text-sm sm:text-base text-secondary font-light italic pt-2 sm:pt-4">
                  "Jag betalar hellre än att behöva bära detta i huvudet."
                </p>
              </InteractiveCard>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={300}>
            <InteractiveCard className="liquid-glass p-6 sm:p-10 rounded-xl max-w-2xl mx-auto group chromatic-hover">
              <p className="text-lg sm:text-xl font-light italic text-center">
                "Tidigare gav ekonomi mig konstant ångest. Nu känns det löst."
              </p>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border bg-background-elevated relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-center">
              För vem är Valora byggt?
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <ScrollReveal delay={100}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <h3 className="text-lg sm:text-xl font-light">Den upptagna yrkespersonen</h3>
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                  Du har inte tid att förhandla, jämföra och bevaka. Valora gör det åt dig.
                </p>
              </InteractiveCard>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <h3 className="text-lg sm:text-xl font-light">Familjen med komplex ekonomi</h3>
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">Flera lån och försäkringar. Valora håller allt optimerat i bakgrunden.</p>
              </InteractiveCard>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <h3 className="text-lg sm:text-xl font-light">Den som vill ha kontroll utan stress</h3>
                <p className="text-sm sm:text-base text-secondary font-light leading-relaxed">
                  Du vill göra rätt – men slippa bära ansvaret mentalt. Valora tar över.
                </p>
              </InteractiveCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border relative z-10">
        <div className="max-w-2xl mx-auto space-y-12 sm:space-y-16">
          <ScrollReveal>
            <div className="text-center space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight">
                Begär tidig tillgång till Valora
              </h2>
              <p className="text-base sm:text-lg text-secondary font-light">
                Vi öppnar Valora successivt för ett begränsat antal användare.
              </p>
            </div>
          </ScrollReveal>
          
          {!submitted ? <form onSubmit={handleSubmit} className="liquid-glass p-6 sm:p-10 rounded-xl space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-light tracking-wide text-secondary">
                  E-post *
                </label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-background-surface border-border" placeholder="din@email.se" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-light tracking-wide text-secondary">
                  Vad vill du att Valora ska optimera åt dig?
                </label>
                <Textarea id="note" value={note} onChange={e => setNote(e.target.value)} className="bg-background-surface border-border min-h-24" placeholder="Bostadslån, privatlån, bilförsäkring, hemförsäkring" />
              </div>
              
              <Button type="submit" variant="glass" className="w-full" size="lg">
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
      <section id="faq" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border bg-background-elevated relative z-10">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-center">
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
                Nej. Valora arbetar med dina befintliga aktörer.
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

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-border relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
            <p className="text-sm sm:text-base text-secondary font-light">
              Valora – ett autonomt system för din privatekonomi.
            </p>
            
            <div className="flex flex-wrap gap-6 sm:gap-8">
              <a href="#" className="text-secondary hover:text-foreground transition-colors text-sm tracking-wide">
                Kontakt
              </a>
              <a href="#" className="text-secondary hover:text-foreground transition-colors text-sm tracking-wide">
                Integritet
              </a>
              <a href="#" className="text-secondary hover:text-foreground transition-colors text-sm tracking-wide">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;