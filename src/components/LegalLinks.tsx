import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const LegalLinks = ({ className }: { className?: string }) => (
  <nav className={cn('flex gap-6 text-sm text-foreground/60', className)} aria-label="Rechtliches">
    <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
    <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
  </nav>
);

export default LegalLinks;
