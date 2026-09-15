
import { useEffect } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import Header from '@/components/Header';
import { LanguageProvider } from '@/contexts/LanguageContext';

const works = [
  {
    id: 'odyssey',
    title: 'Life Is an Odyssey',
    format: 'AI-assisted fictional commercial film · 2026',
    embedUrl: 'https://www.youtube.com/embed/MgCVK6PFNX0',
    description:
      'A fictional commercial film that reimagines Homer\'s Odyssey in contemporary Istanbul. Developed as an AI-native cinematic experiment, combining mythological costume, urban realism and advertising language.',
  },
  {
    id: 'vahit',
    title: 'Vahit Abi Vampir Oldu (Vahit Abi Became a Vampire)',
    format: 'AI film project — elevator pitch · 2026',
    embedUrl: 'https://www.youtube.com/embed/eu0w5tIHQ6I',
    description:
      'An elevator pitch for a supernatural neighbourhood comedy set in Istanbul. When the most dependable man in the mahalle becomes a vampire, his friends try to keep both his secret and his humanity intact.',
  },
];

const Portfolio = () => {
  useEffect(() => {
    document.title = 'Selected Moving-Image Work — Mehmet Dadal Ercan';
    return () => {
      document.title = 'Re:Form Hub — Creative Innovation Space in Wittenberg';
    };
  }, []);

  return (
    <LanguageProvider>
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <Header />

      <main className="container max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Page header */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-reform-cyan mb-4">
            Films
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            <span className="text-gradient heading-glow">Selected Moving-Image Work</span>
          </h1>
        </div>

        {/* Films */}
        <div className="space-y-16 md:space-y-20">
          {works.map((work) => (
            <article
              key={work.id}
              className="glassmorphism rounded-2xl p-5 sm:p-8 md:p-10 transition-shadow duration-300 hover:shadow-xl hover:shadow-reform-cyan/10"
            >
              <div className="mb-6">
                <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-reform-cyan/80 mb-2">
                  {work.format}
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">
                  {work.title}
                </h2>
              </div>

              <div className="relative z-10 w-full aspect-video rounded-xl overflow-hidden border border-white/10 dark:border-reform-cyan/20 shadow-lg select-none">
                <iframe
                  src={work.embedUrl}
                  title={work.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <p className="mt-6 text-base md:text-lg text-foreground/80 leading-relaxed">
                {work.description}
              </p>
            </article>
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 md:my-24 h-px bg-gradient-to-r from-transparent via-reform-cyan/30 to-transparent" />

        {/* About */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            <span className="text-gradient heading-glow">About</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
            Mehmet Dadal Ercan is a Berlin- and Lutherstadt Wittenberg-based filmmaker and visual anthropologist.
            His work explores everyday rituals, migration, belonging, humour and the unreal within ordinary life.
            He works across documentary, fiction and AI-native moving-image production.
          </p>
        </section>

        {/* Connect */}
        <section className="mb-20 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
            <span className="text-gradient heading-glow">Connect</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.linkedin.com/in/mehmet-ercan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-border/60 bg-background/80 hover:bg-reform-cyan/10 hover:border-reform-cyan/40 transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-foreground/70 group-hover:text-reform-cyan transition-colors" />
              <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/mehmetdadalercan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-border/60 bg-background/80 hover:bg-reform-pink/10 hover:border-reform-pink/40 transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 text-foreground/70 group-hover:text-reform-pink transition-colors" />
              <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground">Instagram</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm md:text-base text-foreground/60">
            Mehmet Dadal Ercan · Filmmaker, Visual Anthropologist & AI-Native Storyteller · Berlin / Lutherstadt Wittenberg
          </p>
        </div>
      </footer>
    </div>
    </LanguageProvider>
  );
};

export default Portfolio;
