
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const VisionStats = () => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-teal to-reform-cyan bg-clip-text text-transparent mb-2">2025</div>
        <p className="text-foreground/80 font-medium">{language === 'de' ? 'Projektstart' : 'Project Launch'}</p>
      </div>
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-purple to-reform-pink bg-clip-text text-transparent mb-2">250+</div>
        <p className="text-foreground/80 font-medium">{language === 'de' ? 'Community Mitglieder' : 'Community Members'}</p>
      </div>
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-pink to-reform-orange bg-clip-text text-transparent mb-2">50+</div>
        <p className="text-foreground/80 font-medium">{language === 'de' ? 'Geplante Events' : 'Planned Events'}</p>
      </div>
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-cyan to-reform-teal bg-clip-text text-transparent mb-2">15+</div>
        <p className="text-foreground/80 font-medium">{language === 'de' ? 'Partnerschaften' : 'Partnerships'}</p>
      </div>
    </div>
  );
};

export default VisionStats;
