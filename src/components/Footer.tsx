
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 sm:px-6 relative glassmorphism border-t border-foreground/10">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 max-w-3xl mx-auto">
            <span className="text-gradient">{t('footer.cta.title')}</span>
          </h3>
          <a
            href="#events"
            className="cyber-button inline-flex items-center justify-center px-8 py-4 text-white font-medium rounded-md shadow-lg hover:shadow-reform-cyan/30 transition-all duration-300 hover:-translate-y-1 animate-shake"
          >
            {t('footer.cta.button')}
          </a>
        </div>

        {/* Partner Logos Section */}
        <div className="mb-12">
          <h4 className="text-lg font-semibold text-center mb-8 text-foreground/80">Partner</h4>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <a 
              href="https://www.wittenberg.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-reform-cyan/20"
            >
              <img 
                src="/lovable-uploads/b82bad27-d345-40ed-b5d1-867a5b950b97.png" 
                alt="Lutherstadt Wittenberg" 
                className="h-20 md:h-28 w-auto transition-all duration-300 hover:brightness-110"
              />
            </a>
            <a 
              href="https://www.stadtwerke-wittenberg.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-reform-cyan/20"
            >
              <img 
                src="/lovable-uploads/bbf4a0c8-67eb-40f1-8f71-b8f85725c5f5.png" 
                alt="Stadtwerke Lutherstadt Wittenberg" 
                className="h-20 md:h-28 w-auto transition-all duration-300 hover:brightness-110"
              />
            </a>
            <a 
              href="https://moderndenken.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-reform-cyan/20"
            >
              <img 
                src="/lovable-uploads/4bb19773-fdc8-4ed7-978d-728751f3abc1.png" 
                alt="Sachsen-Anhalt Ministerium für Infrastruktur und Digitales" 
                className="h-20 md:h-28 w-auto transition-all duration-300 hover:brightness-110"
              />
            </a>
            <a 
              href="https://stadtbibliothek-wittenberg.bibliotheca-open.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-reform-cyan/20"
            >
              <img 
                src="/lovable-uploads/1e9f5d26-fb28-48df-8f41-5b6442fd782d.png" 
                alt="Lutherstadt Wittenberg Stadtbibliothek" 
                className="h-20 md:h-28 w-auto transition-all duration-300 hover:brightness-110"
              />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="flex items-center">
              <h2 className="reformed-logo text-2xl">Re:Form Hub</h2>
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end text-sm text-foreground/60 space-y-1">
            <div>{t('footer.madeWith')}</div>
            <div>&copy; {currentYear} Re:Form Hub. {t('footer.rights')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
