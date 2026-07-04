import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const targetLabel = isDark ? 'בהיר' : 'כהה';

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-start gap-2"
      onClick={toggleTheme}
      aria-label={`עבור למצב ${targetLabel}`}
      title={`עבור למצב ${targetLabel}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {isDark ? 'מצב בהיר' : 'מצב כהה'}
    </Button>
  );
}
