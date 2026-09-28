import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Star, 
  CheckCircle2, 
  ArrowUpRight, 
  Award, 
  BookOpen, 
  Building2, 
  Sparkles 
} from 'lucide-react';

interface CorporateTrainingProps {
  onOpenContact?: () => void;
}

export const CorporateTraining: React.FC<CorporateTrainingProps> = ({ onOpenContact }) => {
  const stats = [
    {
      id: 'colaboradores',
      value: '+500',
      label: 'Colaboradores Capacitados',
      sublabel: 'Gestores, analistas de negócios, auditores e tomadores de decisão',
      icon: Users,
      accentColor: 'text-amber-400',
      bgGlow: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'turmas',
      value: '+20',
      label: 'Turmas Concluídas',
      sublabel: 'Programas in-company presenciais e remotos ao vivo',
      icon: GraduationCap,
      accentColor: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'avaliacao',
      value: '4,5',
      maxValue: '/ 5,0',
      label: 'Média de Avaliação',
      sublabel: 'Índice de satisfação (CSAT/NPS) dos alunos e patrocinadores',
      icon: Star,
      accentColor: 'text-amber-300',
      bgGlow: 'bg-amber-400/10 border-amber-400/20',
      stars: 5,
    },
  ];

  const trainingModules = [
    {
      title: 'Power BI Executivo & Self-Service',
      target: 'Líderes, diretores e gestores de área',
      description: 'Capacitação focada em leitura estratégica de dados, navegação analítica, interpretação de KPIs e tomada de decisão sem dependência de TI.',
      topics: ['Storytelling com Dados', 'Interpretação de Alertas e Metas', 'Consumo em Mobile e Nuvem', 'Governança e RLS'],
    },
    {
      title: 'Modelagem Dimensional & DAX Aplicado',
      target: 'Analistas financeiros, contábeis e de BI',
      description: 'Imersão prática na construção de esquemas estrela (Star Schema), cálculo de inteligência temporal (Time Intelligence) e métricas dinâmicas.',
      topics: ['VertiPaq & Performance', 'CALCULATE & Filtros Contextuais', 'Power Query & Limpeza em M', 'Boas Práticas de Auditoria'],
    },
    {
      title: 'Auditoria & Transparência Pública',
      target: 'Servidores públicos e órgãos de controle',
      description: 'Formação especializada no monitoramento de despesas, folha salarial, conformidade com a LRF e automação de prestações de contas.',
      topics: ['Cruzamento de Empenhos e Folha', 'Detecção de Inconsistências', 'Painéis para Transparência Ativa', 'Exportação e Relatórios Oficiais'],
    },
  ];

  return (
    <section id="capacitacao" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Educação Corporativa & Cultura de Dados</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Capacitação Corporativa em Dados & BI
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
              Programas práticos de treinamento in-company desenhados para elevar a maturidade analítica da sua equipe — da liderança estratégica aos times técnicos de execução.
            </p>
          </div>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer self-start md:self-auto shrink-0 shadow-sm"
            >
              <span>Solicitar Proposta de Turma</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Highlighted Key Metrics requested by user */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-xl ${stat.bgGlow} border transition-transform group-hover:scale-105`}>
                      <Icon className={`w-6 h-6 ${stat.accentColor}`} />
                    </div>
                    {stat.id === 'avaliacao' && (
                      <div className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                        {[1, 2, 3, 4].map((i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        {/* Half star visual indicator */}
                        <div className="relative">
                          <Star className="w-3.5 h-3.5 text-slate-600" />
                          <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-4xl sm:text-5xl font-black tracking-tight ${stat.accentColor}`}>
                      {stat.value}
                    </span>
                    {stat.maxValue && (
                      <span className="text-xl sm:text-2xl font-bold text-slate-400">
                        {stat.maxValue}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stat.sublabel}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Validação Comprovada
                  </span>
                  <span className="font-mono text-slate-400">Metodologia Hands-on</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Training Tracks & Methodology Highlights */}
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                Trilhas Formativas Customizadas
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Como Funciona a Capacitação In-Company
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Presencial ou Remoto
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                Certificado Emitido
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingModules.map((mod, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Trilha {idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {mod.title}
                  </h4>
                  <div className="text-[11px] font-medium text-slate-400 mb-3 bg-slate-900 px-2 py-1 rounded inline-block">
                    Público: {mod.target}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {mod.description}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Principais Tópicos:
                  </span>
                  <ul className="space-y-1.5">
                    {mod.topics.map((t, tidx) => (
                      <li key={tidx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Differential Callout */}
          <div className="mt-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-semibold text-white block">
                  Treinamentos com Dados Reais da Sua Empresa ou Órgão Público
                </span>
                <span className="text-xs text-slate-400">
                  Os exercícios podem ser aplicados diretamente sobre as bases e relatórios do seu dia a dia, gerando dashboards úteis já durante as aulas.
                </span>
              </div>
            </div>

            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 whitespace-nowrap flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Conversar sobre formato</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
