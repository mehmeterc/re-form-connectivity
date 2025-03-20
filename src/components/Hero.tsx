
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Stars, Gamepad2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-reform-teal/10 via-background to-background dark:from-reform-teal-dark/30 dark:via-background dark:to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-teal/10 dark:from-reform-teal/20"></div>
        <div 
          className="absolute inset-0 bg-[url('/images/wittenberg-abstract.jpg')] bg-cover bg-center opacity-10 dark:opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/wittenberg-abstract.jpg')" }}
        ></div>
      </div>

      {/* Floating elements - repositioned to not overlap with text */}
      <div className="absolute top-32 right-[15%] animate-dance" style={{ zIndex: 5 }}>
        <div className="floating-icon">
          <div className="floating-icon-inner bg-reform-teal/20 dark:bg-reform-cyan/20"></div>
          <Lightbulb className="floating-icon-svg text-reform-teal dark:text-reform-cyan" />
        </div>
      </div>
      
      <div className="absolute bottom-[40%] left-[10%] animate-bounce-soft" style={{ zIndex: 5 }}>
        <div className="floating-icon">
          <div className="floating-icon-inner bg-reform-violet/10 dark:bg-reform-violet/20"></div>
          <Stars className="floating-icon-svg text-reform-violet" />
        </div>
      </div>
      
      {/* Repositioned the gamepad icon to the left side where there's no text */}
      <div className="absolute top-[15%] left-[8%] animate-orbit" style={{ zIndex: 5, animationDuration: '15s' }}>
        <div className="floating-icon">
          <div className="floating-icon-inner bg-reform-yellow/10 dark:bg-reform-yellow/20"></div>
          <Gamepad2 className="floating-icon-svg text-reform-orange" />
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center mt-10">
        <div className="mb-6 md:mb-10 flex justify-center">
          <h1 className="reformed-logo text-4xl sm:text-5xl md:text-6xl">Re:Form Hub</h1>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in text-gradient">
          {t('hero.title')}
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up">
          {t('hero.subtitle')}
        </p>
        <a
          href="#events"
          className="cyber-button inline-flex items-center justify-center px-8 py-4 text-white font-medium rounded-md shadow-lg hover:shadow-reform-teal/30 dark:hover:shadow-reform-cyan/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        >
          {t('hero.cta')}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="absolute w-1.5 h-1.5 bg-reform-teal dark:bg-reform-cyan rounded-full left-1/2 top-1/3 transform -translate-x-1/2 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
