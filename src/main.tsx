import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/useLanguage";
import App from "./App.tsx";
import "./index.css";
import "@/lib/i18n";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>,
);
