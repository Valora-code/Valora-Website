import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/useLanguage";
import App from "./App.tsx";
import "./index.css";
import "@/lib/i18n";
import { getClerkPublishableKey } from "@/lib/clerkPublishableKey";
import { marketingClerkAppearance } from "@/lib/clerkMarketingAppearance";

const clerkPublishableKey = getClerkPublishableKey();

const appTree = <App />;

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider>
      {clerkPublishableKey ? (
        <ClerkProvider
          publishableKey={clerkPublishableKey}
          waitlistUrl="/waitlist"
          appearance={marketingClerkAppearance}
        >
          {appTree}
        </ClerkProvider>
      ) : (
        appTree
      )}
    </LanguageProvider>
  </ThemeProvider>,
);
