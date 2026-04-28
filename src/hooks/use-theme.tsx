import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Appearance = "light" | "dark";

const STORAGE_KEY = "valora-appearance";

interface ThemeContextType {
  appearance: Appearance;
  setAppearance: (a: Appearance) => void;
  toggleAppearance: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function readStoredAppearance(): Appearance {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearanceState] = useState<Appearance>(() => readStoredAppearance());

  const setAppearance = useCallback((a: Appearance) => {
    setAppearanceState(a);
    localStorage.setItem(STORAGE_KEY, a);
  }, []);

  const toggleAppearance = useCallback(() => {
    setAppearance(appearance === "dark" ? "light" : "dark");
  }, [appearance, setAppearance]);

  return (
    <ThemeContext.Provider value={{ appearance, setAppearance, toggleAppearance }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
