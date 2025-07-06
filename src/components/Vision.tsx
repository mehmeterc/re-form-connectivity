
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import VisionCarousel from './vision/VisionCarousel';
import VisionStats from './vision/VisionStats';

const Vision = () => {
  const { language } = useLanguage();
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

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="section-transition py-24 relative bg-white/[0.02] dark:bg-transparent"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-pink/10"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient heading-glow">
              {language === 'de' ? 'Unsere Vision' : 'Our Vision'}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {language === 'de' 
              ? 'Entdecken Sie unsere Vision für Re:Form Hub - wo Innovation auf Tradition trifft'
              : 'Discover our vision for Re:Form Hub - where innovation meets tradition'
            }
          </p>
        </div>

        <VisionCarousel />
        <VisionStats />
      </div>
    </section>
  );
};

export default Vision;
