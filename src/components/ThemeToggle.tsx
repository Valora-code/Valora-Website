import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';
const themes = [{
  id: 'obsidian',
  name: 'Obsidian',
  color: 'hsl(240, 10%, 8%)'
}, {
  id: 'arctic',
  name: 'Arctic',
  color: 'hsl(210, 30%, 12%)'
}, {
  id: 'emerald',
  name: 'Klarna Pink',
  color: 'hsl(335, 100%, 83%)'
}, {
  id: 'violet',
  name: 'Violet',
  color: 'hsl(270, 30%, 12%)'
}] as const;
export const ThemeToggle = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="liquid-glass border-border/50 backdrop-blur-xl">
        {themes.map(t => <DropdownMenuItem key={t.id} onClick={() => setTheme(t.id as typeof theme)} className="cursor-pointer flex items-center gap-3 transition-colors">
            <div className="w-4 h-4 rounded-full border border-border/30" style={{
          backgroundColor: t.color
        }} />
            <span className="font-light tracking-wide">{t.name}</span>
            {theme === t.id && <span className="ml-auto text-xs text-secondary">Active</span>}
          </DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>;
};