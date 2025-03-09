
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, Stars, Gamepad2 } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-reform-teal-dark/30 via-background to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-teal/20"></div>
        <div 
          className="absolute inset-0 bg-[url('/images/wittenberg-abstract.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('/images/wittenberg-abstract.jpg')" }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/3 right-1/4 animate-float">
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-reform-cyan/20 rounded-full blur-xl animate-pulse-soft"></div>
          <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-reform-cyan" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/5 animate-bounce-soft">
        <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
          <div className="absolute inset-0 bg-reform-violet/20 rounded-full blur-xl animate-pulse-soft"></div>
          <Stars className="w-7 h-7 md:w-8 md:h-8 text-reform-violet" />
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-reform-yellow/20 rounded-full blur-xl animate-pulse-soft"></div>
          <Gamepad2 className="w-6 h-6 md:w-7 md:h-7 text-reform-orange" />
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="mb-6 md:mb-10 flex justify-center">
          <img 
            src="/lovable-uploads/24ee9b20-39b4-46f7-9e11-d461a3b02494.png" 
            alt="Re:Form Hub Logo" 
            className="h-24 sm:h-32 animate-fade-in"
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-slide-up">
          {t('hero.subtitle')}
        </p>
        <a
          href="#events"
          className="cyber-button inline-flex items-center justify-center px-8 py-4 text-white font-medium rounded-md shadow-lg hover:shadow-reform-cyan/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
        >
          {t('hero.cta')}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator border-reform-cyan/30">
        <div className="absolute w-1.5 h-1.5 bg-reform-cyan rounded-full left-1/2 top-1/3 transform -translate-x-1/2 animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
