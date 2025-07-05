
import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  image: string;
  rating: number;
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
      image: 'https://images.unsplash.com/photo-1494790108755-2616b5395bf1?w=400&h=400&fit=crop&crop=face',
      rating: 5,
    },
    {
      id: 2,
      text: language === 'de' 
        ? 'Ein faszinierender Ort, an dem digitale Innovation auf historisches Erbe trifft.' 
        : 'A fascinating place where digital innovation meets historical heritage.',
      author: language === 'de' ? 'Thomas Weber' : 'Thomas Weber',
      role: language === 'de' ? 'Digitalkünstler' : 'Digital Artist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5,
    },
    {
      id: 3,
      text: language === 'de' 
        ? 'Die Workshops haben mir völlig neue Perspektiven für meine Arbeit eröffnet.' 
        : 'The workshops have opened up completely new perspectives for my work.',
      author: language === 'de' ? 'Lena Meyer' : 'Lena Meyer',
      role: language === 'de' ? 'Studentin' : 'Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 5,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{t('testimonials.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="absolute -top-6 left-8">
              <div className="bg-gradient-to-r from-reform-cyan to-reform-purple p-4 rounded-2xl shadow-lg">
                <Quote size={32} className="text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-6">
              {/* Testimonial Content */}
              <div className="lg:col-span-2 space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`transition-all duration-700 ${
                      index === activeIndex ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8 absolute'
                    }`}
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/20 shadow-lg">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-foreground">{testimonial.author}</div>
                        <div className="text-sm text-foreground/70">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Large User Image */}
              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    {testimonials.map((testimonial, index) => (
                      <img 
                        key={testimonial.id}
                        src={testimonial.image}
                        alt={testimonial.author}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          index === activeIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-reform-cyan via-reform-purple to-reform-pink rounded-full opacity-20 animate-pulse"></div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center space-x-4">
                  <button 
                    className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeIndex 
                            ? 'bg-reform-cyan shadow-lg shadow-reform-cyan/50' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        onClick={() => goToIndex(index)}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm"
                    onClick={goToNext}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/20 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-reform-blue to-reform-cyan bg-clip-text text-transparent mb-3">25+</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Workshops' : 'Workshops'}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/20 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-reform-purple to-reform-pink bg-clip-text text-transparent mb-3">300+</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Teilnehmer' : 'Participants'}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/20 shadow-lg">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-reform-pink to-reform-orange bg-clip-text text-transparent mb-3">15+</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Digitale Projekte' : 'Digital Projects'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
