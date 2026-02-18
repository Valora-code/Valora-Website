import { useState, useEffect } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import AnimatedOrb from "@/components/AnimatedOrb";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SystemStatus } from "@/components/SystemStatus";
import { InteractiveCard } from "@/components/InteractiveCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { DataParticles } from "@/components/DataParticles";
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

// ── Tiny inline components ────────────────────────────────────────────────────

const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// Hero dashboard mockup — pure CSS, no images needed
const DashboardMockup = () => (
  <div className="relative w-full max-w-2xl mx-auto mt-16 mb-4">
    {/* Outer glow */}
    <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(172 50% 45%), transparent 70%)' }} />

    {/* Main card */}
    <div className="relative rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'hsl(220 14% 9% / 0.95)', backdropFilter: 'blur(24px)' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary pulse-soft" />
          <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-medium">Valora · Live</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(45 90% 60% / 0.6)' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">

        {/* Savings row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground tracking-wide uppercase mb-1">Identifierade besparingar</p>
            <p className="text-3xl font-serif font-medium text-primary">37 748 kr</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">vs. förra månaden</p>
            <p className="text-sm font-medium" style={{ color: 'hsl(142 60% 50%)' }}>+12.4% ↑</p>
          </div>
        </div>

        {/* Mini separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Loan rows */}
        {[
          { label: 'Bostadslån · Nordea', old: '3,42%', new: '2,89%', saving: '–4 200 kr/år', status: 'Förhandlat' },
          { label: 'Hemförsäkring · Länsförsäkringar', old: '2 890 kr', new: '1 940 kr', saving: '–950 kr/år', status: 'Avslutat' },
          { label: 'Privatlån · Swedbank', old: '8,9%', new: '6,1%', saving: '–2 300 kr/år', status: 'Väntar' },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between py-3 rounded-xl px-4" style={{ background: 'hsl(220 14% 12% / 0.6)' }}>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground/90 font-light truncate">{row.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{row.old} → <span className="text-primary">{row.new}</span></p>
            </div>
            <div className="text-right ml-4 flex-shrink-0">
              <p className="text-sm font-medium" style={{ color: 'hsl(142 60% 50%)' }}>{row.saving}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                row.status === 'Förhandlat' ? 'bg-primary/10 text-primary' :
                row.status === 'Avslutat' ? 'bg-white/5 text-muted-foreground' :
                'bg-yellow-500/10 text-yellow-400/80'
              }`}>{row.status}</span>
            </div>
          </div>
        ))}

        {/* CTA row */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-foreground">1 åtgärd kräver ditt godkännande</p>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-medium">
            Granska <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────

const Index = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spotsLeft] = useState(47);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = waitlistSchema.parse({ email, note });
      const { error } = await supabase.from('waitlist').insert([{ email: validatedData.email, note: validatedData.note || null }]);
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

      {/* ── Atmosphere ─────────────────────────────────── */}
      <div className="noise-overlay" />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[70vh]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(220 15% 12%) 0%, transparent 100%)' }} />
        <div className="absolute top-1/3 left-0 w-[40%] h-[60%]"
          style={{ background: 'radial-gradient(ellipse at 0% 50%, hsl(172 50% 45% / 0.04) 0%, transparent 60%)' }} />
        <div className="absolute top-1/4 right-0 w-[40%] h-[60%]"
          style={{ background: 'radial-gradient(ellipse at 100% 50%, hsl(200 40% 40% / 0.03) 0%, transparent 60%)' }} />
      </div>

      <AnimatedOrb />

      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="fixed inset-0 z-0">
        <DataParticles />
      </div>

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">

            <ValoraLogo size="small" />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {[['why','Varför Valora'],['how','Hur det fungerar'],['proof','Resultat'],['faq','FAQ']].map(([id, label]) => (
                <button key={id} onClick={() => scrollToSection(id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 tracking-wide">
                  {label}
                </button>
              ))}
              <Button variant="valora" size="sm" onClick={() => scrollToSection('waitlist')}
                className="cta-glow ml-2">
                Begär tillgång
              </Button>
            </div>

            {/* Mobile */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-border/20 pt-4">
              {[['why','Varför Valora'],['how','Hur det fungerar'],['proof','Resultat'],['faq','FAQ']].map(([id, label]) => (
                <button key={id} onClick={() => { scrollToSection(id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2.5 px-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {label}
                </button>
              ))}
              <div className="pt-3">
                <Button variant="valora" size="sm" className="w-full cta-glow"
                  onClick={() => { scrollToSection('waitlist'); setMobileMenuOpen(false); }}>
                  Begär tillgång
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-28 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8 fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-soft" />
            <span className="text-xs text-primary font-medium tracking-[0.15em] uppercase">Autonomt finansiellt system</span>
          </div>

          {/* Headline */}
          <h1 className="headline-hero fade-up mb-6">
            <span className="text-gradient-primary">Autonom</span>
            <br />
            <span className="text-foreground">personlig ekonomi.</span>
          </h1>

          {/* Subline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto fade-up-delay-1 mb-4 leading-relaxed font-light">
            Valora analyserar, förhandlar och förbättrar dina lån och försäkringar — inom dina regler. Du godkänner.
          </p>

          <p className="text-sm text-muted-foreground/60 fade-up-delay-2 mb-10">
            Anslut din ekonomi. Se vad du kan spara. Godkänn på 2 minuter.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-up-delay-3 mb-10">
            <MagneticButton strength={0.4}>
              <Button variant="valora" size="lg" onClick={() => scrollToSection('waitlist')} className="cta-glow min-w-[220px]">
                Begär tidig tillgång
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button variant="valoraGhost" size="lg" onClick={() => scrollToSection('how')} className="min-w-[180px] flex items-center gap-2">
                Så fungerar Valora <ArrowRightIcon />
              </Button>
            </MagneticButton>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 fade-up-delay-3 mb-2">
            {[
              { icon: <ShieldIcon />, label: 'Banksäker kryptering' },
              { icon: <LockIcon />, label: 'GDPR-compliant' },
              { icon: <ZapIcon />, label: 'Omedelbar analys' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground/70">
                <span className="text-primary/70">{icon}</span>
                <span className="text-xs tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          {/* Dashboard mockup */}
          <DashboardMockup />
        </div>
      </section>

      {/* ── Teal section divider ───────────────────────── */}
      <div className="relative h-px w-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent separator-sweep" />
      </div>

      {/* ── Problem / Stats ────────────────────────────── */}
      <section id="why" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">

          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <p className="caption text-primary">Problemet</p>
              <h2 className="headline-section">
                Inte brist på besparingar.<br />Brist på ork att agera.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                I tester och enkätdata framträder samma mönster: människor vet vad de borde göra — men skjuter upp det.
                Inte av okunskap, utan av mental belastning.
              </p>
            </div>
          </ScrollReveal>

          {/* Stat cards — horizontal layout with icons */}
          <div className="space-y-4">
            {[
              { stat: 88, suffix: '%', text: 'har skjutit upp att byta lån eller försäkring — trots att de vet att de borde.', icon: '⏳' },
              { stat: 79, suffix: '%', text: 'känner ibland eller ofta dåligt samvete över att inte ta tag i sin ekonomi.', icon: '😔' },
              { stat: 56, suffix: '%', text: 'upplever hög mental belastning när de tänker på lån, försäkringar och ekonomi.', icon: '🧠' },
            ].map(({ stat, suffix, text, icon }, i) => (
              <ScrollReveal key={stat} delay={i * 100}>
                <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-2xl group chromatic-hover">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                      <span className="text-2xl">{icon}</span>
                      <div className="flex items-end gap-0">
                        <CountUpNumber end={stat} suffix={suffix}
                          className="text-5xl sm:text-6xl font-serif font-medium tracking-tighter text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 sm:border-l sm:border-border/40 sm:pl-6">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Pull quote */}
          <ScrollReveal delay={400}>
            <div className="max-w-2xl mx-auto">
              <InteractiveCard className="liquid-glass p-8 sm:p-10 rounded-2xl border-l-2 border-primary/40 group chromatic-hover">
                <div className="flex gap-4">
                  <span className="text-4xl text-primary/30 font-serif leading-none mt-1">"</span>
                  <div>
                    <p className="text-lg sm:text-xl font-light italic leading-relaxed mb-4 text-foreground/90">
                      Jag har vetat i två år att jag borde göra detta – men jag orkade inte.
                    </p>
                    <p className="text-muted-foreground text-sm tracking-wide">— kvinna, 63 år · testanvändare</p>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* System Status */}
      <ScrollReveal delay={100}>
        <SystemStatus />
      </ScrollReveal>

      <div className="relative h-px w-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent separator-sweep" />
      </div>

      {/* ── How it works ───────────────────────────────── */}
      <section id="how" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 bg-background-elevated relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-20">

          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary">Processen</p>
              <h2 className="headline-section">Så fungerar Valora</h2>
            </div>
          </ScrollReveal>

          {/* Steps — richer cards */}
          <div className="space-y-6">
            {[
              {
                num: '01',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                ),
                title: 'Koppla din ekonomi',
                desc: 'Du ansluter banker, lån och försäkringar via säker Open Banking. Anger dina villkor och preferenser — Valora lär sig din ekonomi.',
                chips: ['Open Banking', 'BankID', 'Krypterat'],
              },
              {
                num: '02',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
                title: 'Valora analyserar och förhandlar',
                desc: 'Systemet bevakar marknaden kontinuerligt, identifierar förbättringar och förhandlar direkt med banker och försäkringsbolag åt dig.',
                chips: ['AI-driven', 'Realtid', 'Automatiskt'],
              },
              {
                num: '03',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Du godkänner. Valora verkställer.',
                desc: 'Du får ett godkännande att trycka på. Resten sker automatiskt i bakgrunden — utan pappersarbete, utan telefonköer.',
                chips: ['Ett klick', 'Du bestämmer', 'Inga överraskningar'],
              },
            ].map(({ num, icon, title, desc, chips }, i) => (
              <ScrollReveal key={num} delay={i * 100}>
                <InteractiveCard className="liquid-glass p-6 sm:p-8 rounded-2xl group chromatic-hover">
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">

                    {/* Step number */}
                    <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
                      <span className="text-4xl font-serif font-medium text-primary/30 stat-breathe tabular-nums" style={{ animationDelay: `${i * 0.5}s` }}>{num}</span>
                      <div className="p-2 rounded-lg bg-primary/8 text-primary">{icon}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className="headline-card">{title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">{desc}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {chips.map(chip => (
                          <span key={chip} className="text-xs px-3 py-1 rounded-full border border-primary/15 text-primary/70 bg-primary/5">
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px w-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent separator-sweep" />
      </div>

      {/* ── Proof / Testimonials ───────────────────────── */}
      <section id="proof" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">

          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary">Verifierade resultat</p>
              <h2 className="headline-section">
                Verklig besparing.<br />Verklig lättnad.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                initials: 'AK',
                name: 'privatperson, 63 år',
                saving: '17 000 kr / år',
                quote: 'Jag hade aldrig gjort detta själv. Nu slipper jag tänka.',
                items: ['Bostadslån optimerat', 'Hemförsäkring bytt'],
              },
              {
                initials: 'ML',
                name: 'privatperson, 33 år',
                saving: '15 000 kr / år',
                quote: 'Jag betalar hellre än att behöva bära detta i huvudet.',
                items: ['Privatlån omförhandlat', 'Bilförsäkring optimerad'],
              },
            ].map(({ initials, name, saving, quote, items }, i) => (
              <ScrollReveal key={initials} delay={i * 100}>
                <InteractiveCard className="liquid-glass p-7 sm:p-8 rounded-2xl group chromatic-hover h-full flex flex-col">

                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm text-foreground/80 font-light">{name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-3 h-3 rounded-full bg-primary/30 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          </span>
                          <span className="text-xs text-primary/70">Verifierad</span>
                        </div>
                      </div>
                    </div>

                    {/* Saving badge */}
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-0.5">Besparing</p>
                      <p className="text-xl font-serif font-medium text-primary">{saving}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-sm sm:text-base text-foreground/80 italic font-light leading-relaxed mb-5 flex-1">
                    "{quote}"
                  </p>

                  {/* What was done */}
                  <div className="space-y-2 pt-4 border-t border-border/30">
                    {items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-primary"><CheckIcon /></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Big quote */}
          <ScrollReveal delay={300}>
            <InteractiveCard className="liquid-glass p-8 sm:p-12 rounded-2xl max-w-2xl mx-auto text-center group chromatic-hover">
              <div className="text-3xl text-primary/20 font-serif mb-3">"</div>
              <p className="text-lg sm:text-xl font-light italic text-foreground/90 leading-relaxed">
                Tidigare gav ekonomi mig konstant ångest. Nu känns det mycket enklare.
              </p>
              <div className="text-3xl text-primary/20 font-serif mt-3 rotate-180">"</div>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Target Audience ────────────────────────────── */}
      <section className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 bg-background-elevated border-t border-border/30 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">

          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary">Målgrupp</p>
              <h2 className="headline-section">För vem är Valora?</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Den upptagna yrkespersonen',
                desc: 'Du har inte tid att förhandla, jämföra och bevaka. Valora gör det åt dig — kontinuerligt.',
                tag: 'Sparar tid',
              },
              {
                icon: '🏡',
                title: 'Familjen med komplex ekonomi',
                desc: 'Flera lån och försäkringar. Valora håller allt optimerat automatiskt i bakgrunden.',
                tag: 'Sparar pengar',
              },
              {
                icon: '🧘',
                title: 'Den som vill ha kontroll',
                desc: 'Du vill göra rätt – men slippa bära ansvaret mentalt. Valora tar över det kognitiva arbetet.',
                tag: 'Minskar stress',
              },
            ].map(({ icon, title, desc, tag }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <InteractiveCard className="surface-elevated p-7 sm:p-8 rounded-2xl group chromatic-hover h-full flex flex-col">
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="headline-card mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">{desc}</p>
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary/8 text-primary/80 border border-primary/15">{tag}</span>
                  </div>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px w-full z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent separator-sweep" />
      </div>

      {/* ── Waitlist ───────────────────────────────────── */}
      <section id="waitlist" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 relative z-10">
        <div className="max-w-xl mx-auto space-y-12">

          <ScrollReveal>
            <div className="text-center space-y-4">

              {/* Spots urgency */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-soft" />
                <span className="text-xs text-primary font-medium tracking-[0.12em] uppercase">
                  {spotsLeft} platser kvar av 200
                </span>
              </div>

              <p className="caption text-primary">Begränsad tidig tillgång</p>
              <h2 className="headline-section">Begär tidig tillgång</h2>
              <p className="text-base text-muted-foreground font-light">
                Vi öppnar Valora successivt för ett begränsat antal användare.
              </p>

              {/* Progress bar */}
              <div className="relative h-1 w-full max-w-xs mx-auto bg-muted/30 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${((200 - spotsLeft) / 200) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">
                {200 - spotsLeft} av 200 platser reserverade
              </p>
            </div>
          </ScrollReveal>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="liquid-glass p-7 sm:p-10 rounded-2xl space-y-6">

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-light tracking-wide text-muted-foreground">
                  E-post *
                </label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="bg-background-surface border-border/60 focus:border-primary/50 transition-colors"
                  placeholder="din@email.se" />
              </div>

              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-light tracking-wide text-muted-foreground">
                  Vad vill du att Valora ska optimera? <span className="text-muted-foreground/50">(valfritt)</span>
                </label>
                <Textarea id="note" value={note} onChange={e => setNote(e.target.value)}
                  className="bg-background-surface border-border/60 min-h-24 focus:border-primary/50 transition-colors resize-none"
                  placeholder="Bostadslån, privatlån, bilförsäkring, hemförsäkring…" />
              </div>

              <Button type="submit" variant="valora" className="w-full cta-glow" size="lg">
                Reservera min plats
              </Button>

              {/* Form trust footer */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                  <LockIcon />
                  <span className="text-xs">Ingen spam</span>
                </div>
                <span className="text-muted-foreground/30 text-xs">·</span>
                <div className="flex items-center gap-1.5 text-muted-foreground/50">
                  <ShieldIcon />
                  <span className="text-xs">GDPR-compliant</span>
                </div>
                <span className="text-muted-foreground/30 text-xs">·</span>
                <span className="text-xs text-muted-foreground/50">Avregistrera när som helst</span>
              </div>
            </form>
          ) : (
            <div className="liquid-glass p-10 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                <CheckIcon />
              </div>
              <p className="text-xl font-light">Du är nu registrerad.</p>
              <p className="text-sm text-muted-foreground font-light">
                Vi meddelar dig när din plats aktiveras.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section id="faq" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-8 border-t border-border/30 bg-background-elevated relative z-10">
        <div className="max-w-3xl mx-auto space-y-16">

          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="caption text-primary">Frågor & svar</p>
              <h2 className="headline-section">Vanliga frågor</h2>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: 'Är Valora en bank?', a: 'Nej. Valora är ett autonomt finansiellt system som optimerar din ekonomi ovanpå banker och försäkringsbolag. Vi är inte en bank och vi hanterar aldrig dina pengar direkt.' },
              { q: 'Behöver jag byta bank?', a: 'Nej – och ibland, ja. Du behöver aldrig byta bank för att använda Valora. Om Valora identifierar ett förbättringsförslag som kräver ett faktiskt byte av långivare, sker det först efter att du uttryckligen godkänt det. Inget sker utan ditt samtycke.' },
              { q: 'Är det säkert?', a: 'Ja. All åtkomst sker med samtycke och enligt bankstandard (PSD2 / Open Banking). Vi använder samma krypteringsstandarder som banker och lagrar inga lösenord.' },
              { q: 'Vad kostar det?', a: 'Prissättning fastställs vid lansering. Tidiga användare prioriteras och kommer att erbjudas förmånliga villkor.' },
            ].map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="liquid-glass px-6 sm:px-8 rounded-2xl border-none">
                <AccordionTrigger className="text-left font-light text-base sm:text-lg hover:no-underline py-5">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed pb-5">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border/30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <ValoraLogo size="small" />
              <p className="text-muted-foreground/60 text-sm font-light mt-1">Autonomt finansiellt system</p>
              <p className="text-muted-foreground/40 text-xs mt-1">Stockholm, Sverige</p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              {['Kontakt','Integritetspolicy','LinkedIn'].map(link => (
                <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 font-light">
                  {link}
                </a>
              ))}
            </nav>

            {/* Legal */}
            <div className="flex flex-col items-center md:items-end gap-1 text-xs text-muted-foreground/40 font-light">
              <span>© {new Date().getFullYear()} Valora</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-muted-foreground/60 transition-colors">Privacy</a>
                <a href="#" className="hover:text-muted-foreground/60 transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
