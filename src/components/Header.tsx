
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#features', label: t('nav.features') },
    { href: '#events', label: t('nav.events') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-expo-out ${
        isScrolled ? 'py-3 glassmorphism shadow-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <h1 className="reformed-logo text-2xl sm:text-3xl">Re:Form Hub</h1>
          </a>
        </div>

        {/* Desktop navigation hidden on mobile */}
        <nav className="hidden md:hidden items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-reform-teal dark:hover:text-reform-cyan transition-colors relative after:absolute after:w-full after:h-0.5 after:bg-reform-teal dark:after:bg-reform-cyan after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <LanguageToggle />
          <button
            className="ml-4 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 glassmorphism shadow-md transition-all duration-300 ease-expo-out ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground/80 hover:text-reform-teal dark:hover:text-reform-cyan py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
