import React, { useState } from 'react';
import { Database, Code2, Server, Terminal, Copy, Check, FileSpreadsheet, Globe } from 'lucide-react';
import { CODE_SNIPPETS } from '../data/portfolioData';

export const StackSection: React.FC = () => {
  const [activeSnippetId, setActiveSnippetId] = useState(CODE_SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const selectedSnippet = CODE_SNIPPETS.find((s) => s.id === activeSnippetId) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stackItems = [
    {
      name: 'Power BI & DAX Avançado',
      icon: Terminal,
      category: 'Business Intelligence & Modelagem',
      details: 'Modelagem dimensional Star Schema estrita (1:N), eliminação de bi-direcionalidade, segurança a nível de linha (RLS), otimização de cardinalidade no mecanismo colunar VertiPaq e medidas escaláveis de Time Intelligence.',
    },
    {
      name: 'SQL (PostgreSQL / SQL Server / MySQL)',
      icon: Database,
      category: 'Engenharia de Dados & Consultas',
      details: 'Estruturação de consultas analíticas com CTEs recursivas, Window Functions analíticas (ROW_NUMBER, DENSE_RANK, LAG/LEAD), criação de Views consolidadas e procedimentos para pré-agregação de alto volume.',
    },
    {
      name: 'Power Query & M Language',
      icon: FileSpreadsheet,
      category: 'ETL & Ingestão',
      details: 'Tratamento de exceções, higienização de formatos de texto, desnormalização de tabelas analíticas com Query Folding ativado no banco de origem e parametrização de conexões para ambientes de homologação e produção.',
    },
    {
      name: 'Google Apps Script & Serverless',
      icon: Server,
      category: 'Automação & Integração',
      details: 'Desenvolvimento de rotinas serverless em JavaScript no Google Workspace para sincronização de dados de vendas/metas, disparo automatizado de relatórios em PDF para a diretoria e recepção de webhooks com custo zero de infraestrutura.',
    },
    {
      name: 'HTML5, CSS3 & JavaScript Moderno',
      icon: Globe,
      category: 'Front-end & Visualizações Customizadas',
      details: 'Construção de portais analíticos responsivos, custom visual extensions, dashboards web embutidos e páginas institucionais com integração direta a APIs públicas e portais de transparência governamental.',
    },
  ];

  return (
    <section id="stack" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            Rigor Técnico & Ferramentas
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Arquitetura de Dados Sustentável & Stack Principal
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Metodologia focada em eficiência analítica: infraestrutura leve, consultas otimizadas e pipelines que uma única pessoa opera e mantém com facilidade, sem dependência de ferramentas caras ou custos ocultos.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {stackItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{item.name}</h3>
                      <span className="text-[11px] text-slate-400 font-mono">{item.category}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Code Workbench */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 px-6 py-4 gap-4 bg-slate-900/90">
            <div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Workbench de Código em Produção</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Exemplos de fórmulas DAX, consultas SQL analíticas e rotinas de automação.
              </p>
            </div>

            {/* Snippet selector tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
              {CODE_SNIPPETS.map((snip) => (
                <button
                  key={snip.id}
                  onClick={() => setActiveSnippetId(snip.id)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                    activeSnippetId === snip.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {snip.badge}
                </button>
              ))}
            </div>
          </div>

          {/* Workbench Body */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-200">{selectedSnippet.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{selectedSnippet.description}</p>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 self-start cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Snippet</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800/90 text-xs sm:text-[13px] font-mono text-amber-200/90 overflow-x-auto leading-relaxed">
              <code>{selectedSnippet.code}</code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
};
