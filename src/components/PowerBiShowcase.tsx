import React, { useState, useRef, useEffect } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  ExternalLink,
  Vote,
  LayoutDashboard,
  Award,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, FEATURED_DASHBOARD_METRICS } from '../data/portfolioData';
import { FortalezaElectoralDashboard } from './FortalezaElectoralDashboard';

export const PowerBiShowcase: React.FC = () => {
  // Tab state between Power BI Embed and TRE/CE Fortaleza Dashboard
  const [selectedDashboard, setSelectedDashboard] = useState<'tre-ce' | 'powerbi'>('tre-ce');

  // Power BI embed states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check URL hash for direct tab linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#tre-ce' || hash === '#eleicoes-fortaleza') {
        setSelectedDashboard('tre-ce');
      } else if (hash === '#powerbi') {
        setSelectedDashboard('powerbi');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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

  return (
    <section id="powerbi-showcase" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div id="dashboards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Dashboard Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Portfólio Analítico · Business Intelligence & Geoanálise
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Elaborado por Marcos Silveira</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Dashboards & Modelagem de Dados
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2">
              Explore dashboards em produção desenvolvidos para tomada de decisão estratégica, cruzamento dimensional e análise geoespacial avançada.
            </p>
          </div>

          {/* Top-Level Dashboard Selector Tabs */}
          <div className="flex items-center p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setSelectedDashboard('tre-ce')}
              className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                selectedDashboard === 'tre-ce'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>Eleições Fortaleza (TRE/CE)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>

            <button
              onClick={() => setSelectedDashboard('powerbi')}
              className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                selectedDashboard === 'powerbi'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <svg 
                className="w-4 h-4 flex-shrink-0" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26 10H20V27H26C27.1046 27 28 26.1046 28 25V12C28 10.8954 27.1046 10 26 10Z" fill={selectedDashboard === 'powerbi' ? '#1e293b' : '#F2C811'}/>
                <path d="M19 5H13V27H19V5Z" fill={selectedDashboard === 'powerbi' ? '#0f172a' : '#E6AD00'}/>
                <path d="M12 15H6C4.89543 15 4 15.8954 4 17V25C4 26.1046 4.89543 27 6 27H12V15Z" fill={selectedDashboard === 'powerbi' ? '#1e293b' : '#F2C811'}/>
              </svg>
              <span>Power BI Executivo</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ABA 1: ELEIÇÕES FORTALEZA (TRE/CE) · GEOANÁLISE POR BAIRRO               */}
        {/* ========================================================================= */}
        {selectedDashboard === 'tre-ce' && (
          <div className="space-y-6">
            <FortalezaElectoralDashboard />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 2: POWER BI SERVICE EMBED AO VIVO                                    */}
        {/* ========================================================================= */}
        {selectedDashboard === 'powerbi' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2.5">
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
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Painel Executivo em Microsoft Power BI Service
                  </h3>
                  <p className="text-xs text-slate-400">
                    Relatório em produção conectado via Power BI Embedded com filtros dinâmicos e DAX otimizado.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Recarregar relatório"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recarregar</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Alternar tela cheia"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span>{isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}</span>
                </button>

                <a
                  href={PERSONAL_INFO.powerBiEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
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
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80">
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
          </div>
        )}

      </div>
    </section>
  );
};
