
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="section-transition py-24 relative bg-foreground/[0.02]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-violet/5"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient heading-glow">Partner</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Gemeinsam mit starken Partnern schaffen wir Innovation und digitale Zukunft in Wittenberg
          </p>
        </div>
        
        <div className="glassmorphism p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-8 lg:gap-12">
            <a 
              href="https://www.wittenberg.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex-shrink-0 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-reform-cyan/25 rounded-2xl p-4 hover:bg-white/10"
            >
              <img 
                src="/lovable-uploads/b82bad27-d345-40ed-b5d1-867a5b950b97.png" 
                alt="Lutherstadt Wittenberg" 
                className="h-20 lg:h-24 w-auto transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-lg"
              />
            </a>
            
            <a 
              href="https://www.stadtwerke-wittenberg.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex-shrink-0 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-reform-cyan/25 rounded-2xl p-4 hover:bg-white/10"
            >
              <img 
                src="/lovable-uploads/bbf4a0c8-67eb-40f1-8f71-b8f85725c5f5.png" 
                alt="Stadtwerke Lutherstadt Wittenberg" 
                className="h-20 lg:h-24 w-auto transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-lg"
              />
            </a>
            
            <a 
              href="https://moderndenken.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex-shrink-0 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-reform-cyan/25 rounded-2xl p-4 hover:bg-white/10"
            >
              <img 
                src="/lovable-uploads/4bb19773-fdc8-4ed7-978d-728751f3abc1.png" 
                alt="Sachsen-Anhalt Ministerium für Infrastruktur und Digitales" 
                className="h-20 lg:h-24 w-auto transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-lg"
              />
            </a>
            
            <a 
              href="https://stadtbibliothek-wittenberg.bibliotheca-open.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex-shrink-0 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-reform-cyan/25 rounded-2xl p-4 hover:bg-white/10"
            >
              <img 
                src="/lovable-uploads/1e9f5d26-fb28-48df-8f41-5b6442fd782d.png" 
                alt="Lutherstadt Wittenberg Stadtbibliothek" 
                className="h-20 lg:h-24 w-auto transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-lg"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
