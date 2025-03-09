
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Calendar, TestTube } from 'lucide-react';

const About = () => {
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

  const features = [
    {
      icon: <Wifi className="h-10 w-10 text-reform-blue" />,
      title: t('about.coworking.title'),
      description: t('about.coworking.description'),
    },
    {
      icon: <Calendar className="h-10 w-10 text-reform-purple" />,
      title: t('about.workshops.title'),
      description: t('about.workshops.description'),
    },
    {
      icon: <TestTube className="h-10 w-10 text-reform-pink" />,
      title: t('about.experiments.title'),
      description: t('about.experiments.description'),
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-transition py-24 relative"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.title')}</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glassmorphism p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-3 rounded-xl bg-white/5 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
