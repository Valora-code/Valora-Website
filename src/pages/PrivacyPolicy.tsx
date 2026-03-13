import { ValoraLogo } from "@/components/ValoraLogo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 nav-sticky">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/"><ValoraLogo size="small" /></Link>
          <Link to="/">
            <Button variant="ghost" size="sm">← Tillbaka</Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <h1 className="headline-section mb-4">Integritetspolicy</h1>
        <p className="text-sm text-muted-foreground mb-12">Senast uppdaterad: 13 mars 2026</p>

        <div className="space-y-10 text-foreground/80 font-light leading-relaxed text-[15px]">
          <section>
            <h2 className="headline-card mb-3">1. Personuppgiftsansvarig</h2>
            <p>
              Valora Technologies AB (org.nr 559573-0341) ("Valora", "vi", "oss") är personuppgiftsansvarig
              för behandlingen av dina personuppgifter. Du kan kontakta oss via e-post på{" "}
              <a href="mailto:privacy@valora.se" className="text-primary hover:underline">privacy@valora.se</a>.
            </p>
          </section>

          <section>
            <h2 className="headline-card mb-3">2. Vilka uppgifter vi samlar in</h2>
            <p className="mb-3">Vi behandlar följande kategorier av personuppgifter:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><span className="text-foreground/80">Identitetsuppgifter</span> — namn, personnummer (vid behov), e-postadress</li>
              <li><span className="text-foreground/80">Finansiella uppgifter</span> — kontoinformation, transaktionshistorik, lån, försäkringar och räntor som hämtas via öppen bankdata (Open Banking / PSD2)</li>
              <li><span className="text-foreground/80">Tekniska uppgifter</span> — IP-adress, enhetstyp, webbläsare, anonymiserad användningsstatistik</li>
              <li><span className="text-foreground/80">Kommunikation</span> — meddelanden du skickar till oss, feedback och supportärenden</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-card mb-3">3. Rättslig grund och ändamål</h2>
            <p className="mb-3">Vi behandlar dina uppgifter med stöd av följande rättsliga grunder:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><span className="text-foreground/80">Avtal</span> — för att tillhandahålla och förbättra vår tjänst, inklusive analys och optimering av din ekonomi</li>
              <li><span className="text-foreground/80">Samtycke</span> — för åtkomst till din bankdata via Open Banking samt för marknadsföringskommunikation</li>
              <li><span className="text-foreground/80">Berättigat intresse</span> — för att förbättra tjänsten, förhindra missbruk och utföra aggregerad analys</li>
              <li><span className="text-foreground/80">Rättslig förpliktelse</span> — för att uppfylla lagkrav, exempelvis penningtvättslagstiftningen</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-card mb-3">4. Open Banking och bankdata</h2>
            <p>
              Vi hämtar finansiell data via reglerade kontoinformationstjänster (AISP) i enlighet med
              EU:s betaltjänstdirektiv (PSD2). Åtkomsten kräver ditt uttryckliga samtycke och sker via
              säkra API:er med stark kundautentisering (SCA). Du kan när som helst återkalla ditt samtycke,
              varpå vi upphör med att hämta ny data och raderar lagrad bankdata inom 30 dagar.
            </p>
          </section>

          <section>
            <h2 className="headline-card mb-3">5. Hur vi skyddar dina uppgifter</h2>
            <p>
              All data krypteras under överföring (TLS 1.3) och i vila (AES-256). Vi tillämpar
              principen om minsta möjliga åtkomst, utför regelbundna säkerhetsgranskningar och lagrar
              data inom EU/EES. Vi säljer aldrig dina personuppgifter till tredje part.
            </p>
          </section>

          <section>
            <h2 className="headline-card mb-3">6. Delning med tredje part</h2>
            <p className="mb-3">Vi delar uppgifter med:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><span className="text-foreground/80">Reglerade kontoinformationstjänster</span> — för att hämta din bankdata</li>
              <li><span className="text-foreground/80">Infrastrukturleverantörer</span> — hosting, databas och säkerhetstjänster (alla inom EU/EES)</li>
              <li><span className="text-foreground/80">Myndigheter</span> — om vi är skyldiga enligt lag</li>
            </ul>
            <p className="mt-3">Vi ingår alltid personuppgiftsbiträdesavtal med våra leverantörer.</p>
          </section>

          <section>
            <h2 className="headline-card mb-3">7. Lagringstid</h2>
            <p>
              Vi lagrar dina uppgifter så länge du har ett aktivt konto, plus den tid som krävs för att
              uppfylla rättsliga krav (vanligtvis 5–7 år för finansiell dokumentation). Bankdata som
              hämtas via Open Banking raderas inom 30 dagar efter att du återkallar ditt samtycke eller
              avslutar ditt konto.
            </p>
          </section>

          <section>
            <h2 className="headline-card mb-3">8. Dina rättigheter</h2>
            <p className="mb-3">Enligt GDPR har du rätt att:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Begära tillgång till dina personuppgifter (registerutdrag)</li>
              <li>Begära rättelse av felaktiga uppgifter</li>
              <li>Begära radering ("rätten att bli glömd")</li>
              <li>Begära begränsning av behandlingen</li>
              <li>Invända mot behandling baserad på berättigat intresse</li>
              <li>Begära dataportabilitet</li>
              <li>Återkalla samtycke när som helst</li>
            </ul>
            <p className="mt-3">
              Kontakta oss på{" "}
              <a href="mailto:privacy@valora.se" className="text-primary hover:underline">privacy@valora.se</a>{" "}
              för att utöva dina rättigheter. Du har också rätt att lämna klagomål till
              Integritetsskyddsmyndigheten (IMY).
            </p>
          </section>

          <section>
            <h2 className="headline-card mb-3">9. Cookies</h2>
            <p>
              Vi använder nödvändiga cookies för att tjänsten ska fungera samt, med ditt samtycke,
              analyticscookies för att förbättra användarupplevelsen. Du kan hantera dina cookieinställningar
              i webbläsaren.
            </p>
          </section>

          <section>
            <h2 className="headline-card mb-3">10. Ändringar</h2>
            <p>
              Vi kan uppdatera denna integritetspolicy. Vid väsentliga ändringar informerar vi dig via
              e-post eller i tjänsten. Den senaste versionen finns alltid tillgänglig på denna sida.
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

export default PrivacyPolicy;
