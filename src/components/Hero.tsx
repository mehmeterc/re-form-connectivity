
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-reform-blue/20 via-background to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-purple/20"></div>
        <div 
          className="absolute inset-0 bg-[url('/images/wittenberg-abstract.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/wittenberg-abstract.jpg')" }}
        ></div>
      </div>

      {/* Floating lightbulb icon */}
      <div className="absolute top-1/3 right-1/4 animate-float">
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-reform-yellow/20 rounded-full blur-xl animate-pulse-soft"></div>
          <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-reform-yellow/90" />
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up">
          {t('hero.subtitle')}
        </p>
        <a
          href="#events"
          className="shimmer-button inline-flex items-center justify-center px-8 py-4 bg-reform-purple text-white font-medium rounded-full shadow-lg hover:shadow-reform-purple/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        >
          {t('hero.cta')}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator"></div>
    </section>
  );
};

export default Hero;
