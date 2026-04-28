import { ValoraLogo } from "@/components/ValoraLogo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 nav-sticky">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <Link to="/"><ValoraLogo size="small" /></Link>
          <Link to="/">
            <Button variant="ghost" size="sm">← Tillbaka</Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <h1 className="display-section mb-4">Användarvillkor</h1>
        <p className="text-sm text-muted-foreground mb-12">Senast uppdaterad: 13 mars 2026</p>

        <div className="space-y-10 text-foreground/80 font-light leading-relaxed text-[15px]">
          <section>
            <h2 className="display-card mb-3">1. Om tjänsten</h2>
            <p>
              Valora ("Tjänsten") tillhandahålls av Guvani Labs AB (org.nr 559573-0341). Tjänsten är ett autonomt
              finansiellt system som analyserar och optimerar din personliga ekonomi genom att använda
              data från öppen bankdata (Open Banking / PSD2), försäkringsbolag och andra finansiella
              aktörer. Genom att använda Tjänsten accepterar du dessa villkor.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">2. Registrering och konto</h2>
            <p>
              För att använda Tjänsten måste du skapa ett konto och lämna korrekt information. Du
              ansvarar för att hålla dina inloggningsuppgifter konfidentiella och för all aktivitet
              som sker under ditt konto. Du måste vara minst 18 år för att använda Tjänsten.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">3. Open Banking och samtycke</h2>
            <p>
              Tjänsten använder reglerade kontoinformationstjänster (AISP) för att hämta finansiell
              data från dina banker och finansiella institutioner. Detta sker i enlighet med EU:s
              betaltjänstdirektiv (PSD2) och kräver ditt uttryckliga samtycke. Du kan när som helst
              återkalla detta samtycke via Tjänsten eller genom att kontakta oss.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">4. Tjänstens omfattning</h2>
            <p className="mb-3">Valora tillhandahåller:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Automatiserad analys av din ekonomi (lån, försäkringar, räntor, abonnemang)</li>
              <li>Identifiering av besparingsmöjligheter och optimeringsförslag</li>
              <li>Verkställande av förändringar — <span className="text-foreground/80">alltid efter ditt uttryckliga godkännande</span></li>
            </ul>
            <p className="mt-3">
              Valora är inte en bank, ett försäkringsbolag eller en finansiell rådgivare. Våra
              rekommendationer utgör inte finansiell rådgivning i lagens mening. Du fattar alltid det
              slutgiltiga beslutet.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">5. Ansvarsbegränsning</h2>
            <p>
              Valora strävar efter att tillhandahålla korrekt och aktuell information, men garanterar
              inte fullständighet eller felfrihet. Vi ansvarar inte för ekonomiska förluster som
              uppstår genom att du följer eller inte följer våra rekommendationer. Tjänsten
              tillhandahålls i befintligt skick ("as is"). Vår sammanlagda ansvarighet är begränsad
              till det belopp du betalat för Tjänsten under de senaste 12 månaderna.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">6. Priser och betalning</h2>
            <p>
              Aktuella priser framgår av Tjänstens prissida. Vi förbehåller oss rätten att ändra
              prissättningen med 30 dagars förvarning. Tidiga användare från väntelistan kan erbjudas
              särskilda villkor som framgår av separat överenskommelse.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">7. Immateriella rättigheter</h2>
            <p>
              Allt innehåll, varumärken, programvara och tekniska lösningar som ingår i Tjänsten
              tillhör Guvani Labs AB eller dess licensgivare. Du får inte kopiera, modifiera, distribuera
              eller bakåtkompilera någon del av Tjänsten utan vårt skriftliga samtycke.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">8. Användarens skyldigheter</h2>
            <p className="mb-3">Du förbinder dig att:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Lämna korrekt och aktuell information</li>
              <li>Inte använda Tjänsten för olagliga ändamål</li>
              <li>Inte försöka kringgå säkerhetsåtgärder eller manipulera Tjänsten</li>
              <li>Inte dela åtkomst till ditt konto med tredje part</li>
            </ul>
          </section>

          <section>
            <h2 className="display-card mb-3">9. Uppsägning</h2>
            <p>
              Du kan säga upp ditt konto när som helst via Tjänsten eller genom att kontakta oss.
              Vid uppsägning upphör vi med att hämta ny bankdata. Lagrade uppgifter hanteras i
              enlighet med vår{" "}
              <Link to="/integritetspolicy" className="text-primary hover:underline">integritetspolicy</Link>.
              Vi förbehåller oss rätten att stänga av eller avsluta konton som bryter mot dessa villkor.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">10. Ändringar av villkoren</h2>
            <p>
              Vi kan uppdatera dessa villkor. Vid väsentliga ändringar informerar vi dig minst 30
              dagar i förväg via e-post eller i Tjänsten. Fortsatt användning efter ändringens
              ikraftträdande innebär att du accepterar de uppdaterade villkoren.
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">11. Tillämplig lag och tvistlösning</h2>
            <p>
              Dessa villkor regleras av svensk lag. Tvister ska i första hand lösas genom förhandling.
              Om parterna inte når en överenskommelse ska tvisten avgöras av svensk allmän domstol med
              Stockholms tingsrätt som första instans. Du har alltid rätt att vända dig till Allmänna
              reklamationsnämnden (ARN) eller EU:s plattform för tvistlösning online (ODR).
            </p>
          </section>

          <section>
            <h2 className="display-card mb-3">12. Kontakt</h2>
            <p>
              För frågor om dessa villkor, kontakta oss på{" "}
              <a href="mailto:info@valora.se" className="text-primary hover:underline">info@valora.se</a>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 text-center">
          <span className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} Valora</span>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
