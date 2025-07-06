
import React, { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Partners from '@/components/Partners';
import Features from '@/components/Features';
import EventCalendar from '@/components/EventCalendar';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatButton from '@/components/ChatButton';

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-transition');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = (
          rect.top <= (window.innerHeight * 0.75) && 
          rect.bottom >= 0
        );
        
        if (isInView) {
          section.classList.add('in-view');
        }
      });
    };

    // Call once on load
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
        <Header />
        <Hero />
        <About />
        <Partners />
        <Features />
        <EventCalendar />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
        <ChatButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
