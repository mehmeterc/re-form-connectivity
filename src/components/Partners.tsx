
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Building, Zap } from 'lucide-react';

const Partners = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('in-view');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const partnershipTypes = [
    { icon: Heart, key: 'financial' },
    { icon: Users, key: 'expertise' },
    { icon: Building, key: 'space' },
    { icon: Zap, key: 'network' }
  ];

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="section-transition py-16 bg-gray-50 dark:bg-gray-900/30"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient heading-glow">{t('partners.title')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('partners.subtitle')}
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-foreground/90">{t('partners.types.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {partnershipTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div key={index} className="flex flex-col items-center p-4 bg-card rounded-lg border border-border">
                    <Icon className="w-8 h-8 text-reform-cyan mb-2" />
                    <span className="text-sm font-medium text-center">{t(`partners.types.${type.key}`)}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-reform-cyan to-reform-purple text-white hover:from-reform-cyan/90 hover:to-reform-purple/90 shadow-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('partners.cta')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
