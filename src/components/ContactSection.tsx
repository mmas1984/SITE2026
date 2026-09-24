import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Linkedin, Send, Copy, Check, ShieldCheck, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  preFilledMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preFilledMessage }) => {
  const [formData, setFormData] = useState({
    nome: '',
    organizacao: '',
    email: '',
    telefone: '',
    setor: 'Setor Privado',
    mensagem: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (preFilledMessage) {
      setFormData((prev) => ({ ...prev, mensagem: preFilledMessage }));
    }
  }, [preFilledMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `Olá Marcos Silveira!\n\n*Nome:* ${formData.nome || 'Não informado'}\n*Organização:* ${formData.organizacao || 'Não informada'}\n*Setor:* ${formData.setor}\n*Email:* ${formData.email || 'Não informado'}\n*Telefone:* ${formData.telefone || 'Não informado'}\n\n*Necessidade/Projeto:* ${formData.mensagem || 'Gostaria de agendar uma reunião de diagnóstico.'}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const generateMailtoUrl = () => {
    const subject = `[Consultoria de Dados] Contato de ${formData.nome || 'Interessado'} — ${formData.organizacao || formData.setor}`;
    const body = `Olá Marcos Silveira,\n\nNome: ${formData.nome}\nOrganização: ${formData.organizacao}\nSetor: ${formData.setor}\nEmail: ${formData.email}\nTelefone: ${formData.telefone}\n\nDetalhes do projeto:\n${formData.mensagem}\n\nAguardo seu retorno para agendarmos uma conversa técnica.`;
    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contato" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Trust */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                Contato Direto & Agendamento
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Vamos Estruturar os Dados da Sua Organização?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Disponível para projetos de consultoria, desenvolvimento de painéis analíticos, auditoria de modelos Power BI e capacitação técnica em dados para gestores.
              </p>

              {/* Direct channels */}
              <div className="space-y-4 mb-8">
                
                {/* Email card */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-mono">E-mail Profissional</span>
                      <a 
                        href={`mailto:${PERSONAL_INFO.email}`} 
                        className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Copiar email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0a66c2]/10 text-[#0a66c2]">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-mono">LinkedIn Oficial</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        marcos-silveira-97bb7a85
                      </span>
                    </div>
                  </div>
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium text-white bg-[#0a66c2] hover:bg-[#095196] rounded-md transition-colors whitespace-nowrap"
                  >
                    Conectar
                  </a>
                </div>

                {/* Location & Modality */}
                <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{PERSONAL_INFO.location} · Contratos por projeto ou assessoria contínua</span>
                </div>

              </div>
            </div>

            {/* Privacy note */}
            <div className="text-xs text-slate-400 pt-6 border-t border-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sigilo absoluto de informações sob NDA e estrita conformidade com a LGPD.</span>
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Message Builder */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-3 mb-4">
                    <h3 className="text-base font-bold text-white">Solicitar Diagnóstico ou Proposta</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Preencha os campos abaixo para gerar sua solicitação e enviar via WhatsApp ou E-mail.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Dra. Mariana Costa ou Roberto Silva"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Organização / Empresa / Órgão Público *
                      </label>
                      <input
                        type="text"
                        name="organizacao"
                        required
                        value={formData.organizacao}
                        onChange={handleChange}
                        placeholder="Ex: Prefeitura Municipal ou Indústria XYZ"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seuemail@organizacao.com.br"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        WhatsApp / Celular com DDD
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(00) 90000-0000"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Segmento da Organização *
                    </label>
                    <select
                      name="setor"
                      value={formData.setor}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="Setor Privado">Setor Privado (Indústria, Varejo, Serviços, Agro)</option>
                      <option value="Setor Público">Setor Público (Prefeitura, Câmara, Consórcio, Tribunal)</option>
                      <option value="Terceiro Setor / Fundação">Terceiro Setor / Fundações / Cooperativas</option>
                      <option value="Outro">Outro contexto analítico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Desafio Analítico ou Escopo Desejado *
                    </label>
                    <textarea
                      name="mensagem"
                      required
                      rows={4}
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva brevemente sua situação atual: relatórios lentos, necessidade de DRE dinâmica, auditoria de folha, automação de planilhas..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gerar Proposta & Enviar Mensagem</span>
                    </button>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Abrir no WhatsApp Direto</span>
                    </a>
                  </div>
                </form>
              ) : (
                /* Post submission screen */
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center mb-4">
                    <Check className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    Solicitação Estruturada com Sucesso!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Sua mensagem foi formatada com os dados do seu projeto. Escolha abaixo como prefere iniciar a conversa imediatamente:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-1/2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Continuar no WhatsApp</span>
                    </a>

                    <a
                      href={generateMailtoUrl()}
                      className="w-full sm:w-1/2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Enviar por E-mail</span>
                    </a>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Editar dados do formulário
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
