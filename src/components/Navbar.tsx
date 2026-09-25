import React, { useState } from 'react';
import { Menu, X, Linkedin, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Dashboards', href: '#powerbi-showcase' },
    { label: 'Cases & DAX', href: '#cases' },
    { label: 'Stack Técnica', href: '#stack' },
    { label: 'Artigos', href: '#artigos' },
    { label: 'Diagnóstico', href: '#diagnostico' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark (Display face, clean, anti-slop) */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
        >
          Marcos Silveira
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-300 transition-colors hover:underline underline-offset-4 decoration-amber-400/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acessar perfil do LinkedIn de Marcos Silveira"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            title="LinkedIn Oficial"
          >
            <Linkedin className="w-4 h-4 text-[#0a66c2]" />
          </a>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all shadow-sm hover:shadow-amber-400/10 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Agendar Diagnóstico</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-md"
          >
            Contato
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-amber-400 py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <span>Conectar no LinkedIn</span>
            </a>
            <span className="text-xs text-slate-500">{PERSONAL_INFO.location}</span>
          </div>
        </div>
      )}
    </header>
  );
};
