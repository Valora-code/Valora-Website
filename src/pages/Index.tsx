import { useState } from "react";
import { ValoraLogo } from "@/components/ValoraLogo";
import { CountUpNumber } from "@/components/CountUpNumber";
import { SystemStatus } from "@/components/SystemStatus";
import { InteractiveCard } from "@/components/InteractiveCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulated API call - replace with actual endpoint
    try {
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, note })
      // });
      
      setSubmitted(true);
      toast({
        title: "Tack",
        description: "Du är nu registrerad för tidig access.",
      });
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Försök igen senare.",
        variant: "destructive",
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Depth layer - distant background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-elevated to-background opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
      </div>

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <ValoraLogo size="small" />
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('why')}
                className="text-sm font-light text-secondary hover:text-foreground transition-colors tracking-wide"
              >
                VARFÖR VALORA
              </button>
              <button 
                onClick={() => scrollToSection('how')}
                className="text-sm font-light text-secondary hover:text-foreground transition-colors tracking-wide"
              >
                HUR DET FUNGERAR
              </button>
              <button 
                onClick={() => scrollToSection('proof')}
                className="text-sm font-light text-secondary hover:text-foreground transition-colors tracking-wide"
              >
                BEVIS
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-sm font-light text-secondary hover:text-foreground transition-colors tracking-wide"
              >
                VANLIGA FRÅGOR
              </button>
              <Button 
                variant="glass" 
                size="sm"
                onClick={() => scrollToSection('waitlist')}
              >
                Gå med i väntelistan
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="fade-in-up system-glow">
            <ValoraLogo size="large" />
          </div>
          
          <div className="space-y-6 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-[1.1]">
              Autopiloten för din privatekonomi.
            </h1>
            
            <p className="text-lg md:text-xl text-secondary font-light leading-relaxed max-w-3xl mx-auto">
              Ett autonomt finansiellt system som analyserar, förhandlar och förbättrar 
              dina lån och försäkringar – inom dina egna regler.
            </p>
          </div>
          
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3 slide-in-left" style={{ animationDelay: '0.5s' }}>
              <div className="w-1 h-1 rounded-full bg-foreground mt-2.5" />
              <p className="text-secondary font-light">Automatisk optimering utan manuellt arbete</p>
            </div>
            <div className="flex items-start gap-3 slide-in-left" style={{ animationDelay: '0.7s' }}>
              <div className="w-1 h-1 rounded-full bg-foreground mt-2.5" />
              <p className="text-secondary font-light">Allt styrs av dina policyer och samtycke</p>
            </div>
            <div className="flex items-start gap-3 slide-in-left" style={{ animationDelay: '0.9s' }}>
              <div className="w-1 h-1 rounded-full bg-foreground mt-2.5" />
              <p className="text-secondary font-light">Minskar både kostnad och mental belastning</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 fade-in-up" style={{ animationDelay: '1.1s' }}>
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => scrollToSection('waitlist')}
              className="system-glow"
            >
              Begär tidig access
            </Button>
            <button 
              onClick={() => scrollToSection('how')}
              className="text-secondary hover:text-foreground transition-colors text-sm tracking-wide"
            >
              Så fungerar Valora →
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section - Diagnostic Panel */}
      <section id="why" className="py-32 px-6 border-t border-border relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
              Problemet är inte information. Det är mänskligt beteende.
            </h2>
            <p className="text-lg text-secondary font-light leading-relaxed">
              I tester och enkätdata framträder ett tydligt mönster: människor vet vad de borde göra – 
              men skjuter upp det.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <InteractiveCard className="diagnostic-row liquid-glass p-8 rounded-xl">
              <div className="grid grid-cols-[120px_1fr] gap-8 items-center">
                <CountUpNumber 
                  end={88} 
                  suffix=" %" 
                  className="text-6xl font-extralight tracking-tighter text-foreground"
                />
                <p className="text-secondary font-light leading-relaxed">
                  har någon gång skjutit upp att byta lån eller försäkring trots att de vet att de borde.
                </p>
              </div>
            </InteractiveCard>
            
            <InteractiveCard className="diagnostic-row liquid-glass p-8 rounded-xl">
              <div className="grid grid-cols-[120px_1fr] gap-8 items-center">
                <CountUpNumber 
                  end={79} 
                  suffix=" %" 
                  className="text-6xl font-extralight tracking-tighter text-foreground"
                />
                <p className="text-secondary font-light leading-relaxed">
                  känner ibland eller ofta dåligt samvete över att inte ta tag i sin ekonomi.
                </p>
              </div>
            </InteractiveCard>
            
            <InteractiveCard className="diagnostic-row liquid-glass p-8 rounded-xl">
              <div className="grid grid-cols-[120px_1fr] gap-8 items-center">
                <CountUpNumber 
                  end={56} 
                  suffix=" %" 
                  className="text-6xl font-extralight tracking-tighter text-foreground"
                />
                <p className="text-secondary font-light leading-relaxed">
                  upplever hög mental belastning när de tänker på lån, försäkringar och ekonomi.
                </p>
              </div>
            </InteractiveCard>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <InteractiveCard className="liquid-glass p-10 rounded-xl border-l-2 border-foreground/20 system-glow">
              <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-4">
                "Jag har vetat i två år att jag borde göra detta – men jag orkade inte."
              </p>
              <p className="text-secondary text-sm tracking-wide">– Christina, 63</p>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* System Status Section */}
      <SystemStatus />

      {/* How It Works */}
      <section id="how" className="py-32 px-6 border-t border-border bg-background-elevated relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center">
            Så fungerar Valora
          </h2>
          
          <div className="space-y-16">
            <div className="grid md:grid-cols-[100px_1fr] gap-8 items-start">
              <div className="text-5xl font-extralight text-secondary">01</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-light tracking-tight">Koppla din ekonomi</h3>
                <p className="text-secondary font-light leading-relaxed">
                  Du kopplar banker och försäkringar och definierar dina regler.
                </p>
              </div>
            </div>
            
            <div className="h-px bg-border" />
            
            <div className="grid md:grid-cols-[100px_1fr] gap-8 items-start">
              <div className="text-5xl font-extralight text-secondary">02</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-light tracking-tight">Valora analyserar och förhandlar</h3>
                <p className="text-secondary font-light leading-relaxed">
                  Systemet jämför marknaden och identifierar förbättringar kontinuerligt.
                </p>
              </div>
            </div>
            
            <div className="h-px bg-border" />
            
            <div className="grid md:grid-cols-[100px_1fr] gap-8 items-start">
              <div className="text-5xl font-extralight text-secondary">03</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-light tracking-tight">Du godkänner – Valora verkställer</h3>
                <p className="text-secondary font-light leading-relaxed">
                  Du godkänner med ett tryck. Valora sköter resten i bakgrunden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="py-32 px-6 border-t border-border relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center">
            Verifierad besparing och mental lättnad
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <InteractiveCard className="liquid-glass p-8 rounded-xl space-y-4">
              <div className="text-3xl font-light">Christina</div>
              <div className="text-4xl font-extralight text-secondary">ca 17 000 kr/år</div>
              <p className="text-secondary font-light italic pt-4">
                "Jag hade aldrig gjort detta själv."
              </p>
            </InteractiveCard>
            
            <InteractiveCard className="liquid-glass p-8 rounded-xl space-y-4">
              <div className="text-3xl font-light">Ninni</div>
              <div className="text-4xl font-extralight text-secondary">ca 15 000 kr/år</div>
              <p className="text-secondary font-light italic pt-4">
                "Jag betalar hellre än att behöva tänka på det."
              </p>
            </InteractiveCard>
          </div>
          
          <InteractiveCard className="liquid-glass p-10 rounded-xl max-w-2xl mx-auto">
            <p className="text-xl font-light italic text-center">
              "Ekonomi gav mig ångest innan."
            </p>
          </InteractiveCard>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-32 px-6 border-t border-border bg-background-elevated relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center">
            För vem är Valora
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <InteractiveCard className="liquid-glass p-8 rounded-xl space-y-4">
              <h3 className="text-xl font-light">Den upptagna yrkespersonen</h3>
              <p className="text-secondary font-light leading-relaxed">
                Du har inte tid att jämföra erbjudanden och förhandla. 
                Valora gör det åt dig medan du fokuserar på det som är viktigt.
              </p>
            </InteractiveCard>
            
            <InteractiveCard className="liquid-glass p-8 rounded-xl space-y-4">
              <h3 className="text-xl font-light">Familjen med komplex ekonomi</h3>
              <p className="text-secondary font-light leading-relaxed">
                Flera lån, försäkringar och sparformer. Valora håller koll på allt 
                och hittar förbättringar du missat.
              </p>
            </InteractiveCard>
            
            <InteractiveCard className="liquid-glass p-8 rounded-xl space-y-4">
              <h3 className="text-xl font-light">Den som vill ha kontroll utan stress</h3>
              <p className="text-secondary font-light leading-relaxed">
                Du vill göra rätt men känner dig överväldigad. 
                Valora tar bort stressen och ger dig full kontroll.
              </p>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-32 px-6 border-t border-border relative z-10">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight">
              Begär tidig tillgång till Valora
            </h2>
            <p className="text-lg text-secondary font-light">
              Vi öppnar successivt upp Valora för ett begränsat antal användare.
            </p>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="liquid-glass p-10 rounded-xl space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-light tracking-wide text-secondary">
                  E-post *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background-surface border-border"
                  placeholder="din@email.se"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-light tracking-wide text-secondary">
                  Vad vill du att Valora ska optimera? (valfritt)
                </label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-background-surface border-border min-h-24"
                  placeholder="T.ex. bostadslån, bilförsäkring..."
                />
              </div>
              
              <Button type="submit" variant="glass" className="w-full" size="lg">
                Gå med i väntelistan
              </Button>
            </form>
          ) : (
            <div className="liquid-glass p-10 rounded-xl text-center">
              <p className="text-xl font-light">
                Tack. Du är nu registrerad för tidig access.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 border-t border-border bg-background-elevated relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-center">
            Vanliga frågor
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="liquid-glass px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-lg hover:no-underline">
                Är Valora en bank?
              </AccordionTrigger>
              <AccordionContent className="text-secondary font-light leading-relaxed">
                Nej, Valora är inte en bank. Vi är ett autonomt system som hjälper dig 
                optimera dina befintliga finansiella produkter genom att analysera, 
                jämföra och förhandla med banker och försäkringsbolag på din vägnar.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="liquid-glass px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-lg hover:no-underline">
                Behöver jag byta bank?
              </AccordionTrigger>
              <AccordionContent className="text-secondary font-light leading-relaxed">
                Inte nödvändigtvis. Valora arbetar med dina nuvarande banker och 
                försäkringsbolag. Vi hjälper dig bara att få bättre villkor – 
                antingen hos din nuvarande leverantör eller genom att hitta bättre alternativ.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="liquid-glass px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-lg hover:no-underline">
                Är det säkert?
              </AccordionTrigger>
              <AccordionContent className="text-secondary font-light leading-relaxed">
                Ja. Valora använder banknivåkryptering och följer strikt GDPR. 
                Vi förhandlar aldrig utan ditt uttryckliga godkännande för varje åtgärd. 
                Du har alltid full kontroll och insyn.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="liquid-glass px-8 rounded-xl border-none">
              <AccordionTrigger className="text-left font-light text-lg hover:no-underline">
                Vad kostar det?
              </AccordionTrigger>
              <AccordionContent className="text-secondary font-light leading-relaxed">
                Valora tar en liten andel av de besparingar vi genererar för dig. 
                Om vi inte sparar pengar åt dig betalar du ingenting. 
                Exakt prissättning kommuniceras när du får tillgång till systemet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <p className="text-secondary font-light">
              Valora – ett autonomt system för din privatekonomi.
            </p>
            
            <div className="flex gap-8">
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
    </div>
  );
};

export default Index;
