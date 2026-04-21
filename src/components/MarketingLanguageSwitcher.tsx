import { Globe, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/lib/i18n';

/** Globe + language list; persists via `LanguageProvider` and `valora_language` (same as the app). */
export function MarketingLanguageSwitcher() {
  const { t } = useTranslation();
  const { language, setLanguage, options } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="shrink-0 flex items-center justify-center p-2 rounded-md hover:bg-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 text-muted-foreground hover:text-foreground"
          aria-label={t('shell.language.label')}
          title={t('shell.language.label')}
        >
          <Globe className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end" sideOffset={8}>
        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{t('shell.language.label')}</p>
        <div className="flex flex-col gap-0.5">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setLanguage(opt.value)}
              className={cn(
                'flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm text-left hover:bg-muted/60 transition-colors',
                language === opt.value && 'bg-muted/50 text-foreground',
              )}
            >
              <span>{opt.label}</span>
              {language === opt.value && <Check className="w-4 h-4 shrink-0 text-primary" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
