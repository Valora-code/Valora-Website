import type { Language } from '@/types/language';

export const VALORA_LANGUAGE_STORAGE_KEY = 'valora_language';

export function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(VALORA_LANGUAGE_STORAGE_KEY);
  if (stored === 'sv' || stored === 'en') return stored;
  return 'en';
}
