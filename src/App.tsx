import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProviderApp } from "@/components/ClerkProviderApp";
import { DocumentThemeRouteSync } from "@/components/DocumentThemeRouteSync";
import Index from "./pages/Index";
import WaitlistPage from "./pages/WaitlistPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkProviderApp>
          <DocumentThemeRouteSync />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
            <Route path="/anvandarvillkor" element={<TermsOfService />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClerkProviderApp>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
