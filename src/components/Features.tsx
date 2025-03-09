
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Code, Headset, Building2 } from 'lucide-react';

const Features = () => {
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
      icon: <Wifi className="h-6 w-6" />,
      text: t('features.coworking'),
      color: 'bg-reform-cyan/10 text-reform-cyan',
    },
    {
      icon: <Code className="h-6 w-6" />,
      text: t('features.art'),
      color: 'bg-reform-violet/10 text-reform-violet',
    },
    {
      icon: <Headset className="h-6 w-6" />,
      text: t('features.workshops'),
      color: 'bg-reform-yellow/10 text-reform-yellow',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      text: t('features.innovation'),
      color: 'bg-reform-orange/10 text-reform-orange',
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-transition py-24 relative bg-white/[0.02]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-teal/10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">{t('features.title')}</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glassmorphism p-6 rounded-2xl flex items-center transition-all duration-300 hover:shadow-lg hover:shadow-reform-teal/10 hover:border-reform-teal/30 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mr-4 p-3 rounded-xl ${feature.color} transition-all duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <p className="font-medium text-lg group-hover:text-reform-cyan transition-colors duration-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
