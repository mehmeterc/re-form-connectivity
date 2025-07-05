
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 backdrop-blur-sm">
      <button
        className={`text-xs font-medium p-1.5 rounded-full transition-all ${
          theme === 'light'
            ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white shadow-sm'
            : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
        }`}
        onClick={() => setTheme('light')}
        aria-label="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        className={`text-xs font-medium p-1.5 rounded-full transition-all ${
          theme === 'dark'
            ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white shadow-sm'
            : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
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
