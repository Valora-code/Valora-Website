import { useState, useEffect, useRef } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().trim().email({ message: "Ogiltig e-postadress" }).max(255),
  note: z.string().trim().max(500, { message: "Anteckningen får vara max 500 tecken" }).optional()
});

// Cursor-following ambient glow
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, hsl(172 50% 45% / 0.04), transparent 60%)`,
      }}
    />
  );
};

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
        note: validatedData.note || null
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <CursorGlow />

      {/* Subtle top gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh]"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, hsl(220 14% 10%) 0%, transparent 100%)' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <ValoraLogo size="small" />

            <div className="hidden md:flex items-center gap-8">
              {[['why', 'Varför Valora'], ['how', 'Hur det fungerar'], ['proof', 'Användare'], ['faq', 'Frågor']].map(([id, label]) => (
                <button key={id} onClick={() => scrollToSection(id)}
                  className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </button>
              ))}
              <Button variant="valora" size="sm" onClick={() => scrollToSection('waitlist')}>
                Tidig tillgång
              </Button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Meny">
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-border/20 pt-4">
              {[['why', 'Varför Valora'], ['how', 'Hur det fungerar'], ['proof', 'Användare'], ['faq', 'Frågor']].map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </button>
              ))}
              <div className="pt-3">
                <Button variant="valora" size="sm" className="w-full" onClick={() => { scrollToSection('waitlist'); setMobileMenuOpen(false); }}>
                  Tidig tillgång
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="min-h-[100vh] flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 fade-up">
            <span className="inline-block text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground border border-border/60 rounded-full px-4 py-1.5">
              Begränsad tidig tillgång
            </span>
          </div>

          <h1 className="headline-hero fade-up mb-8">
            <span className="text-foreground">Autonom</span>
            <br />
            <span className="text-foreground/60">personlig ekonomi.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto fade-up-delay-1 mb-12 leading-relaxed font-light">
            Valora arbetar i bakgrunden och optimerar din ekonomi — enligt dina villkor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up-delay-2 mb-20">
            <Button variant="valora" size="lg" onClick={() => scrollToSection('waitlist')} className="cta-glow min-w-[200px]">
              Begär tidig tillgång
            </Button>
            <Button variant="valoraGhost" size="lg" onClick={() => scrollToSection('how')} className="min-w-[180px]">
              Så fungerar det
            </Button>
          </div>

          {/* Savings counter */}
          <div className="fade-up-delay-3">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 border border-border/40 rounded-2xl px-8 py-5 bg-background-elevated">
              <CountUpNumber
                end={148499}
                suffix=" kr"
                format={(n) => n.toLocaleString('sv-SE')}
                className="text-3xl sm:text-4xl font-serif font-normal text-primary tabular-nums"
              />
              <span className="text-muted-foreground text-sm">identifierade besparingar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <div className="h-px w-full bg-border/30" />
      <section id="why" className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="headline-section mb-6">
                Problemet är inte brist på besparingar.<br />
                <span className="text-muted-foreground">Det är att ingen orkar agera.</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
                Människor vet vad de borde göra – men skjuter upp det. Inte av okunskap, utan på grund av friktion.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento grid stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            <ScrollReveal delay={100}>
              <div className="card-modern rounded-2xl p-8 h-full">
                <CountUpNumber end={88} suffix="%" className="text-5xl font-serif font-normal text-primary mb-4 block" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  har skjutit upp att byta lån eller försäkring — trots att de vet att de borde.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="card-modern rounded-2xl p-8 h-full">
                <CountUpNumber end={79} suffix="%" className="text-5xl font-serif font-normal text-primary mb-4 block" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  känner dåligt samvete över att inte ta tag i sin ekonomi.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="card-modern rounded-2xl p-8 h-full">
                <CountUpNumber end={56} suffix="%" className="text-5xl font-serif font-normal text-primary mb-4 block" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  upplever hög mental belastning kring lån, försäkringar och ekonomi.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Quote */}
          <ScrollReveal delay={400}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-2xl sm:text-3xl font-serif font-normal italic leading-relaxed text-foreground/90 mb-4">
                "Jag har vetat i två år att jag borde göra detta – men jag orkade inte."
              </p>
              <p className="text-sm text-muted-foreground">Kvinna, 63 år</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── INDUSTRY PROBLEMS ─── */}
      <div className="h-px w-full bg-border/30" />
      <section className="py-24 sm:py-32 px-6 bg-background-elevated relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="caption text-primary mb-4 block">Branschproblem</span>
              <h2 className="headline-section max-w-2xl mx-auto">
                Marknaden är manuell. Belastningen hamnar på individen.
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-0">
            {[
              { label: 'Manuell jämförelse mellan aktörer', delay: 200 },
              { label: 'Prokrastinering vid varje livsbeslut', delay: 400 },
              { label: 'Kognitiv överbelastning vid komplex ekonomi', delay: 600 },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={item.delay}>
                <div className="flex items-center gap-5 py-5 border-b border-border/20 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground/80">{item.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <div className="h-px w-full bg-border/30" />
      <section id="how" className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-20">Så fungerar Valora</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Koppla din ekonomi', desc: 'Du ansluter banker, lån och försäkringar — och anger dina villkor.' },
              { step: '02', title: 'Valora analyserar', desc: 'Systemet bevakar marknaden och identifierar förbättringar kontinuerligt.' },
              { step: '03', title: 'Du godkänner', desc: 'Ett klick. Resten sker automatiskt i bakgrunden.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-modern rounded-2xl p-8 h-full group">
                  <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-primary/60 mb-6 block">
                    Steg {item.step}
                  </span>
                  <h3 className="headline-card mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROOF ─── */}
      <div className="h-px w-full bg-border/30" />
      <section id="proof" className="py-24 sm:py-32 lg:py-40 px-6 bg-background-elevated relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-20">
              Verifierad besparing.<br />
              <span className="text-muted-foreground">Verklig mental lättnad.</span>
            </h2>
          </ScrollReveal>

          {/* Bento proof grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
            <ScrollReveal delay={100}>
              <div className="card-accent rounded-2xl p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">Privatperson, 63 år</span>
                  <span className="text-[11px] text-primary border border-primary/20 rounded-full px-3 py-1">Verifierat</span>
                </div>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-primary mb-1">17 000 kr</div>
                <div className="text-xs text-muted-foreground mb-8">per år i identifierade besparingar</div>
                <p className="text-sm text-muted-foreground font-light italic leading-relaxed">
                  "Jag hade aldrig gjort detta själv. Nu slipper jag tänka."
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="card-accent rounded-2xl p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">Privatperson, 33 år</span>
                  <span className="text-[11px] text-primary border border-primary/20 rounded-full px-3 py-1">Verifierat</span>
                </div>
                <div className="text-4xl sm:text-5xl font-serif font-normal text-primary mb-1">15 000 kr</div>
                <div className="text-xs text-muted-foreground mb-8">per år i identifierade besparingar</div>
                <p className="text-sm text-muted-foreground font-light italic leading-relaxed">
                  "Jag betalar hellre än att behöva bära detta i huvudet."
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300}>
            <div className="card-modern rounded-2xl p-10 max-w-4xl mx-auto text-center">
              <p className="text-xl sm:text-2xl font-serif font-normal italic text-foreground/80 leading-relaxed">
                "Tidigare gav ekonomi mig konstant ångest. Nu känns det mycket enklare."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── AUDIENCE ─── */}
      <div className="h-px w-full bg-border/30" />
      <section className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-20">För vem är Valora byggt?</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { title: 'Den upptagna yrkespersonen', desc: 'Du har inte tid att förhandla, jämföra och bevaka. Valora gör det åt dig.' },
              { title: 'Familjen med komplex ekonomi', desc: 'Flera lån och försäkringar. Valora håller allt optimerat i bakgrunden.' },
              { title: 'Den som vill ha kontroll utan stress', desc: 'Du vill göra rätt — men slippa bära ansvaret mentalt.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-modern rounded-2xl p-8 h-full">
                  <h3 className="headline-card mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WAITLIST ─── */}
      <div className="h-px w-full bg-border/30" />
      <section id="waitlist" className="py-24 sm:py-32 lg:py-40 px-6 bg-background-elevated relative z-10">
        <div className="max-w-xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="caption text-primary mb-4 block">Begränsad tidig tillgång</span>
              <h2 className="headline-section mb-4">Begär tidig tillgång</h2>
              <p className="text-base text-muted-foreground font-light">
                Vi öppnar Valora successivt för ett begränsat antal användare.
              </p>
            </div>
          </ScrollReveal>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="card-accent rounded-2xl p-8 sm:p-10 space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-light text-foreground/80">E-post *</label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="bg-background border-border/60 focus:border-primary/40" placeholder="din@email.se" />
              </div>
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-light text-foreground/80">Vad vill du att Valora ska optimera?</label>
                <Textarea id="note" value={note} onChange={e => setNote(e.target.value)}
                  className="bg-background border-border/60 focus:border-primary/40 min-h-24"
                  placeholder="Bostadslån, privatlån, bilförsäkring, hemförsäkring" />
              </div>
              <Button type="submit" variant="valora" className="w-full cta-glow" size="lg">
                Gå med i väntelistan
              </Button>
            </form>
          ) : (
            <div className="card-modern rounded-2xl p-10 text-center">
              <p className="text-lg font-light">Tack. Du är nu registrerad för tidig access.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <div className="h-px w-full bg-border/30" />
      <section id="faq" className="py-24 sm:py-32 lg:py-40 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-16">Vanliga frågor</h2>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: 'Är Valora en bank?', a: 'Nej. Valora är ett autonomt finansiellt system som optimerar din ekonomi ovanpå banker och försäkringsbolag.' },
              { q: 'Behöver jag byta bank?', a: 'Nej — och ibland, ja. Du behöver aldrig byta bank för att använda Valora. Om Valora identifierar ett förbättringsförslag som kräver ett byte, sker det först efter ditt uttryckliga godkännande.' },
              { q: 'Är det säkert?', a: 'Ja. All åtkomst sker med samtycke och enligt bankstandard.' },
              { q: 'Vad kostar det?', a: 'Prissättning fastställs vid lansering. Tidiga användare prioriteras.' },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="card-modern px-6 sm:px-8 rounded-xl border-none">
                <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-foreground/70 font-light leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 w-full">
        <div className="h-px w-full bg-border/30" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-foreground/80 font-medium tracking-[0.2em] text-xs">VALORA</span>
              <span className="text-muted-foreground text-sm font-light">Autonomt finansiellt system</span>
            </div>
            <nav className="flex items-center gap-6">
              {['Kontakt', 'Integritet', 'LinkedIn'].map(label => (
                <a key={label} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
                  {label}
                </a>
              ))}
            </nav>
            <span className="text-xs text-muted-foreground/50">© {new Date().getFullYear()} Valora</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
