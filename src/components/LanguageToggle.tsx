
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 backdrop-blur-sm">
      <button
        className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
          language === 'de'
            ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white shadow-sm'
            : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
        }`}
        onClick={() => setLanguage('de')}
      >
        DE
      </button>
      <button
        className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
          language === 'en'
            ? 'bg-black/20 dark:bg-white/20 text-black dark:text-white shadow-sm'
            : 'text-black/60 dark:text-white/60 hover:text-black/80 dark:hover:text-white/80'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
