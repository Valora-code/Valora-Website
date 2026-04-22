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
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              aria-current={language === opt.value ? 'true' : undefined}
              className={cn(
                'flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm text-left hover:bg-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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
