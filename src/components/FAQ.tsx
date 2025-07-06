
import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
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

  const faqItems = [
    {
      question: t('faq.questions.q1'),
      answer: t('faq.questions.a1'),
    },
    {
      question: t('faq.questions.q2'),
      answer: t('faq.questions.a2'),
    },
    {
      question: t('faq.questions.q3'),
      answer: t('faq.questions.a3'),
    },
  ];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-transition py-24 relative bg-white/[0.02] dark:bg-transparent"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient heading-glow">{t('faq.title')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-reform-cyan to-reform-purple mx-auto rounded-full mb-6"></div>
        </div>

        <div className="glassmorphism p-6 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/20 shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-black/10 dark:border-white/10">
                <AccordionTrigger className="text-left text-lg py-5 text-black dark:text-white hover:text-black/80 dark:hover:text-white/80">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black/70 dark:text-white/70 pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
