import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Maximize2, ArrowRight, X } from 'lucide-react';
import { VisionSlide } from './types';

const VisionCarousel = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const visionSlides: VisionSlide[] = [
    {
      id: 1,
      title: language === 'de' ? 'Moderne Innovation in historischem Umfeld' : 'Modern Innovation in Historic Setting',
      description: language === 'de' 
        ? 'Ein containerbasierter Workspace, der sich harmonisch in Wittenbergs historische Nachbarschaft einfügt und Vergangenheit mit Zukunft verbindet.' 
        : 'A container-based workspace that harmoniously integrates into Wittenberg\'s historic neighborhood, connecting past with future.',
      detailedDescription: language === 'de'
        ? 'Das Re:Form Hub verkörpert eine einzigartige Symbiose aus moderner Containerarchitektur und historischem Ambiente. Die nachhaltigen Materialien und durchdachte Bauweise schaffen einen innovativen Arbeitsraum, der sowohl funktional als auch ästhetisch ansprechend ist. Durch die modulare Bauweise können Räume flexibel angepasst und erweitert werden, während die Glasfronten für maximale Transparenz und Lichtdurchflutung sorgen.'
        : 'Re:Form Hub embodies a unique symbiosis of modern container architecture and historic ambiance. Sustainable materials and thoughtful construction create an innovative workspace that is both functional and aesthetically pleasing. The modular design allows for flexible adaptation and expansion of spaces, while glass fronts ensure maximum transparency and natural light.',
      image: '/lovable-uploads/5efbb8c7-0dbd-4c06-bb32-c8fe002885e6.png',
      category: language === 'de' ? 'Architektur' : 'Architecture',
      features: language === 'de' ? [
        'Nachhaltige Containerarchitektur',
        'Modulares Design für flexible Anpassung',
        'Maximale Transparenz durch Glasfronten',
        'Harmonische Integration in historisches Umfeld',
        'Energieeffiziente Bauweise'
      ] : [
        'Sustainable container architecture',
        'Modular design for flexible adaptation',
        'Maximum transparency through glass fronts',
        'Harmonious integration into historic environment',
        'Energy-efficient construction'
      ]
    },
    {
      id: 2,
      title: language === 'de' ? 'Strategische Partnerschaften' : 'Strategic Partnerships',
      description: language === 'de' 
        ? 'Zusammenarbeit mit führenden Technologieunternehmen und Finanzpartnern für nachhaltige Innovation und digitale Transformation.' 
        : 'Collaboration with leading technology companies and financial partners for sustainable innovation and digital transformation.',
      detailedDescription: language === 'de'
        ? 'Unser Netzwerk umfasst strategische Allianzen mit führenden Technologieunternehmen, Finanzinstituten und lokalen Bildungseinrichtungen. Diese Partnerschaften ermöglichen es uns, ein umfassendes Ökosystem für Innovation zu schaffen, das von der ersten Idee bis zur Marktreife alle Phasen der Unternehmensentwicklung unterstützt. Durch regelmäßige Networking-Events und Workshops fördern wir den Austausch zwischen Startups, etablierten Unternehmen und Investoren.'
        : 'Our network encompasses strategic alliances with leading technology companies, financial institutions, and local educational institutions. These partnerships enable us to create a comprehensive ecosystem for innovation that supports all phases of business development from initial idea to market readiness. Through regular networking events and workshops, we foster exchange between startups, established companies, and investors.',
      image: '/lovable-uploads/6b76c5f0-b6a7-4806-be04-fd9355737d69.png',
      category: language === 'de' ? 'Partnerschaften' : 'Partnerships',
      features: language === 'de' ? [
        'Führende Technologieunternehmen als Partner',
        'Zugang zu Finanzierungspartnern',
        'Kooperationen mit Bildungseinrichtungen',
        'Regelmäßige Networking-Events',
        'Mentoring und Beratungsprogramme'
      ] : [
        'Leading technology companies as partners',
        'Access to financing partners',
        'Collaborations with educational institutions',
        'Regular networking events',
        'Mentoring and consulting programs'
      ]
    },
    {
      id: 3,
      title: language === 'de' ? 'Zentrale Lage & Erreichbarkeit' : 'Central Location & Accessibility',
      description: language === 'de' 
        ? 'Strategisch positioniert an der Straße der Befreiung für optimale Sichtbarkeit und einfachen Zugang für alle Bürger:innen.' 
        : 'Strategically positioned on Straße der Befreiung for optimal visibility and easy access for all citizens.',
      detailedDescription: language === 'de'
        ? 'Die Lage an der Straße der Befreiung bietet nicht nur eine hervorragende Sichtbarkeit, sondern auch eine symbolische Verbindung zur Geschichte Wittenbergs. Mit direkter Anbindung an öffentliche Verkehrsmittel, ausreichend Parkplätzen und barrierearmen Zugängen ist das Re:Form Hub für alle Besucher leicht erreichbar. Die zentrale Lage ermöglicht eine enge Vernetzung mit der lokalen Wirtschaft und Verwaltung.'
        : 'The location on Straße der Befreiung offers not only excellent visibility but also a symbolic connection to Wittenberg\'s history. With direct connection to public transport, ample parking, and barrier-free access, Re:Form Hub is easily accessible for all visitors. The central location enables close networking with local businesses and administration.',
      image: '/lovable-uploads/2a946dda-f238-4b0f-b0bf-e72fe7fe345b.png',
      category: language === 'de' ? 'Standort' : 'Location',
      features: language === 'de' ? [
        'Strategische Lage an der Straße der Befreiung',
        'Direkter Anschluss an öffentliche Verkehrsmittel',
        'Ausreichend Parkplätze verfügbar',
        'Barrierefreier Zugang für alle',
        'Zentrale Lage in Wittenberg'
      ] : [
        'Strategic location on Straße der Befreiung',
        'Direct connection to public transport',
        'Ample parking available',
        'Barrier-free access for all',
        'Central location in Wittenberg'
      ]
    },
    {
      id: 4,
      title: language === 'de' ? 'Lebendiger Kreativraum' : 'Vibrant Creative Space',
      description: language === 'de' 
        ? 'Ein offener, transparenter Arbeitsplatz mit modernster Ausstattung, der Kollaboration und Innovation in einer inspirierenden Atmosphäre fördert.' 
        : 'An open, transparent workspace with state-of-the-art equipment that promotes collaboration and innovation in an inspiring atmosphere.',
      detailedDescription: language === 'de'
        ? 'Der Innenraum des Re:Form Hub ist darauf ausgelegt, Kreativität und Produktivität zu maximieren. Flexible Arbeitsbereiche können je nach Bedarf umgestaltet werden, von Einzelarbeitsplätzen bis hin zu großen Kollaborationsflächen. Modernste Technik, ergonomische Möbel und eine durchdachte Beleuchtung schaffen optimale Arbeitsbedingungen. Entspannungsbereiche und eine Gemeinschaftsküche fördern den informellen Austausch zwischen den Nutzern.'
        : 'The interior of Re:Form Hub is designed to maximize creativity and productivity. Flexible work areas can be reconfigured as needed, from individual workstations to large collaboration spaces. State-of-the-art technology, ergonomic furniture, and thoughtful lighting create optimal working conditions. Relaxation areas and a communal kitchen encourage informal exchange between users.',
      image: '/lovable-uploads/232b3df4-791b-4cf4-9080-4d9526309077.png',
      category: language === 'de' ? 'Arbeitsplatz' : 'Workspace',
      features: language === 'de' ? [
        'Flexible und rekonfigurierbare Arbeitsbereiche',
        'Modernste technische Ausstattung',
        'Ergonomische Möbel und Beleuchtung',
        'Entspannungsbereiche für Pausen',
        'Gemeinschaftsküche für informellen Austausch'
      ] : [
        'Flexible and reconfigurable work areas',
        'State-of-the-art technical equipment',
        'Ergonomic furniture and lighting',
        'Relaxation areas for breaks',
        'Communal kitchen for informal exchange'
      ]
    },
  ];

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleLearnMore = () => {
    setShowLearnMore(!showLearnMore);
  };

  return (
    <>
      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={toggleFullscreen}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 z-10"
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <img
              src={visionSlides[activeIndex].image}
              alt={visionSlides[activeIndex].title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-r from-reform-cyan to-reform-purple p-2 rounded-xl">
                  <div className="w-4 h-4 bg-white rounded opacity-80"></div>
                </div>
                <p className="text-white/80 text-sm font-medium">{visionSlides[activeIndex].category}</p>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">{visionSlides[activeIndex].title}</h3>
              <p className="text-white/90 text-lg">{visionSlides[activeIndex].description}</p>
            </div>
          </div>
        </div>
      )}

      <div className={`relative transition-all duration-700 ${isExpanded ? 'fixed inset-4 z-50 bg-background/95 backdrop-blur-xl rounded-3xl' : ''}`}>
        {isExpanded && (
          <div className="absolute inset-0 bg-gradient-to-br from-reform-cyan/5 via-reform-purple/5 to-reform-pink/5 rounded-3xl"></div>
        )}
        
        <div className={`relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden ${isExpanded ? 'h-full p-8' : 'p-4 md:p-8'}`}>
          
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
            
            <div className="flex space-x-2">
              <button
                onClick={toggleExpanded}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm border border-white/20"
                title={isExpanded ? (language === 'de' ? 'Verkleinern' : 'Minimize') : (language === 'de' ? 'Erweitern' : 'Expand')}
              >
                <Maximize2 size={20} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-foreground transition-all duration-300 backdrop-blur-sm border border-white/20"
                title={language === 'de' ? 'Vollbild anzeigen' : 'Show fullscreen'}
              >
                <Maximize2 size={20} className="rotate-45" />
              </button>
            </div>
          </div>

          <div className={`grid ${isExpanded ? 'grid-cols-1 lg:grid-cols-2 gap-12 h-[calc(100%-120px)]' : 'grid-cols-1 lg:grid-cols-5 gap-8'} items-center`}>
            
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
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
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
                    
                    {showLearnMore && (
                      <div className="space-y-4 animate-fade-in">
                        <p className={`text-foreground/70 leading-relaxed ${isExpanded ? 'text-base' : 'text-sm'}`}>
                          {slide.detailedDescription}
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className={`font-semibold text-foreground ${isExpanded ? 'text-lg' : 'text-base'}`}>
                            {language === 'de' ? 'Highlights:' : 'Key Features:'}
                          </h4>
                          <ul className="space-y-1">
                            {slide.features.map((feature, idx) => (
                              <li key={idx} className={`text-foreground/70 flex items-start space-x-2 ${isExpanded ? 'text-base' : 'text-sm'}`}>
                                <span className="text-reform-cyan mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={toggleLearnMore}
                      className="flex items-center space-x-3 text-reform-cyan hover:text-reform-purple transition-colors duration-300 group"
                    >
                      <span className="font-medium">
                        {showLearnMore 
                          ? (language === 'de' ? 'Weniger anzeigen' : 'Show less')
                          : (language === 'de' ? 'Mehr erfahren' : 'Learn more')
                        }
                      </span>
                      <ArrowRight 
                        size={16} 
                        className={`transition-transform duration-300 ${showLearnMore ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
    </>
  );
};

export default VisionCarousel;