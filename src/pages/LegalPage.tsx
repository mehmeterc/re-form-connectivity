import { ReactNode, useEffect } from 'react';
import Header from '@/components/Header';
import LegalLinks from '@/components/LegalLinks';
import { LanguageProvider } from '@/contexts/LanguageContext';

const LegalPage = ({ title, children }: { title: string; children: ReactNode }) => {
  useEffect(() => {
    document.title = `${title} — Re:Form Hub`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />
        <main className="container max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">
            <span className="text-gradient heading-glow">{title}</span>
          </h1>
          <div className="glassmorphism rounded-2xl p-6 sm:p-10 space-y-6 text-foreground/85 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8">
            {children}
          </div>
        </main>
        <footer className="border-t border-border/50 py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">© 2025 Re:Form Hub</p>
            <LegalLinks />
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default LegalPage;
