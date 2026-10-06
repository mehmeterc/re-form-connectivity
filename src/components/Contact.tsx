import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram, Linkedin, MapPin, ExternalLink } from 'lucide-react';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Straße der Befreiung 139, 06886 Lutherstadt Wittenberg');

const Contact = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el?.classList.add('in-view');
      },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-transition py-24 relative bg-white/[0.02]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-orange/10"></div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient heading-glow">{t('contact.title')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glassmorphism p-8 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.email')}</h3>
              <a href="mailto:elifnurm@gmail.com" className="flex items-center text-foreground/80 hover:text-foreground transition-colors">
                <Mail className="mr-2 h-5 w-5 text-reform-blue" />
                <span>elifnurm@gmail.com</span>
              </a>
              <a href="mailto:mehmeterc@gmail.com" className="flex items-center mt-2 text-foreground/80 hover:text-foreground transition-colors">
                <Mail className="mr-2 h-5 w-5 text-reform-blue" />
                <span>mehmeterc@gmail.com</span>
              </a>
              <a
                href="mailto:mehmeterc@gmail.com"
                className="cyber-button inline-flex items-center gap-2 mt-6 px-6 py-3 text-white font-medium rounded-md"
              >
                <Mail className="h-4 w-4" />
                {language === 'de' ? 'E-Mail schreiben' : 'Write an email'}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.follow')}</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/antiapp.berlin/" target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/mehmet-ercan/" target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="glassmorphism p-8 rounded-2xl flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.location')}</h3>
            <div className="flex items-start mb-6">
              <MapPin className="mr-2 h-5 w-5 text-reform-pink mt-1" />
              <p className="text-foreground/80">Re:Form Hub - Strasse der Befreiung 139, 06886 Lutherstadt Wittenberg</p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-md border border-border/60 bg-secondary/50 hover:bg-secondary text-foreground font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              {language === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
