
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white/10">
      <button
        className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
          language === 'de'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white'
        }`}
        onClick={() => setLanguage('de')}
      >
        DE
      </button>
      <button
        className={`text-xs font-medium px-2 py-1 rounded-full transition-all ${
          language === 'en'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white'
        }`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
