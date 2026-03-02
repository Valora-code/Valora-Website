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
      <AtmosphericBackground />

      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 pt-4 sm:pt-5">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl nav-glass">
            <ValoraLogo size="small" />
            <div className="hidden md:flex items-center gap-8">
              {[
                ['problem', 'Problem'],
                ['how', 'Process'],
                ['proof', 'Results'],
                ['faq', 'FAQ'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-[13px] text-muted-foreground/60 hover:text-foreground/90 transition-colors duration-300 tracking-[-0.01em]"
                >
                  {label}
                </button>
              ))}
              <Button
                variant="valora"
                size="sm"
                onClick={() => scrollToSection('waitlist')}
                className="text-[12px] h-8 px-5 rounded-lg"
              >
                Tidig access
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
              {[['problem','Problemet'],['how','Process'],['proof','Resultat'],['faq','FAQ']].map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg">
                  {label}
                </button>
              ))}
              <div className="pt-1.5 px-1">
                <Button variant="valora" size="sm" className="w-full" onClick={() => { scrollToSection('waitlist'); setMobileMenuOpen(false); }}>
                  Tidig access
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO — Split layout: editorial left, product viz right
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center px-5 sm:px-8">
        <div className="max-w-[1120px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center pt-28 sm:pt-32 lg:pt-0">
          
          {/* Left — Editorial copy */}
          <div className="space-y-8 sm:space-y-10 max-w-xl">
            {/* Status badge */}
            <div className="fade-up">
              <span
                className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.18em] uppercase px-4 py-2 rounded-full"
                style={{
                  background: 'hsl(0 0% 100% / 0.03)',
                  border: '1px solid hsl(0 0% 100% / 0.06)',
                  color: 'hsl(0 0% 50%)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 machine-pulse" />
                Nu i tidig access
              </span>
            </div>

            {/* Headline */}
            <div className="fade-up-delay-1 space-y-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
                Autonom
                <br />
                personlig finans.
              </h1>
              <p className="text-[15px] sm:text-base text-muted-foreground/55 leading-[1.7] max-w-[38ch] tracking-[-0.01em]">
                Valora analyserar, jämför, optimerar och genomför — lån och försäkringar, automatiskt.
              </p>
            </div>

            {/* CTA — glass capsule */}
            <div className="fade-up-delay-2 max-w-[420px]">
              {!submitted ? (
                <div className="space-y-3">
                  <SpotlightCard variant="elevated">
                    <form onSubmit={handleSubmit} className="p-1.5">
                      <div className="flex items-center gap-1.5">
                        <Input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/25 h-11 px-4 rounded-xl tracking-[-0.01em]"
                          placeholder="din@email.se"
                        />
                        <Button type="submit" variant="valora" className="rounded-xl h-9 px-5 text-[12px] font-medium shrink-0 cta-glow">
                          Begär access
                        </Button>
                      </div>
                    </form>
                  </SpotlightCard>
                  <Textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    className="bg-transparent border border-border/8 focus-visible:ring-primary/15 min-h-[48px] text-sm placeholder:text-muted-foreground/18 resize-none rounded-xl input-glow tracking-[-0.01em]"
                    placeholder="Valfritt: Vad vill du optimera?"
                  />
                </div>
              ) : (
                <SpotlightCard variant="elevated">
                  <div className="p-8 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary/8 border border-primary/12 flex items-center justify-center mx-auto">
                      <svg className="w-4.5 h-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-foreground text-base font-medium">Registrerad.</p>
                    <p className="text-muted-foreground/50 text-xs">Du får tidig access vid lansering.</p>
                  </div>
                </SpotlightCard>
              )}
            </div>

            {/* Trust strip */}
            <div className="fade-up-delay-3 flex items-center gap-6 text-[10px] text-muted-foreground/25 tracking-[0.15em] uppercase">
              <span>BankID</span>
              <span className="w-px h-3 bg-border/10" />
              <span>PSD2</span>
              <span className="w-px h-3 bg-border/10" />
              <span>Licensierade partners</span>
            </div>
          </div>

          {/* Right — Product visualization (abstract glass UI) */}
          <div className="fade-up-delay-2 relative hidden lg:block">
            <div className="relative">
              {/* Ambient glow behind visualization */}
              <div className="absolute -inset-16 pointer-events-none">
                <div className="w-full h-full rounded-full" style={{
                  background: 'radial-gradient(ellipse 70% 60% at 50% 45%, hsl(172 42% 40% / 0.1) 0%, transparent 65%)',
                  filter: 'blur(60px)',
                }} />
              </div>
              
              {/* Main product card */}
              <SpotlightCard variant="elevated">
                <div className="p-8 space-y-6">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground/30 tracking-[0.15em] uppercase">Portfolio</p>
                      <p className="text-2xl font-medium text-foreground tracking-[-0.02em] tabular-nums">847 200 kr</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary/60 text-xs">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                      <span className="tabular-nums">Optimerad</span>
                    </div>
                  </div>
                  
                  {/* Metric rows */}
                  <div className="space-y-0">
                    {[
                      { label: 'Bolån', value: '1.89%', status: 'Optimalt' },
                      { label: 'Hemförsäkring', value: '189 kr/mån', status: 'Byte möjligt' },
                      { label: 'Bilförsäkring', value: '312 kr/mån', status: 'Optimalt' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-4" style={{
                        borderTop: i > 0 ? '1px solid hsl(0 0% 100% / 0.04)' : 'none',
                      }}>
                        <span className="text-sm text-muted-foreground/50 tracking-[-0.01em]">{row.label}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-foreground/80 tabular-nums tracking-[-0.01em]">{row.value}</span>
                          <span className={`text-[10px] tracking-[0.05em] px-2 py-0.5 rounded-md ${
                            row.status === 'Optimalt' 
                              ? 'text-primary/50 bg-primary/5' 
                              : 'text-muted-foreground/40 bg-muted/20'
                          }`}>
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom summary */}
                  <div className="pt-2" style={{ borderTop: '1px solid hsl(0 0% 100% / 0.04)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground/30">Potentiell besparing</span>
                      <span className="text-primary/70 text-sm font-medium tabular-nums tracking-[-0.01em]">+17 400 kr/år</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              
              {/* Floating secondary card */}
              <div className="absolute -bottom-8 -left-6 w-52">
                <SpotlightCard>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <span className="text-[11px] text-foreground/60">Automatisk analys</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/30 leading-relaxed">3 optimeringar identifierade</p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE PROBLEM — Behavioral framing
      ═══════════════════════════════════════════════════════════ */}
      <section id="problem" className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-[1120px] mx-auto">
          <ScrollReveal>
            <div className="max-w-[52ch] space-y-5">
              <p className="text-[10px] text-primary/40 tracking-[0.2em] uppercase font-medium">Problemet</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Människor vet vad de borde göra.
                <br />
                <span className="text-foreground/35">De gör det bara inte.</span>
              </h2>
              <p className="text-[15px] text-muted-foreground/45 leading-[1.7] max-w-[44ch] tracking-[-0.01em]">
                Inte av okunskap — av mental belastning. Att jämföra, förhandla och byta kräver tid och energi som de flesta inte har.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={150}>
            <div className="mt-20 sm:mt-28">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                {[
                  { num: 88, label: 'har skjutit upp byte av lån eller försäkring' },
                  { num: 79, label: 'känner dåligt samvete kring sin ekonomi' },
                  { num: 56, label: 'upplever hög mental belastning' },
                ].map((stat, i) => (
                  <div key={i} className="py-8 sm:py-0 sm:pr-12 lg:pr-16" style={{
                    borderTop: i > 0 ? '1px solid hsl(0 0% 100% / 0.04)' : 'none',
                    ...(i > 0 ? { borderTopWidth: '1px' } : {}),
                  }}>
                    <div className="hidden sm:block" style={{
                      borderLeft: i > 0 ? '1px solid hsl(0 0% 100% / 0.04)' : 'none',
                      paddingLeft: i > 0 ? '3rem' : '0',
                    }}>
                      <CountUpNumber
                        end={stat.num}
                        suffix="%"
                        className="text-4xl sm:text-5xl font-medium tracking-[-0.03em] text-foreground tabular-nums"
                      />
                      <p className="text-[13px] text-muted-foreground/35 mt-3 leading-[1.6] max-w-[22ch] tracking-[-0.01em]">
                        {stat.label}
                      </p>
                    </div>
                    <div className="sm:hidden">
                      <CountUpNumber
                        end={stat.num}
                        suffix="%"
                        className="text-4xl font-medium tracking-[-0.03em] text-foreground tabular-nums"
                      />
                      <p className="text-[13px] text-muted-foreground/35 mt-3 leading-[1.6] tracking-[-0.01em]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quote */}
          <ScrollReveal delay={250}>
            <div className="mt-20 sm:mt-28 max-w-[38ch]">
              <p className="text-lg sm:text-xl text-foreground/30 leading-[1.6] tracking-[-0.015em]">
                "Jag har vetat i två år att jag borde göra det här. Jag orkade inte."
              </p>
              <p className="text-muted-foreground/20 text-[11px] mt-5 tracking-[0.1em] uppercase">— Kvinna, 63</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE SHIFT — From manual to autonomous
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-[1120px] mx-auto">
          <ScrollReveal>
            <div className="max-w-[52ch] mx-auto text-center space-y-5">
              <p className="text-[10px] text-primary/40 tracking-[0.2em] uppercase font-medium">Skiftet</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Från manuellt
                <br />
                <span className="text-foreground/35">till autonomt.</span>
              </h2>
              <p className="text-[15px] text-muted-foreground/45 leading-[1.7] max-w-[42ch] mx-auto tracking-[-0.01em]">
                Valora tar bort friktionen. Du anger villkoren — systemet bevakar, analyserar och agerar.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-20 sm:mt-28 grid grid-cols-1 sm:grid-cols-2 gap-px max-w-2xl mx-auto" style={{ background: 'hsl(0 0% 100% / 0.04)' }}>
              {[
                { before: 'Jämföra räntor manuellt', after: 'Automatisk bevakning' },
                { before: 'Ring försäkringsbolag', after: 'Ett klick för att byta' },
                { before: 'Oro och uppskjutning', after: 'Lugn och kontroll' },
                { before: 'Timmar av research', after: 'Kontinuerlig optimering' },
              ].map((item, i) => (
                <div key={i} className="bg-background p-6 sm:p-8">
                  <p className="text-[13px] text-muted-foreground/25 line-through decoration-muted-foreground/10 tracking-[-0.01em]">{item.before}</p>
                  <p className="text-[14px] text-foreground/70 mt-2 tracking-[-0.01em]">{item.after}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — 3-step flow
      ═══════════════════════════════════════════════════════════ */}
      <section id="how" className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-[1120px] mx-auto">
          <ScrollReveal>
            <div className="space-y-5">
              <p className="text-[10px] text-primary/40 tracking-[0.2em] uppercase font-medium">Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Tre steg. Ingen friktion.
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { num: '01', title: 'Anslut', desc: 'Koppla dina banker, lån och försäkringar. Ange dina villkor och preferenser.' },
              { num: '02', title: 'Analys', desc: 'Valora bevakar marknaden och identifierar förbättringar kontinuerligt i bakgrunden.' },
              { num: '03', title: 'Godkänn', desc: 'Ett klick. Resten sker automatiskt. Du behåller full kontroll.' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={(i + 1) * 100}>
                <SpotlightCard className="h-full">
                  <div className="p-7 sm:p-8 flex flex-col min-h-[220px]">
                    <span className="text-[11px] text-primary/30 tracking-[0.15em] uppercase font-medium">
                      Steg {item.num}
                    </span>
                    <div className="mt-auto space-y-3">
                      <h3 className="text-lg font-medium text-foreground tracking-[-0.02em]">{item.title}</h3>
                      <p className="text-[13px] text-muted-foreground/40 leading-[1.7] tracking-[-0.01em]">{item.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST & CONTROL
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-[1120px] mx-auto">
          <ScrollReveal>
            <div className="max-w-[52ch] space-y-5">
              <p className="text-[10px] text-primary/40 tracking-[0.2em] uppercase font-medium">Trygghet</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Du behåller kontrollen.
                <br />
                <span className="text-foreground/35">Alltid.</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {[
                { icon: '🔐', title: 'BankID-verifierad', desc: 'Alla åtgärder kräver ditt aktiva samtycke via BankID.' },
                { icon: '🛡', title: 'Licensierade partners', desc: 'Valora samarbetar enbart med reglerade aktörer.' },
                { icon: '⚙', title: 'Full transparens', desc: 'Du ser exakt vad som händer, varje steg i processen.' },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={(i + 1) * 80}>
                  <div className="space-y-4 p-1">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className="text-[15px] font-medium text-foreground/85 tracking-[-0.015em]">{item.title}</h3>
                    <p className="text-[13px] text-muted-foreground/35 leading-[1.7] tracking-[-0.01em]">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROOF — Verified results
      ═══════════════════════════════════════════════════════════ */}
      <section id="proof" className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-[1120px] mx-auto">
          <ScrollReveal>
            <div className="space-y-5">
              <p className="text-[10px] text-primary/40 tracking-[0.2em] uppercase font-medium">Resultat</p>
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Verifierad besparing.
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { person: 'Privatperson, 63 år', amount: '17 000 kr', period: '/år', quote: '"Jag hade aldrig gjort detta själv. Nu slipper jag tänka på det."' },
              { person: 'Privatperson, 33 år', amount: '15 000 kr', period: '/år', quote: '"Jag betalar hellre för lugnet än att bära det i huvudet."' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={(i + 1) * 120}>
                <SpotlightCard className="h-full">
                  <div className="p-7 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/30 tracking-[0.05em]">{item.person}</span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-primary/40 tracking-[0.05em]">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        Verifierat
                      </span>
                    </div>
                    <div>
                      <span className="text-3xl sm:text-4xl font-medium text-foreground tabular-nums tracking-[-0.02em]">{item.amount}</span>
                      <span className="text-muted-foreground/25 text-xs ml-1.5">{item.period}</span>
                    </div>
                    <div style={{ borderTop: '1px solid hsl(0 0% 100% / 0.04)' }} className="pt-5">
                      <p className="text-[13px] text-muted-foreground/35 leading-[1.7] tracking-[-0.01em]">
                        {item.quote}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          EMOTIONAL OUTCOME
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-[1120px] mx-auto">
          <ScrollReveal>
            <div className="max-w-[48ch] mx-auto text-center space-y-5">
              <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Lugnet av att veta
                <br />
                <span className="text-foreground/35">att allt är optimerat.</span>
              </h2>
              <p className="text-[15px] text-muted-foreground/40 leading-[1.7] max-w-[40ch] mx-auto tracking-[-0.01em]">
                Tidigare: ångest, uppskjutning, dåligt samvete. Nu: kontroll utan ansträngning.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WAITLIST CTA — Minimal, strong
      ═══════════════════════════════════════════════════════════ */}
      <section id="waitlist" className="relative z-10 py-36 sm:py-44 lg:py-52 px-5 sm:px-8">
        <ScrollReveal>
          <div className="max-w-sm mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-[1.1] tracking-[-0.03em]">
                Tidig access.
              </h2>
              <p className="text-[13px] text-muted-foreground/35 leading-[1.7] tracking-[-0.01em]">
                Bli bland de första att automatisera din ekonomi.
              </p>
            </div>

            {!submitted ? (
              <div className="space-y-3">
                <SpotlightCard variant="elevated">
                  <form onSubmit={handleSubmit} className="p-1.5">
                    <div className="flex items-center gap-1.5">
                      <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/20 h-11 px-4 rounded-xl tracking-[-0.01em]"
                        placeholder="din@email.se"
                      />
                      <Button type="submit" variant="valora" className="rounded-xl h-9 px-5 text-[12px] font-medium shrink-0 cta-glow">
                        Begär access
                      </Button>
                    </div>
                  </form>
                </SpotlightCard>
              </div>
            ) : (
              <SpotlightCard variant="elevated">
                <div className="p-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-primary/8 border border-primary/12 flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <p className="text-foreground text-base font-medium">Registrerad.</p>
                  <p className="text-muted-foreground/50 text-xs">Du får tidig access vid lansering.</p>
                </div>
              </SpotlightCard>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground/20">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/25 machine-pulse" />
              <span>
                <CountUpNumber end={247} className="text-foreground/25 tabular-nums" duration={1500} /> väntar
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-36 sm:py-44 lg:py-52 px-5 sm:px-8 relative z-10">
        <div className="max-w-xl mx-auto">
          <ScrollReveal>
            <div className="space-y-5 mb-16 sm:mb-20">
              <p className="text-[10px] text-primary/40 tracking-[0.2em] uppercase font-medium">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground">
                Vanliga frågor
              </h2>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-0">
            {[
              { q: 'Är Valora en bank?', a: 'Nej. Valora är ett autonomt system som optimerar din ekonomi ovanpå befintliga banker och försäkringsbolag.' },
              { q: 'Behöver jag byta bank?', a: 'Nej. Systemet analyserar och optimerar ovanpå dina befintliga aktörer. Om ett byte rekommenderas sker det först efter ditt godkännande.' },
              { q: 'Är det säkert?', a: 'Ja. All åtkomst sker med samtycke och enligt bankstandard via BankID.' },
              { q: 'Vad kostar det?', a: 'Prissättning fastställs vid lansering. Tidiga användare prioriteras.' },
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i + 1}`}
                className="border-b-0"
                style={{ borderBottom: '1px solid hsl(0 0% 100% / 0.04)' }}
              >
                <AccordionTrigger className="text-left text-[14px] sm:text-[15px] hover:no-underline py-6 sm:py-7 text-foreground/65 hover:text-foreground/90 transition-colors duration-300 tracking-[-0.01em]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-muted-foreground/35 leading-[1.7] pb-6 tracking-[-0.01em]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 w-full">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 15%, hsl(0 0% 100% / 0.04) 50%, transparent 85%)' }} />
        <div className="max-w-[1120px] mx-auto px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground/18">
            <span className="tracking-[0.25em] uppercase text-foreground/20 text-[10px]">Valora</span>
            <div className="flex items-center gap-6">
              {['Kontakt', 'Integritet'].map((label) => (
                <a key={label} href="#" className="hover:text-foreground/35 transition-colors duration-300">{label}</a>
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
