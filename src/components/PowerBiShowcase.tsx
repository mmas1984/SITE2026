import React, { useState, useRef } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react';
import { PERSONAL_INFO, FEATURED_DASHBOARD_METRICS, CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy } from '../types';

export const PowerBiShowcase: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'publico' | 'privado'>('publico');
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0]);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Fullscreen request failed', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredCases = CASE_STUDIES.filter((c) => c.sector === activeTab);

  return (
    <section id="powerbi-showcase" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            {/* Header kicker with Power BI Official Logo branding */}
            <div className="flex items-center gap-2.5 mb-3">
              {/* Official Power BI Logo SVG */}
              <svg 
                className="w-6 h-6 flex-shrink-0" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Logotipo Microsoft Power BI"
              >
                <path d="M26 10H20V27H26C27.1046 27 28 26.1046 28 25V12C28 10.8954 27.1046 10 26 10Z" fill="#F2C811"/>
                <path d="M19 5H13V27H19V5Z" fill="#E6AD00"/>
                <path d="M12 15H6C4.89543 15 4 15.8954 4 17V25C4 26.1046 4.89543 27 6 27H12V15Z" fill="#F2C811"/>
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Microsoft Power BI Embed
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Ambiente de Demonstração em Produção</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Dashboard Interativo ao Vivo
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2">
              Explore o modelo analítico real incorporado abaixo. Navegue por filtros, métricas segmentadas e hierarquias desenvolvidas sob rigorosa arquitetura dimensional.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Recarregar relatório"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recarregar</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Alternar tela cheia"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}</span>
            </button>

            <a
              href={PERSONAL_INFO.powerBiEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
              title="Abrir diretamente no Power BI Service"
            >
              <span>Abrir no Power BI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Power BI Embed Container */}
        <div 
          ref={containerRef}
          className={`relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl transition-all ${
            isFullscreen ? 'p-0 w-full h-full bg-slate-950' : 'aspect-[16/9] w-full'
          }`}
        >
          {/* Subtle loading placeholder backdrop behind iframe */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-500 z-0">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <svg 
                className="w-5 h-5 animate-pulse" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26 10H20V27H26C27.1046 27 28 26.1046 28 25V12C28 10.8954 27.1046 10 26 10Z" fill="#F2C811"/>
                <path d="M19 5H13V27H19V5Z" fill="#E6AD00"/>
                <path d="M12 15H6C4.89543 15 4 15.8954 4 17V25C4 26.1046 4.89543 27 6 27H12V15Z" fill="#F2C811"/>
              </svg>
              <span>Conectando ao Power BI Service...</span>
            </div>
          </div>

          <iframe
            key={iframeKey}
            title="Marcos Silveira - Dashboard Executivo Power BI"
            src={PERSONAL_INFO.powerBiEmbedUrl}
            className="relative z-10 w-full h-full border-0"
            allowFullScreen={true}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        {/* Technical Solution Sheet (Ficha Técnica) */}
        <div className="mt-8 p-6 rounded-xl bg-slate-900/40 border border-slate-800/80">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Ficha Técnica de Engenharia & Performance</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Especificação do modelo dimensional e parâmetros de entrega executiva.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-amber-400 font-mono">
              <span>Single Person Maintainable</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_DASHBOARD_METRICS.businessPillars.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-xs text-slate-400 block">{item.label}</span>
                <span className="text-sm font-semibold text-slate-200 block">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies Explorer: Public and Private Sector */}
        <div id="cases" className="mt-20 scroll-mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Portfólio Estruturado
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Casos de Aplicação & Código em Produção
              </h3>
            </div>

            {/* Filter buttons (Interactive segment controls allowed per rule 1.A) */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => {
                  setActiveTab('publico');
                  const firstPublic = CASE_STUDIES.find(c => c.sector === 'publico');
                  if (firstPublic) setSelectedCase(firstPublic);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'publico' 
                    ? 'bg-amber-400 text-slate-950 font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Setor Público & Auditoria
              </button>
              <button
                onClick={() => {
                  setActiveTab('privado');
                  const firstPriv = CASE_STUDIES.find(c => c.sector === 'privado');
                  if (firstPriv) setSelectedCase(firstPriv);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === 'privado' 
                    ? 'bg-amber-400 text-slate-950 font-semibold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Setor Privado & BI
              </button>
            </div>
          </div>

          {/* Case selector grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredCases.map((cs) => {
              const isSelected = selectedCase.id === cs.id;
              return (
                <div
                  key={cs.id}
                  onClick={() => setSelectedCase(cs)}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-400/80 shadow-md ring-1 ring-amber-400/20'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{cs.clientType}</span>
                    <span className="font-mono text-amber-400">{cs.stack[0]}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{cs.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {cs.summary}
                  </p>
                  
                  {/* Highlights */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                    {cs.impactMetrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                        <div className="font-semibold text-slate-100 font-mono text-xs truncate mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Case Deep-Dive Inspector */}
          {selectedCase && (
            <div className="p-6 sm:p-8 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span>{selectedCase.clientType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize text-amber-400">Setor {selectedCase.sector}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {selectedCase.title}
                  </h4>
                </div>
                
                {/* Tech tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCase.stack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Challenge vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>O Desafio de Negócio</span>
                  </h5>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                    {selectedCase.challenge}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>A Solução de Engenharia & BI</span>
                  </h5>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              {/* Architecture Blueprint */}
              <div className="mb-8">
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pipeline & Arquitetura de Dados</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 font-mono text-[11px]">01. Ingestão / Fontes</span>
                    <span className="text-slate-200 leading-snug block">{selectedCase.architecture.sources}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 font-mono text-[11px]">02. Limpeza / ETL</span>
                    <span className="text-slate-200 leading-snug block">{selectedCase.architecture.etl}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 font-mono text-[11px]">03. Modelagem Star Schema</span>
                    <span className="text-slate-200 leading-snug block">{selectedCase.architecture.model}</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-1 font-mono text-[11px]">04. Entrega / Visual</span>
                    <span className="text-slate-200 leading-snug block">{selectedCase.architecture.viz}</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet Inspector */}
              {selectedCase.sampleDaxOrSql && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedCase.sampleDaxOrSql.title} ({selectedCase.sampleDaxOrSql.type})</span>
                    </h5>
                    <button
                      onClick={() => handleCopyCode(selectedCase.sampleDaxOrSql!.code, selectedCase.id)}
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCodeId === selectedCase.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Código</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300/90 overflow-x-auto leading-relaxed">
                    <code>{selectedCase.sampleDaxOrSql.code}</code>
                  </pre>
                  <p className="text-xs text-slate-400 mt-2 italic">
                    {selectedCase.sampleDaxOrSql.explanation}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
