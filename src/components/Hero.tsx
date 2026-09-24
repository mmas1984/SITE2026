import React from 'react';
import { ArrowDown, Linkedin, Database, BarChart3, ShieldCheck, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed clean metadata kicker (Zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-6 tracking-wide">
          <span className="text-amber-400">Especialista em Dados & BI</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Setor Público & Privado</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Power BI, DAX, SQL, Google Apps Script</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Consultoria Independente</span>
        </div>

        {/* Marquee Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            Engenharia analítica e inteligência de dados para decisões de alto impacto.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-10">
            Atuação estratégica especializada na estruturação de pipelines de dados, modelagem dimensional e dashboards executivos. Soluções de alta precisão técnica desenhadas para atender os rigores de governança, auditoria e transparência no <strong className="text-white font-semibold">Setor Público</strong>, e a busca por margens, eficiência operacional e previsibilidade no <strong className="text-white font-semibold">Setor Privado</strong>.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#powerbi-showcase"
            className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all shadow-md hover:shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-slate-950" />
            <span>Ver Dashboard Power BI ao Vivo</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Solicitar Proposta de Consultoria</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all flex items-center gap-2"
            title="Perfil do LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-[#0a66c2]" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>

        {/* Dual Core Value Proposition: Public vs Private Sector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
          
          {/* Pillar 1: Setor Público */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Setor Público & Governança</h3>
                <p className="text-xs text-slate-400">Controle Interno, Auditoria Contínua & LAI</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Cruzamento massivo de bases salariais, controle de limites da LRF, detecção precoce de anomalias em licitações e portais de transparência pública em conformidade com o Tribunal de Contas e a LGPD.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span>Auditoria Contínua</span>
              <span aria-hidden="true">·</span>
              <span>Conformidade Fiscal</span>
              <span aria-hidden="true">·</span>
              <span>Portais Cidadãos</span>
              <span aria-hidden="true">·</span>
              <span>SIAFIC / Folha</span>
            </div>
          </div>

          {/* Pillar 2: Setor Privado */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Setor Privado & Controladoria</h3>
                <p className="text-xs text-slate-400">Business Intelligence, Margens & C-Level</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Modelagem dimensional para DRE Gerencial multinível, monitoramento de margem de contribuição por produto/canal, KPIs estratégicos de vendas e automação de fluxos diários sem custos de infraestrutura pesada.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span>DRE Gerencial Dinâmico</span>
              <span aria-hidden="true">·</span>
              <span>Star Schema Otimizado</span>
              <span aria-hidden="true">·</span>
              <span>Fechamento D+1</span>
              <span aria-hidden="true">·</span>
              <span>Apps Script</span>
            </div>
          </div>

        </div>

        {/* Quantitative Proof Markers (Claim-to-proof adjacency) */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 px-6 rounded-xl bg-slate-900/30 border border-slate-800/60">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">100%</div>
            <div className="text-xs text-slate-400 mt-1">Modelagem Star Schema em DAX e SQL</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono tabular-nums">D+1</div>
            <div className="text-xs text-slate-400 mt-1">Fechamento executivo automático diário</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">R$ 1.8M+</div>
            <div className="text-xs text-slate-400 mt-1">Inconformidades sanadas em auditorias</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-sky-400 font-mono tabular-nums">Zero</div>
            <div className="text-xs text-slate-400 mt-1">Gasto desnecessário com servidores caros</div>
          </div>
        </div>

      </div>
    </section>
  );
};
