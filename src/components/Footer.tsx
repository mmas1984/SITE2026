import React from 'react';
import { Linkedin, ArrowUp, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenDeployGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-900 gap-6">
          <div>
            <span className="text-base font-bold text-white tracking-tight block">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Especialista em Dados & Business Intelligence. Modelagem dimensional, auditoria analítica e governança para os setores público e privado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#solucoes" className="hover:text-slate-200 transition-colors">
              Soluções
            </a>
            <a href="#powerbi-showcase" className="hover:text-slate-200 transition-colors">
              Dashboards
            </a>
            <a href="#cases" className="hover:text-slate-200 transition-colors">
              Casos & DAX
            </a>
            <a href="#stack" className="hover:text-slate-200 transition-colors">
              Stack Técnica
            </a>
            <a href="#artigos" className="hover:text-slate-200 transition-colors">
              Artigos Técnicos
            </a>
            <a href="#diagnostico" className="hover:text-slate-200 transition-colors">
              Diagnóstico
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800 self-end md:self-auto cursor-pointer"
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-[11px] flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Marcos Silveira. Todos os direitos reservados.</span>
            {onOpenDeployGuide && (
              <>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <button
                  onClick={onOpenDeployGuide}
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer transition-colors"
                >
                  Guia Deploy GitHub (HTTPS)
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <span>Conectar no LinkedIn</span>
            </a>

            <span aria-hidden="true" className="text-slate-800">·</span>

            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PERSONAL_INFO.location}</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
