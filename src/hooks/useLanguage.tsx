/* eslint-disable react-refresh/only-export-components -- LanguageProvider + useLanguage */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { setI18nLanguage } from '@/lib/i18n';
import { VALORA_LANGUAGE_STORAGE_KEY, readStoredLanguage } from '@/lib/language-storage';
import { languageToBcp47 } from '@/lib/locale-format';
import type { Language } from '@/types/language';

export type { Language } from '@/types/language';

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'sv', label: 'Svenska' },
];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  options: typeof LANGUAGE_OPTIONS;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(VALORA_LANGUAGE_STORAGE_KEY, lang);
  }, []);

  useEffect(() => {
    setI18nLanguage(language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = languageToBcp47(language);
    }
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    options: LANGUAGE_OPTIONS,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
