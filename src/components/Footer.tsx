
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
            <span className="text-gradient heading-glow">{t('footer.cta.title')}</span>
          </h3>
          <a
            href="#events"
            className="cyber-button inline-flex items-center justify-center px-8 py-4 text-white font-medium rounded-md shadow-lg hover:shadow-reform-cyan/30 transition-all duration-300 hover:-translate-y-1 animate-shake"
          >
            {t('footer.cta.button')}
          </a>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="flex items-center">
              <h2 className="logo-text text-2xl">Re:Form Hub</h2>
            </a>
          </div>
          <div className="text-sm text-foreground/60">
            &copy; {currentYear} Re:Form Hub. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
