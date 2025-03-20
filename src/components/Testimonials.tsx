import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
}

const Testimonials = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: t('testimonials.quote'),
      author: language === 'de' ? 'Marie Schmidt' : 'Marie Schmidt',
      role: language === 'de' ? 'Stadtplanerin' : 'Urban Planner',
      image: '/images/testimonial-1.jpg',
    },
    {
      id: 2,
      text: language === 'de' 
        ? 'Ein faszinierender Ort, an dem digitale Innovation auf historisches Erbe trifft.' 
        : 'A fascinating place where digital innovation meets historical heritage.',
      author: language === 'de' ? 'Thomas Weber' : 'Thomas Weber',
      role: language === 'de' ? 'Digitalkünstler' : 'Digital Artist',
      image: '/images/testimonial-2.jpg',
    },
    {
      id: 3,
      text: language === 'de' 
        ? 'Die Workshops haben mir völlig neue Perspektiven für meine Arbeit eröffnet.' 
        : 'The workshops have opened up completely new perspectives for my work.',
      author: language === 'de' ? 'Lena Meyer' : 'Lena Meyer',
      role: language === 'de' ? 'Studentin' : 'Student',
      image: '/images/testimonial-3.jpg',
    },
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-transition py-24 relative bg-white/[0.02] dark:bg-transparent"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-pink/10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('testimonials.title')}</h2>
        </div>

        <div className="relative glassmorphism p-8 md:p-12 rounded-2xl overflow-hidden">
          <div className="absolute top-6 left-6 text-reform-purple opacity-30">
            <Quote size={60} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-opacity duration-500 absolute inset-0 ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <p className="text-xl md:text-2xl italic text-foreground mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative w-60 h-60 rounded-full overflow-hidden border-4 border-border">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center mt-6">
                <button 
                  className="p-2 rounded-full border border-border hover:bg-secondary transition-colors mr-2"
                  onClick={goToPrevious}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeIndex ? 'bg-foreground' : 'bg-muted-foreground'
                      }`}
                      onClick={() => goToIndex(index)}
                    />
                  ))}
                </div>
                <button 
                  className="p-2 rounded-full border border-border hover:bg-secondary transition-colors ml-2"
                  onClick={goToNext}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="glassmorphism p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-bold text-reform-blue mb-2">25+</div>
            <p className="text-foreground/70">{language === 'de' ? 'Workshops' : 'Workshops'}</p>
          </div>
          <div className="glassmorphism p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-bold text-reform-purple mb-2">300+</div>
            <p className="text-foreground/70">{language === 'de' ? 'Teilnehmer' : 'Participants'}</p>
          </div>
          <div className="glassmorphism p-6 rounded-2xl text-center">
            <div className="text-3xl md:text-4xl font-bold text-reform-pink mb-2">15+</div>
            <p className="text-foreground/70">{language === 'de' ? 'Digitale Projekte' : 'Digital Projects'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

