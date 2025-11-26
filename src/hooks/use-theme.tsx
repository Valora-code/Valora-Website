import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'obsidian' | 'arctic' | 'emerald' | 'violet';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('valora-theme') as Theme;
    return stored || 'obsidian';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('obsidian', 'arctic', 'emerald', 'violet');
    root.classList.add(theme);
    localStorage.setItem('valora-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
