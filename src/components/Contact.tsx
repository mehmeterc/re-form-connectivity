
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Instagram, Linkedin, Twitter, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Contact = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      toast.success(
        language === 'de' 
          ? 'Newsletter-Anmeldung erfolgreich!' 
          : 'Newsletter subscription successful!',
        {
          description: language === 'de'
            ? 'Vielen Dank für deine Anmeldung.'
            : 'Thank you for subscribing.'
        }
      );
      if (emailRef.current) emailRef.current.value = '';
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-transition py-24 relative bg-white/[0.02]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-orange/10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{t('contact.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glassmorphism p-8 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.email')}</h3>
              <a 
                href="mailto:elifnurm@gmail.com" 
                className="flex items-center text-foreground/80 hover:text-foreground transition-colors"
              >
                <Mail className="mr-2 h-5 w-5 text-reform-blue" />
                <span>elifnurm@gmail.com</span>
              </a>
              <a 
                href="mailto:mehmeterc@gmail.com" 
                className="flex items-center mt-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <Mail className="mr-2 h-5 w-5 text-reform-blue" />
                <span>mehmeterc@gmail.com</span>
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.follow')}</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.newsletter.title')}</h3>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  ref={emailRef}
                  type="email"
                  placeholder={t('contact.newsletter.placeholder')}
                  className="flex-grow bg-secondary/50 border-input text-foreground"
                  required
                />
                <Button 
                  type="submit" 
                  className="ml-2 bg-#1C262F text-white hover:bg-#1C262F/90 dark:bg-#1C262F dark:text-#1C262F dark:hover:bg-#1C262F/90"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </form>
            </div>
          </div>

          <div className="glassmorphism p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{t('contact.location')}</h3>
            <div className="flex items-start mb-4">
              <MapPin className="mr-2 h-5 w-5 text-reform-pink mt-1" />
              <p className="text-foreground/80">{t('contact.address')}</p>
            </div>
            
            <div className="rounded-xl overflow-hidden h-64 mt-6">
              <iframe
                title="Re:Form Hub Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.9374636010254!2d12.643844015816656!3d51.86730219784913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a65a7c06a21e85%3A0xe0a01bccf8e3ccf7!2sLutherstadt%20Wittenberg!5e0!3m2!1sen!2sde!4v1621458252045!5m2!1sen!2sde"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
