import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, RotateCcw, AlertTriangle, ArrowRight, MessageSquare, Send } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS, PERSONAL_INFO } from '../data/portfolioData';

interface MaturityDiagnosticProps {
  onPreFillContact: (message: string) => void;
}

export const MaturityDiagnostic: React.FC<MaturityDiagnosticProps> = ({ onPreFillContact }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetDiagnostic = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Calculate score and diagnosis
  const calculateResult = () => {
    let totalScore = 0;
    const answersText: string[] = [];

    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      const selectedIndex = selectedAnswers[q.id];
      if (selectedIndex !== undefined) {
        const opt = q.options[selectedIndex];
        totalScore += opt.points;
        answersText.push(`${q.question}: ${opt.label}`);
      }
    });

    let levelTitle = '';
    let levelSummary = '';
    let recommendations: string[] = [];

    if (totalScore <= 16) {
      levelTitle = 'Nível 1 — Operação Manual Reativa';
      levelSummary = 'Alto risco de inconsistência, perda de prazos legais no setor público ou decisões financeiras tardias no setor privado. Relatórios dependem de retrabalho manual diário.';
      recommendations = [
        'Centralização de bases no SQL e eliminação de planilhas dispersas.',
        'Desenho inicial de modelo Star Schema no Power BI com regras de negócio documentadas.',
        'Automação de rotinas diárias com Google Apps Script para liberar horas de trabalho da equipe.',
      ];
    } else if (totalScore <= 28) {
      levelTitle = 'Nível 2 — Transição Departamental com Gargalos';
      levelSummary = 'A organização já utiliza Power BI ou relatórios digitais, porém sofre com lentidão, modelos pesados, fórmulas DAX frágeis e falta de governança estruturada.';
      recommendations = [
        'Auditoria e refatoração do modelo DAX para ganho de performance e redução de memória no VertiPaq.',
        'Implementação de segurança a nível de linha (RLS) e padronização visual executiva.',
        'Estruturação de fechamento de dados em D+1 para a diretoria ou controle interno.',
      ];
    } else {
      levelTitle = 'Nível 3 — Inteligência Analítica em Escala';
      levelSummary = 'Ambiente com boa maturidade de dados. O foco deve ser auditoria contínua preditiva, detecção automática de anomalias e expansão de governança.';
      recommendations = [
        'Implementação de alertas proativos de auditoria contínua e limites fiscais.',
        'Refinamento de DRE multinível e indicadores granulares de margem por canal/unidade.',
        'Criação de portais analíticos integrados para transparência ou investidores.',
      ];
    }

    return {
      score: totalScore,
      levelTitle,
      levelSummary,
      recommendations,
      answersText,
    };
  };

  const result = isCompleted ? calculateResult() : null;

  const handleSendToMarcos = () => {
    if (!result) return;
    const text = `Olá Marcos! Realizei o Diagnóstico de Dados no seu site.\n\nResultado: *${result.levelTitle}* (Pontuação: ${result.score})\nDiagnóstico: ${result.levelSummary}\n\nGostaria de avaliar como aplicar as recomendações na minha organização.`;
    onPreFillContact(text);
  };

  const handleSendWhatsApp = () => {
    if (!result) return;
    const text = `Olá Marcos Silveira! Realizei o Diagnóstico de Maturidade Analítica no seu site.\n\n*Resultado:* ${result.levelTitle}\n*Diagnóstico:* ${result.levelSummary}\n\nGostaria de agendar uma conversa técnica para entender as soluções de consultoria.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentStep];

  return (
    <section id="diagnostico" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            Avaliação Executiva Instantânea
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Diagnóstico de Maturidade em Dados & BI
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Responda 4 perguntas rápidas e receba uma análise executiva sobre a prontidão analítica da sua instituição ou empresa, com ações prioritárias de engenharia de dados.
          </p>
        </div>

        {/* Diagnostic Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
          
          {!isCompleted ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-4 border-b border-slate-800">
                <span className="font-mono">
                  Etapa <strong className="text-amber-400">{currentStep + 1}</strong> de {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-slate-400">Diagnóstico Interativo</span>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {currentQ.description}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className="w-full p-4 rounded-xl text-left bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-400/50 transition-all cursor-pointer group flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white mb-1">
                        {opt.label}
                      </h4>
                      <p className="text-xs text-slate-400 group-hover:text-slate-300">
                        {opt.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-start">
                  <button
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Voltar pergunta anterior
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            result && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 mb-6 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                      Relatório Executivo Gerado
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {result.levelTitle}
                    </h3>
                  </div>

                  <button
                    onClick={resetDiagnostic}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5 self-start cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refazer Diagnóstico</span>
                  </button>
                </div>

                {/* Executive Summary */}
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 mb-8">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Diagnóstico da Situação Atual</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {result.levelSummary}
                  </p>
                </div>

                {/* Priority Recommendations */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Plano de Ação de Engenharia & BI Recomendado:
                  </h4>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-200 leading-snug">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="p-6 rounded-xl bg-amber-400/5 border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">Próximo Passo Recomendado</h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-md">
                      Envie este diagnóstico diretamente para Marcos Silveira discutir a implementação prática desse plano de ação.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleSendWhatsApp}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enviar via WhatsApp</span>
                    </button>

                    <button
                      onClick={handleSendToMarcos}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Agendar Reunião Técnica</span>
                    </button>
                  </div>
                </div>

              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
};
