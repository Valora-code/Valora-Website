import type { Language } from '@/types/language';

/** BCP 47 tags for number/date formatting (not full UI translation). */
export function languageToBcp47(language: Language): string {
  switch (language) {
    case 'sv':
      return 'sv-SE';
    default:
      return 'en-GB';
  }
}
