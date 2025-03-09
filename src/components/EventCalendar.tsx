
import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar as CalendarIcon, Users, MapPin, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Event {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

const EventCalendar = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: language === 'de' ? 'KI-Workshop: Kreatives Schreiben' : 'AI Workshop: Creative Writing',
      date: new Date(2024, 6, 15),
      startTime: '14:00',
      endTime: '16:00',
      location: 'Stadtlabor Wittenberg',
      description: language === 'de' 
        ? 'Entdecke die Möglichkeiten von KI für kreatives Schreiben und erstelle deine eigenen Texte.'
        : 'Discover the possibilities of AI for creative writing and create your own texts.'
    },
    {
      id: 2,
      title: language === 'de' ? 'VR-Erlebnis: Wittenberg 2050' : 'VR Experience: Wittenberg 2050',
      date: new Date(2024, 6, 18),
      startTime: '15:00',
      endTime: '17:30',
      location: 'Stadtbibliothek Wittenberg',
      description: language === 'de'
        ? 'Tauche ein in eine virtuelle Vision der Zukunft von Wittenberg und gestalte mit.'
        : 'Immerse yourself in a virtual vision of Wittenberg\'s future and help shape it.'
    },
    {
      id: 3,
      title: language === 'de' ? 'Digitale Kunst & Fotografie' : 'Digital Art & Photography',
      date: new Date(2024, 6, 22),
      startTime: '10:00',
      endTime: '13:00',
      location: 'Stadtlabor Wittenberg',
      description: language === 'de'
        ? 'Workshop zur digitalen Bildbearbeitung und KI-gestützter Kunstgenerierung.'
        : 'Workshop on digital image editing and AI-assisted art generation.'
    }
  ];

  const selectedEvent = events.find(event => event.id === selectedEventId);
  const eventsOnSelectedDate = date 
    ? events.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];

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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedEventId(null);
  };

  const handleEventSelect = (id: number) => {
    setSelectedEventId(id);
  };

  const handleRSVP = (eventId: number) => {
    toast.success(language === 'de' 
      ? 'Anmeldung erfolgreich! Wir freuen uns auf dich.' 
      : 'RSVP successful! We look forward to seeing you.',
      {
        description: language === 'de'
          ? 'Weitere Details wurden an deine E-Mail gesendet.'
          : 'More details have been sent to your email.'
      }
    );
  };

  const isDateWithEvent = (date: Date) => {
    return events.some(
      event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="section-transition py-24 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-from)_0%,_transparent_70%)] from-reform-blue/10"></div>
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('events.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glassmorphism p-6 rounded-2xl">
            <div className="flex items-center mb-4 text-white/80">
              <CalendarIcon className="mr-2 h-5 w-5" />
              <span>{language === 'de' ? 'Veranstaltungen' : 'Events'}</span>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="bg-transparent pointer-events-auto"
              modifiers={{
                hasEvent: (date) => isDateWithEvent(date),
              }}
              modifiersClassNames={{
                hasEvent: 'has-event ring-2 ring-reform-orange/50 bg-reform-orange/10',
              }}
            />
          </div>

          <div className="glassmorphism p-6 rounded-2xl">
            <div className="flex items-center mb-4 text-white/80">
              <Users className="mr-2 h-5 w-5" />
              <span>{language === 'de' ? 'Details & Anmeldung' : 'Details & RSVP'}</span>
            </div>

            {eventsOnSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsOnSelectedDate.map(event => (
                  <div 
                    key={event.id}
                    className={`p-4 rounded-xl transition-all cursor-pointer ${
                      selectedEventId === event.id 
                        ? 'bg-white/10 shadow-lg' 
                        : 'bg-white/5 hover:bg-white/8'
                    }`}
                    onClick={() => handleEventSelect(event.id)}
                  >
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <div className="flex items-center text-sm text-white/60 mb-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    
                    {selectedEventId === event.id && (
                      <div className="mt-3 pt-3 border-t border-white/10 animate-slide-up">
                        <p className="text-sm text-white/70 mb-3">{event.description}</p>
                        <Button 
                          className="shimmer-button w-full bg-reform-orange hover:bg-reform-orange/90 text-white"
                          onClick={() => handleRSVP(event.id)}
                        >
                          {t('events.rsvp')}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-white/50">
                <CalendarIcon className="h-10 w-10 mb-4 opacity-30" />
                <p>{language === 'de' ? 'Keine Veranstaltungen an diesem Tag' : 'No events on this day'}</p>
                <p className="text-sm mt-2">{language === 'de' ? 'Wähle ein anderes Datum' : 'Please select another date'}</p>
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm text-white/70 mb-3">
                {t('events.location')}
              </p>
              <Button 
                className="shimmer-button w-full bg-reform-purple hover:bg-reform-purple/90 text-white animate-pulse-soft"
              >
                {t('events.cta')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
