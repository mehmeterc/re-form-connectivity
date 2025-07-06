
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

  const partners = [
    {
      name: "Lutherstadt Wittenberg",
      url: "https://www.wittenberg.de/",
      logo: "/lovable-uploads/b82bad27-d345-40ed-b5d1-867a5b950b97.png"
    },
    {
      name: "Stadtwerke Lutherstadt Wittenberg",
      url: "https://www.stadtwerke-wittenberg.de/",
      logo: "/lovable-uploads/bbf4a0c8-67eb-40f1-8f71-b8f85725c5f5.png"
    },
    {
      name: "Sachsen-Anhalt Ministerium für Infrastruktur und Digitales",
      url: "https://moderndenken.de/",
      logo: "/lovable-uploads/4bb19773-fdc8-4ed7-978d-728751f3abc1.png"
    },
    {
      name: "Lutherstadt Wittenberg Stadtbibliothek",
      url: "https://stadtbibliothek-wittenberg.bibliotheca-open.de/",
      logo: "/lovable-uploads/1e9f5d26-fb28-48df-8f41-5b6442fd782d.png"
    }
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
            <span className="text-gradient heading-glow">Partner</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Diese Institutionen unterstützen Re:Form Hub ideell und/oder finanziell
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.name}
              className="group relative block"
            >
              <div className="bg-white dark:bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6 h-24 flex items-center justify-center group-hover:scale-105 border border-gray-100 dark:border-gray-200">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-12 w-auto h-auto object-contain transition-all duration-300 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {partner.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
