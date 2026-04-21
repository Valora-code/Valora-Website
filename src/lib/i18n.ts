import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import sv from '@/locales/sv.json';
import { readStoredLanguage } from '@/lib/language-storage';

import type { Language } from '@/types/language';

const resources = {
  en: { translation: en },
  sv: { translation: sv },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: readStoredLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'sv'],
  interpolation: {
    escapeValue: true,
  },
  react: {
    useSuspense: false,
  },
});

export function setI18nLanguage(language: Language): void {
  if (i18n.language === language) return;
  void i18n.changeLanguage(language);
}

export default i18n;

export { useTranslation, Trans } from 'react-i18next';
