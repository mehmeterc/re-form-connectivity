
import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Maximize2, ArrowRight } from 'lucide-react';

interface VisionSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Testimonials = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const visionSlides: VisionSlide[] = [
    {
      id: 1,
      title: language === 'de' ? 'Moderne Innovation in historischem Umfeld' : 'Modern Innovation in Historic Setting',
      description: language === 'de' 
        ? 'Ein containerbasierter Workspace, der sich harmonisch in Wittenbergs historische Nachbarschaft einfügt und Vergangenheit mit Zukunft verbindet.' 
        : 'A container-based workspace that harmoniously integrates into Wittenberg\'s historic neighborhood, connecting past with future.',
      image: '/lovable-uploads/5efbb8c7-0dbd-4c06-bb32-c8fe002885e6.png',
      category: language === 'de' ? 'Architektur' : 'Architecture',
    },
    {
      id: 2,
      title: language === 'de' ? 'Strategische Partnerschaften' : 'Strategic Partnerships',
      description: language === 'de' 
        ? 'Zusammenarbeit mit führenden Technologieunternehmen und Finanzpartnern für nachhaltige Innovation und digitale Transformation.' 
        : 'Collaboration with leading technology companies and financial partners for sustainable innovation and digital transformation.',
      image: '/lovable-uploads/6b76c5f0-b6a7-4806-be04-fd9355737d69.png',
      category: language === 'de' ? 'Partnerschaften' : 'Partnerships',
    },
    {
      id: 3,
      title: language === 'de' ? 'Zentrale Lage & Erreichbarkeit' : 'Central Location & Accessibility',
      description: language === 'de' 
        ? 'Strategisch positioniert an der Straße der Befreiung für optimale Sichtbarkeit und einfachen Zugang für alle Bürger:innen.' 
        : 'Strategically positioned on Straße der Befreiung for optimal visibility and easy access for all citizens.',
      image: '/lovable-uploads/2a946dda-f238-4b0f-b0bf-e72fe7fe345b.png',
      category: language === 'de' ? 'Standort' : 'Location',
    },
    {
      id: 4,
      title: language === 'de' ? 'Lebendiger Kreativraum' : 'Vibrant Creative Space',
      description: language === 'de' 
        ? 'Ein offener, transparenter Arbeitsplatz mit modernster Ausstattung, der Kollaboration und Innovation in einer inspirierenden Atmosphäre fördert.' 
        : 'An open, transparent workspace with state-of-the-art equipment that promotes collaboration and innovation in an inspiring atmosphere.',
      image: '/lovable-uploads/232b3df4-791b-4cf4-9080-4d9526309077.png',
      category: language === 'de' ? 'Arbeitsplatz' : 'Workspace',
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
    if (!isExpanded) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % visionSlides.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [visionSlides.length, isExpanded]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + visionSlides.length) % visionSlides.length);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % visionSlides.length);
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="section-transition py-24 relative bg-white/[0.02] dark:bg-transparent"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-pink/10"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient heading-glow">
              {language === 'de' ? 'Unsere Vision' : 'Our Vision'}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            {language === 'de' 
              ? 'Entdecken Sie unsere Vision für Re:Form Hub - wo Innovation auf Tradition trifft'
              : 'Discover our vision for Re:Form Hub - where innovation meets tradition'
            }
          </p>
        </div>

        <div className={`relative transition-all duration-700 ${isExpanded ? 'fixed inset-4 z-50 bg-background/95 backdrop-blur-xl rounded-3xl' : ''}`}>
          {isExpanded && (
            <div className="absolute inset-0 bg-gradient-to-br from-reform-cyan/5 via-reform-purple/5 to-reform-pink/5 rounded-3xl"></div>
          )}
          
          {/* Main Carousel Container */}
          <div className={`relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden ${isExpanded ? 'h-full p-8' : 'p-4 md:p-8'}`}>
            
            {/* Carousel Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-reform-cyan to-reform-purple p-2 rounded-xl">
                  <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Re:Form Hub Vision</h3>
                  <p className="text-sm text-foreground/60">{visionSlides[activeIndex].category}</p>
                </div>
              </div>
              
              <button
                onClick={toggleExpanded}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <Maximize2 size={20} />
              </button>
            </div>

            {/* Carousel Content */}
            <div className={`grid ${isExpanded ? 'grid-cols-1 lg:grid-cols-2 gap-12 h-[calc(100%-120px)]' : 'grid-cols-1 lg:grid-cols-5 gap-8'} items-center`}>
              
              {/* Image Section */}
              <div className={`relative ${isExpanded ? 'order-2 lg:order-1' : 'lg:col-span-3'}`}>
                <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${isExpanded ? 'h-full min-h-[400px]' : 'aspect-[16/10]'}`}>
                  {visionSlides.map((slide, index) => (
                    <img
                      key={slide.id}
                      src={slide.image}
                      alt={slide.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                        index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    />
                  ))}
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      <p className="text-white text-sm font-medium">{visionSlides[activeIndex].category}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={goToPrevious}
                        className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all duration-300"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={goToNext}
                        className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-all duration-300"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`space-y-8 ${isExpanded ? 'order-1 lg:order-2 flex flex-col justify-center' : 'lg:col-span-2'}`}>
                {visionSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`transition-all duration-700 ${
                      index === activeIndex ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8 absolute'
                    }`}
                  >
                    <div className="space-y-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-reform-cyan/20 to-reform-purple/20 text-sm font-medium text-foreground border border-white/20">
                        {slide.category}
                      </div>
                      
                      <h3 className={`font-bold text-foreground leading-tight ${isExpanded ? 'text-3xl' : 'text-xl md:text-2xl'}`}>
                        {slide.title}
                      </h3>
                      
                      <p className={`text-foreground/80 leading-relaxed ${isExpanded ? 'text-lg' : 'text-base'}`}>
                        {slide.description}
                      </p>
                      
                      <div className="flex items-center space-x-3 text-reform-cyan hover:text-reform-purple transition-colors duration-300 cursor-pointer">
                        <span className="font-medium">
                          {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                        </span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center items-center space-x-6 mt-8">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-2">
                {visionSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeIndex 
                        ? 'w-8 h-3 bg-gradient-to-r from-reform-cyan to-reform-purple shadow-lg' 
                        : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => goToIndex(index)}
                  />
                ))}
              </div>
              
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Vision Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-blue to-reform-cyan bg-clip-text text-transparent mb-2">2024</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Projektstart' : 'Project Launch'}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-purple to-reform-pink bg-clip-text text-transparent mb-2">100+</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Community' : 'Community'}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-pink to-reform-orange bg-clip-text text-transparent mb-2">24/7</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Zugang' : 'Access'}</p>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-reform-cyan to-reform-blue bg-clip-text text-transparent mb-2">∞</div>
            <p className="text-foreground/80 font-medium">{language === 'de' ? 'Möglichkeiten' : 'Possibilities'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
