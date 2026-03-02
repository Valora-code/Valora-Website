import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";
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
      {/* 5-layer atmospheric background */}
      <AtmosphericBackground />

      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl nav-glass">
            <ValoraLogo size="small" />
            <div className="hidden md:flex items-center gap-8">
              {[
                ['why', 'Varför'],
                ['how', 'Hur'],
                ['proof', 'Resultat'],
                ['faq', 'FAQ'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200 font-light"
                >
                  {label}
                </button>
              ))}
              <Button
                variant="valora"
                size="sm"
                onClick={() => scrollToSection('waitlist')}
                className="text-[12px] h-8 px-4 rounded-lg"
              >
                Gå med
              </Button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 rounded-2xl p-3 space-y-0.5 nav-glass">
              {[['why','Varför Valora'],['how','Hur det fungerar'],['proof','Resultat'],['faq','FAQ']].map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg font-light">
                  {label}
                </button>
              ))}
              <div className="pt-1.5 px-1">
                <Button variant="valora" size="sm" className="w-full" onClick={() => { scrollToSection('waitlist'); setMobileMenuOpen(false); }}>
                  Gå med i väntelistan
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO — Premium editorial centerpiece
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8">
        {/* Hero arc glow — cinematic bottom light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[150%] pointer-events-none">
          <div
            className="w-full aspect-[2/1] rounded-full hero-arc-glow"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, hsl(172 45% 42% / 0.12) 0%, hsl(172 45% 42% / 0.04) 20%, transparent 45%)',
              transform: 'translateY(65%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full text-center space-y-10 sm:space-y-12">
          {/* Status badge */}
          <div className="fade-up">
            <span
              className="inline-flex items-center gap-2.5 text-[10px] font-medium tracking-[0.2em] uppercase px-5 py-2.5 rounded-full shimmer-sweep"
              style={{
                background: 'hsl(0 0% 100% / 0.025)',
                border: '1px solid hsl(0 0% 100% / 0.06)',
                color: 'hsl(0 0% 55%)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 machine-pulse" />
              Autonom finansiell optimering
            </span>
          </div>

          {/* Headline — large editorial serif */}
          <div className="fade-up-delay-1 space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-medium leading-[0.9] tracking-[-0.035em]">
              <span className="text-gradient-primary">Din ekonomi.</span>
              <br />
              <span className="text-foreground/90">Alltid </span>
              <span className="italic font-normal text-foreground/60">optimerad.</span>
            </h1>
          </div>

          {/* Subtext — private banking tone */}
          <p className="fade-up-delay-2 text-sm sm:text-[15px] text-muted-foreground max-w-[28rem] mx-auto leading-relaxed font-light">
            Valora identifierar och genomför förbättringar i din ekonomi — automatiskt, enligt dina villkor.
          </p>

          {/* CTA — glass capsule */}
          <div className="fade-up-delay-3 max-w-md mx-auto">
            {!submitted ? (
              <div className="space-y-3">
                <SpotlightCard>
                  <form onSubmit={handleSubmit} className="p-2">
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/25 h-12 px-4 font-light rounded-xl"
                        placeholder="din@email.se"
                      />
                      <Button type="submit" variant="valora" className="rounded-xl h-10 px-6 text-[12px] font-medium shrink-0">
                        Gå med
                      </Button>
                    </div>
                  </form>
                </SpotlightCard>
                <Textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="bg-transparent border border-border/10 focus-visible:ring-primary/15 min-h-[52px] text-sm placeholder:text-muted-foreground/18 resize-none rounded-xl font-light input-glow"
                  placeholder="Valfritt: Vad vill du optimera?"
                />
              </div>
            ) : (
              <SpotlightCard>
                <div className="p-10 text-center space-y-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-foreground font-serif text-xl">Tack.</p>
                  <p className="text-muted-foreground text-xs font-light">Du är registrerad för tidig access.</p>
                </div>
              </SpotlightCard>
            )}
          </div>

          {/* Trust strip */}
          <div className="fade-up-delay-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[10px] text-muted-foreground/30 font-light tracking-[0.2em] uppercase">
            <span>BankID</span>
            <span className="w-px h-3 bg-border/15" />
            <span>PSD2</span>
            <span className="w-px h-3 bg-border/15" />
            <span>Licensierade partners</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROBLEM — Editorial with metric strip
      ═══════════════════════════════════════════════════════════ */}
      <section id="why" className="py-28 sm:py-36 lg:py-44 px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-20 sm:space-y-24">
          <ScrollReveal>
            <div className="max-w-[52ch] mx-auto text-center space-y-6">
              <p className="caption text-primary/40">Problemet</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[0.92] tracking-[-0.025em]">
                Det handlar inte om<br className="hidden sm:block" /> brist på besparingar.
              </h2>
              <p className="text-sm sm:text-[15px] text-muted-foreground font-light leading-relaxed max-w-[46ch] mx-auto">
                Människor vet vad de borde göra — men skjuter upp det. Inte av okunskap, utan av mental belastning.
              </p>
            </div>
          </ScrollReveal>

          {/* Metric strip — thin, premium, horizontal */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: 'hsl(0 0% 100% / 0.03)' }}>
              {[
                { num: 88, label: 'har skjutit upp byte av lån eller försäkring' },
                { num: 79, label: 'känner dåligt samvete över sin ekonomi' },
                { num: 56, label: 'upplever hög mental belastning' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-8 sm:p-10 text-center"
                  style={{ background: 'hsl(var(--background))' }}
                >
                  <CountUpNumber
                    end={stat.num}
                    suffix="%"
                    className="text-3xl sm:text-4xl font-serif font-medium tracking-tight stat-accent tabular-nums"
                  />
                  <p className="text-xs text-muted-foreground/60 font-light mt-3 leading-relaxed max-w-[20ch] mx-auto">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Quote */}
          <ScrollReveal delay={200}>
            <div className="text-center py-4">
              <p className="text-lg sm:text-xl md:text-2xl font-serif font-light italic leading-relaxed text-foreground/50 max-w-[38ch] mx-auto">
                "Jag har vetat i två år att jag borde göra detta — men jag orkade inte."
              </p>
              <p className="text-muted-foreground/35 text-[11px] font-light mt-6 tracking-wider">Kvinna, 63 år</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — 3 numbered glass tiles, generous spacing
      ═══════════════════════════════════════════════════════════ */}
      <section id="how" className="py-28 sm:py-36 lg:py-44 px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-20 sm:space-y-24">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary/40">Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[0.92] tracking-[-0.025em]">
                Tre steg.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              { num: '01', title: 'Anslut', desc: 'Koppla banker, lån och försäkringar. Ange dina villkor.' },
              { num: '02', title: 'Analys', desc: 'Valora bevakar marknaden och identifierar förbättringar kontinuerligt.' },
              { num: '03', title: 'Godkänn', desc: 'Ett klick. Resten sker automatiskt. Du behåller kontrollen.' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={(i + 1) * 120}>
                <SpotlightCard className="h-full">
                  <div className="p-8 sm:p-9 flex flex-col gap-6 min-h-[220px]">
                    <span className="text-2xl font-serif font-medium text-primary/20 tracking-tight">
                      {item.num}
                    </span>
                    <div className="space-y-3 mt-auto">
                      <h3 className="text-base sm:text-lg font-serif font-medium text-foreground tracking-tight">{item.title}</h3>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROOF — Testimonials
      ═══════════════════════════════════════════════════════════ */}
      <section id="proof" className="py-28 sm:py-36 lg:py-44 px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-20 sm:space-y-24">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary/40">Resultat</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[0.92] tracking-[-0.025em]">
                Verifierad besparing.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              { person: 'Privatperson, 63 år', amount: '17 000 kr', period: '/år', quote: '"Jag hade aldrig gjort detta själv. Nu slipper jag tänka."' },
              { person: 'Privatperson, 33 år', amount: '15 000 kr', period: '/år', quote: '"Jag betalar hellre än att bära detta i huvudet."' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 120}>
                <SpotlightCard className="h-full">
                  <div className="p-8 sm:p-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/50 font-light tracking-wide">{item.person}</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-primary/60 font-light">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        Verifierat
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl font-serif font-medium text-foreground tabular-nums">{item.amount}</span>
                      <span className="text-muted-foreground/40 text-xs font-light ml-2">{item.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground/60 font-light italic leading-relaxed border-t border-border/8 pt-5">
                      {item.quote}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center py-4">
              <p className="text-base sm:text-lg font-serif font-light italic leading-relaxed text-foreground/45 max-w-[36ch] mx-auto">
                "Tidigare gav ekonomi mig konstant ångest. Nu känns det enklare."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TARGET AUDIENCE — Quiet luxury list
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36 lg:py-44 px-5 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto space-y-20 sm:space-y-24">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary/40">Målgrupp</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[0.92] tracking-[-0.025em]">
                Byggt för dig.
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-2 max-w-2xl mx-auto">
            {[
              { title: 'Den upptagna', desc: 'Du har inte tid att jämföra och förhandla. Valora gör det åt dig.' },
              { title: 'Familjen med komplex ekonomi', desc: 'Flera lån och försäkringar. Valora håller allt optimerat.' },
              { title: 'Den som vill ha kontroll utan stress', desc: 'Du vill göra rätt — men slippa bära ansvaret mentalt.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 100}>
                <div
                  className="flex items-start gap-6 p-6 sm:p-7 rounded-2xl transition-all duration-400 group hover:bg-muted/4"
                  style={{ border: '1px solid transparent' }}
                >
                  <span className="text-primary/25 text-sm font-serif mt-1 shrink-0 group-hover:text-primary/40 transition-colors duration-400">✦</span>
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-[15px] font-medium text-foreground tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WAITLIST — Secondary CTA
      ═══════════════════════════════════════════════════════════ */}
      <section id="waitlist" className="relative z-10 py-28 sm:py-36 lg:py-44 px-5 sm:px-8">
        {/* Subtle focused glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, hsl(172 45% 42% / 0.07) 0%, transparent 65%)',
              filter: 'blur(90px)',
            }}
          />
        </div>

        <ScrollReveal>
          <div className="max-w-md mx-auto text-center relative z-10 space-y-10">
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground leading-tight tracking-[-0.02em]">
                Gå med i <span className="italic font-normal text-foreground/60">väntelistan</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground/50 font-light leading-relaxed max-w-xs mx-auto">
                Få tidig tillgång och bli bland de första att optimera din ekonomi autonomt.
              </p>
            </div>

            {!submitted ? (
              <div className="space-y-3">
                <SpotlightCard>
                  <form onSubmit={handleSubmit} className="p-2">
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/20 h-12 px-4 font-light rounded-xl"
                        placeholder="din@email.se"
                      />
                      <Button type="submit" variant="valora" className="rounded-xl h-10 px-6 text-[12px] font-medium shrink-0">
                        Begär tillgång
                      </Button>
                    </div>
                  </form>
                </SpotlightCard>
              </div>
            ) : (
              <SpotlightCard>
                <div className="p-10 text-center space-y-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-foreground font-serif text-xl">Tack.</p>
                  <p className="text-muted-foreground text-xs font-light">Du är registrerad för tidig access.</p>
                </div>
              </SpotlightCard>
            )}

            <div className="flex items-center justify-center gap-2.5 text-xs text-muted-foreground/30 font-light">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/30 machine-pulse" />
              <span>
                <CountUpNumber end={247} className="text-foreground/40 tabular-nums" duration={1500} /> väntar på tillgång
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ — Premium accordion with hairline separators
      ═══════════════════════════════════════════════════════════ */}
      <ScrollReveal delay={80}>
        <section id="faq" className="py-28 sm:py-36 lg:py-44 px-5 sm:px-8 relative z-10">
          <div className="max-w-2xl mx-auto space-y-16 sm:space-y-20">
            <div className="text-center space-y-4">
              <p className="caption text-primary/40">Frågor</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[0.92] tracking-[-0.025em]">
                Vanliga frågor
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-0">
              {[
                { q: 'Är Valora en bank?', a: 'Nej. Valora är ett autonomt finansiellt system som optimerar din ekonomi ovanpå befintliga banker och försäkringsbolag.' },
                { q: 'Behöver jag byta bank?', a: 'Nej – och ibland, ja. Du behöver aldrig byta bank för att använda Valora. Systemet analyserar och optimerar ovanpå dina befintliga aktörer. Om ett byte rekommenderas sker det först efter ditt godkännande.' },
                { q: 'Är det säkert?', a: 'Ja. All åtkomst sker med samtycke och enligt bankstandard.' },
                { q: 'Vad kostar det?', a: 'Prissättning fastställs vid lansering. Tidiga användare prioriteras.' },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i + 1}`}
                  className="border-b border-border/6 last:border-0"
                >
                  <AccordionTrigger className="text-left font-light text-sm sm:text-[15px] hover:no-underline py-6 sm:py-7 text-foreground/80 hover:text-foreground transition-colors duration-300">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/60 font-light leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══ FOOTER — Apple-minimal ═══ */}
      <footer className="relative z-10 w-full">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 10%, hsl(0 0% 100% / 0.04) 50%, transparent 90%)' }} />
        <div className="max-w-5xl mx-auto px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground/25 font-light">
            <span className="tracking-[0.25em] uppercase text-foreground/30 text-[10px]">Valora</span>
            <div className="flex items-center gap-6">
              {['Kontakt', 'Integritet'].map((label) => (
                <a key={label} href="#" className="hover:text-foreground/50 transition-colors duration-300">{label}</a>
              ))}
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
