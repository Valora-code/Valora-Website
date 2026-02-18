import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import AnimatedOrb from "@/components/AnimatedOrb";
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

      {/* Layered gradient backgrounds – matches Valora Personal Finance */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
        {/* Radial gradient from top */}
        <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh]"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, hsl(220 15% 12%) 0%, transparent 100%)' }} />

        {/* Side gradients with teal */}
        <div
        className="absolute top-1/3 left-0 w-[40%] h-[60%]"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, hsl(172 50% 45% / 0.04) 0%, transparent 60%)' }} />

        <div
        className="absolute top-1/4 right-0 w-[40%] h-[60%]"
        style={{ background: 'radial-gradient(ellipse at 100% 50%, hsl(200 40% 40% / 0.03) 0%, transparent 60%)' }} />

      </div>

      {/* Animated teal/emerald orbs */}
      <AnimatedOrb />

      {/* Vignette overlay for depth */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
      </div>

      {/* Depth layer - data particles */}
      <div className="fixed inset-0 z-0">
        <DataParticles />
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
                <Button variant="valora" size="sm" onClick={() => scrollToSection('waitlist')} className="cta-glow">
                  Gå med i väntelistan
                </Button>
              </MagneticButton>
              
              {/* Theme Toggle */}
              
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
              <Button variant="valora" size="sm" className="w-full cta-glow" onClick={() => {
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
                <h1 className="headline-hero fade-up max-w-2xl">
                  <span className="text-gradient-primary">
                  </span>
                  <br />
                  <span className="text-foreground">personlig ekonomi.</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-xl fade-up-delay-1">Banksäker kyptering


                </p>
              </div>
              
              <div className="space-y-4 lg:space-y-5 max-w-xl fade-up-delay-2">
                <div className="flex items-center gap-2.5 text-muted-foreground group cursor-default">
                  <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <p className="text-sm sm:text-base">Automatiskt bättre villkor – utan manuell jämförelse</p>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground group cursor-default">
                  <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <p className="text-sm sm:text-base">Full kontroll via policyer och samtycke</p>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground group cursor-default">
                  <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-sm sm:text-base">Lägre kostnader, mindre mental belastning</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-4 fade-in-up" style={{ animationDelay: '1.1s'
                }}>
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
              <h2 className="headline-section">Problemet är inte brist på besparingar. Det är att människor inte orkar agera.</h2>
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
            <h2 className="headline-section text-center">
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
            <h2 className="headline-section text-center">
              Verifierad besparing. Verklig mental lättnad.
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollReveal delay={100}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <div className="text-2xl sm:text-3xl font-light">privatperson, 63år </div>
                <div className="text-3xl sm:text-4xl font-mono font-light text-secondary tabular-nums">ca 17 000 kr/år</div>
                <p className="text-sm sm:text-base text-secondary font-light italic pt-2 sm:pt-4">
                  "Jag hade aldrig gjort detta själv. Nu slipper jag tänka."
                </p>
              </InteractiveCard>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-xl space-y-3 sm:space-y-4 group chromatic-hover">
                <div className="text-2xl sm:text-3xl font-light">privatperson, 33år</div>
                <div className="text-3xl sm:text-4xl font-mono font-light text-secondary tabular-nums">ca 15 000 kr/år</div>
                <p className="text-sm sm:text-base text-secondary font-light italic pt-2 sm:pt-4">
                  "Jag betalar hellre än att behöva bära detta i huvudet."
                </p>
              </InteractiveCard>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={300}>
            <InteractiveCard className="liquid-glass p-6 sm:p-10 rounded-xl max-w-2xl mx-auto group chromatic-hover">
              <p className="text-lg sm:text-xl font-light italic text-center">"Tidigare gav ekonomi mig konstant ångest. Nu känns det mycket enklare."</p>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border bg-background-elevated relative z-10">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
          <ScrollReveal>
            <h2 className="headline-section text-center">
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
              <h2 className="headline-section">
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
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background-surface border-border" placeholder="din@email.se" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-light tracking-wide text-secondary">
                  Vad vill du att Valora ska optimera åt dig?
                </label>
                <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} className="bg-background-surface border-border min-h-24" placeholder="Bostadslån, privatlån, bilförsäkring, hemförsäkring" />
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
      <section id="faq" className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 border-t border-border bg-background-elevated relative z-10">
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