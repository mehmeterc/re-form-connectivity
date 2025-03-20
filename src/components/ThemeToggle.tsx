
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-foreground/5 border border-foreground/10">
      <button
        className={`text-xs font-medium p-1.5 rounded-full transition-all ${
          theme === 'light'
            ? 'bg-foreground/15 text-foreground'
            : 'text-foreground/60 hover:text-foreground/80'
        }`}
        onClick={() => setTheme('light')}
        aria-label="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        className={`text-xs font-medium p-1.5 rounded-full transition-all ${
          theme === 'dark'
            ? 'bg-foreground/15 text-foreground'
            : 'text-foreground/60 hover:text-foreground/80'
        }`}
        onClick={() => setTheme('dark')}
        aria-label="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;
