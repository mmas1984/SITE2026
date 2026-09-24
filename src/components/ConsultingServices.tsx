import React from 'react';
import { ShieldCheck, BarChart3, Cpu, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ConsultingServicesProps {
  onOpenContact: () => void;
}

export const ConsultingServices: React.FC<ConsultingServicesProps> = ({ onOpenContact }) => {
  const services = [
    {
      number: '01',
      title: 'Diagnóstico & Refatoração de Performance em Power BI',
      sector: 'Público & Privado',
      description: 'Auditoria minuciosa de arquivos .pbix, otimização de modelos com alto consumo de memória RAM, eliminação de bi-direcionalidade e reescrita de medidas DAX lentas para ganho de velocidade de até 10x.',
      deliverables: [
        'Relatório de diagnóstico de cardinalidade e VertiPaq Analyzer',
        'Refatoração para Star Schema puro (1:N)',
        'Reescrita de fórmulas CALCULATE e Time Intelligence',
        'Documentação de medidas e dicionário de dados',
      ],
      idealFor: 'Organizações com relatórios lentos, pesados ou que frequentemente travam.',
    },
    {
      number: '02',
      title: 'Dashboards Executivos Ponta a Ponta (C-Level & Diretorias)',
      sector: 'Setor Privado',
      description: 'Desenvolvimento completo de painéis de tomada de decisão: DRE Gerencial multinível, controle diário de margem por produto/canal, previsibilidade financeira e indicadores operacionais estratégicos.',
      deliverables: [
        'Extração e views analíticas direto no banco SQL',
        'Matriz contábil hierárquica personalizada no Power BI',
        'Configuração de Gateway e atualizações programadas',
        'Treinamento executivo para diretores e analistas',
      ],
      idealFor: 'Empresas que precisam enxergar margens e resultados no D+1 com segurança.',
    },
    {
      number: '03',
      title: 'Auditoria Contínua & Portais de Transparência Pública',
      sector: 'Setor Público',
      description: 'Estruturação de painéis de controle interno e conformidade fiscal: cruzamento analítico de folha de pagamento, acompanhamento de limites da LRF, teto constitucional e portais cidadãos em conformidade com a LAI e LGPD.',
      deliverables: [
        'Pipeline automatizado de cruzamento de folhas e empenhos',
        'Painel de auditoria preventiva com matriz de alertas',
        'Portal de transparência web interativo via Power BI Embed',
        'Adequação técnica aos critérios dos Tribunais de Contas',
      ],
      idealFor: 'Prefeituras, Câmaras, Autarquias e Consórcios Públicos.',
    },
    {
      number: '04',
      title: 'Automação Operacional Serverless & Google Apps Script',
      sector: 'Público & Privado',
      description: 'Eliminação radical de tarefas manuais repetitivas: sincronização automática entre sistemas de vendas, planilhas e bancos, disparo diário de relatórios em PDF para a diretoria com zero custo de servidor.',
      deliverables: [
        'Scripts acionados por tempo (Triggers) em nuvem Google',
        'Endpoints Webhook para recepção de eventos de sistemas',
        'Consolidação de bases e envio automatizado de emails com KPIs',
        'Arquitetura de baixíssima manutenção por uma única pessoa',
      ],
      idealFor: 'Equipes que perdem 10 a 20 horas semanais compilando planilhas manuais.',
    },
  ];

  return (
    <section id="solucoes" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Modelos de Atuação
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Serviços de Consultoria & Engenharia Analítica
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
              Formatos de contratação orientados a entregas práticas, com escopo claro e soluções desenvolvidas para operar de forma autônoma e sustentável.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 self-start cursor-pointer"
          >
            <span>Consultar Disponibilidade de Agenda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((svc) => (
            <div
              key={svc.number}
              className="p-7 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-mono text-amber-400 font-bold text-sm">{svc.number}.</span>
                  <span className="text-slate-400 font-medium">{svc.sector}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug">
                  {svc.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {svc.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Entregáveis do Projeto:
                  </span>
                  {svc.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for box */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 italic">
                  <strong>Indicado para:</strong> {svc.idealFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Engagement Flow */}
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-2">
            Metodologia de Entrega & Garantia de Continuidade
          </h3>
          <p className="text-xs text-slate-400 mb-8 max-w-2xl">
            Todo projeto é executado com foco em transferência de conhecimento e independência do cliente. Você não fica refém de contratos de suporte obscuros.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-amber-400 font-mono font-bold text-sm mb-1">Passo 01</div>
              <h4 className="font-bold text-slate-200 mb-1">Diagnóstico & Escopo</h4>
              <p className="text-slate-400 leading-relaxed">
                Mapeamento das regras de negócio, análise de bases e definição das métricas prioritárias.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-amber-400 font-mono font-bold text-sm mb-1">Passo 02</div>
              <h4 className="font-bold text-slate-200 mb-1">Engenharia & Modelagem</h4>
              <p className="text-slate-400 leading-relaxed">
                Estruturação do Star Schema, criação de views SQL e desenvolvimento de medidas DAX eficientes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-amber-400 font-mono font-bold text-sm mb-1">Passo 03</div>
              <h4 className="font-bold text-slate-200 mb-1">Homologação Técnica</h4>
              <p className="text-slate-400 leading-relaxed">
                Validação cruzada de totais com a equipe gestora, testes de estresse e conferência de centavos.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-amber-400 font-mono font-bold text-sm mb-1">Passo 04</div>
              <h4 className="font-bold text-slate-200 mb-1">Publicação & Treinamento</h4>
              <p className="text-slate-400 leading-relaxed">
                Configuração de agendamentos, segurança RLS, entrega do código-fonte e capacitação do time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
