
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-reform-teal/10 dark:to-reform-cyan/10 border-t border-border/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-purple/10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* CTA Section */}
        <div className="py-16 text-center border-b border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 max-w-3xl mx-auto">
            <span className="text-gradient heading-glow">{t('footer.cta.title')}</span>
          </h2>
          <a href="#contact">
            <Button 
              size="lg" 
              className="cyber-button px-8 py-3 text-white font-medium rounded-md shadow-lg hover:shadow-reform-teal/30 dark:hover:shadow-reform-cyan/30 transition-all duration-300 hover:-translate-y-1"
            >
              {t('footer.cta.button')}
            </Button>
          </a>
        </div>

        {/* Footer Content */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/60 text-sm">
              © 2025 Re:Form Hub. {t('footer.rights')}
            </p>
          </div>
          <div>
            <p className="text-foreground/60 text-sm">
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
