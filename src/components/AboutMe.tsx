import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Database, 
  FileCheck, 
  Briefcase, 
  Scale, 
  UserCheck, 
  Lock, 
  LineChart, 
  Linkedin, 
  ArrowUpRight, 
  Award, 
  Building2, 
  CheckCircle2, 
  User,
  Camera,
  UploadCloud,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutMeProps {
  onOpenContact: () => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onOpenContact }) => {
  const [photoSrc, setPhotoSrc] = useState<string>('1779411378191.jpg');
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageError = () => {
    if (photoSrc === '1779411378191.jpg') {
      setPhotoSrc('marcos-silveira.jpg');
    } else if (photoSrc === 'marcos-silveira.jpg') {
      setPhotoSrc('./1779411378191.jpg');
    } else {
      setImageError(true);
    }
  };

  // Inicializa imagem salva no navegador (se houver)
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('marcos_silveira_photo');
      if (savedPhoto) {
        setPhotoSrc(savedPhoto);
        setImageError(false);
      }
    } catch {
      // Ignora restrições de localStorage
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadFile(file);
    }
  };

  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoSrc(result);
        setImageError(false);
        try {
          localStorage.setItem('marcos_silveira_photo', result);
        } catch {
          // localStorage quota handling
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadFile(file);
    }
  };

  // Mini-currículo oficial fornecido pelo usuário
  const miniCurriculoTags = [
    { label: 'Servidor Público', icon: Building2, highlight: true },
    { label: 'Analista de Sistemas', icon: Database, highlight: true },
    { label: 'DPO', icon: ShieldCheck, highlight: true },
    { label: 'LGPD', icon: Lock, highlight: false },
    { label: 'LAI', icon: FileCheck, highlight: false },
    { label: 'Compliance', icon: Scale, highlight: false },
    { label: 'Data Analyst', icon: LineChart, highlight: true },
    { label: 'Accountability', icon: Award, highlight: false },
    { label: 'Auditoria', icon: CheckCircle2, highlight: false },
    { label: 'Correição', icon: Scale, highlight: false },
    { label: 'Intervenções Administrativas', icon: Briefcase, highlight: false },
    { label: 'Projetos Corporativos', icon: UserCheck, highlight: true },
  ];

  // Pilares de atuação detalhados
  const pillars = [
    {
      title: 'Governança Pública & Accountability',
      description: 'Atuação especializada no setor público com foco em integridade, controle interno, auditoria contínua de despesas e folha salarial, processos de correição e condução de intervenções administrativas complexas com estrita aderência à LAI (Lei de Acesso à Informação) e LRF.',
      tags: ['Servidor Público', 'Accountability', 'Auditoria', 'Correição', 'LAI', 'Intervenções Administrativas'],
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/20',
      bgColor: 'bg-amber-500/5',
    },
    {
      title: 'Privacidade, DPO & Compliance',
      description: 'Estruturação de governança de dados e privacidade em conformidade com a LGPD (Lei Geral de Proteção de Dados). Atuação consultiva como Encarregado pelo Tratamento de Dados Pessoais (DPO), mapeamento de dados (ROPA), gestão de riscos e alinhamento com comitês de compliance.',
      tags: ['DPO', 'LGPD', 'Compliance Regulatório', 'Gestão de Riscos', 'Segurança da Informação'],
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
      bgColor: 'bg-emerald-500/5',
    },
    {
      title: 'Engenharia de Sistemas & Análise de Dados',
      description: 'Formação e prática sólida como Analista de Sistemas e Data Analyst. Desenvolvimento de pipelines de dados, modelagem dimensional em Star Schema, cálculos analíticos avançados em DAX e SQL, e criação de dashboards executivos de alta performance para tomadores de decisão.',
      tags: ['Analista de Sistemas', 'Data Analyst', 'Power BI & DAX', 'SQL Avançado', 'Power Query (M)'],
      accentColor: 'text-sky-400',
      borderColor: 'border-sky-500/20',
      bgColor: 'bg-sky-500/5',
    },
    {
      title: 'Projetos Corporativos & Resultados Estratégicos',
      description: 'Liderança e execução de projetos corporativos no setor privado e público. Capacidade de traduzir desafios operacionais e fiscais em soluções automatizadas, inteligência de negócios, redução de custos e autonomia para gestores através de capacitação in-company.',
      tags: ['Projetos Corporativos', 'Automação Serverless', 'Controladoria', 'Capacitação Executiva'],
      accentColor: 'text-amber-300',
      borderColor: 'border-amber-400/20',
      bgColor: 'bg-amber-400/5',
    },
  ];

  return (
    <section id="quem-sou-eu" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Perfil & Trajetória Profissional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Quem Sou Eu
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
            Unindo o rigor técnico da Ciência da Computação, a conformidade jurídica da governança pública e a busca por resultados ágeis do setor corporativo.
          </p>
        </div>

        {/* Profile Card & Mini-Curriculum Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Executive Photo & Identity Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-emerald-500/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />

                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`aspect-square w-full rounded-xl overflow-hidden bg-slate-950 relative flex items-center justify-center transition-all ${
                    isDragging ? 'ring-2 ring-amber-400 bg-amber-500/10' : ''
                  }`}
                >
                  {!imageError ? (
                    <>
                      <img 
                        src={photoSrc} 
                        alt="Marcos Silveira — Especialista em Dados & BI"
                        className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"
                        onError={handleImageError}
                        referrerPolicy="no-referrer"
                      />

                      {/* Change photo button on hover */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs flex items-center gap-1.5 shadow-lg"
                        title="Substituir ou atualizar foto"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Trocar Foto</span>
                      </button>
                    </>
                  ) : (
                    /* Fallback & Direct Photo Loader if 1779411378191.jpg is not yet loaded in browser */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-center relative">
                      <div className="w-20 h-20 rounded-full bg-amber-400/10 border-2 border-amber-400/40 flex items-center justify-center text-amber-400 font-extrabold text-2xl mb-3 shadow-lg font-mono">
                        MS
                      </div>
                      <span className="text-base font-bold text-white tracking-tight">
                        Marcos Silveira
                      </span>
                      <span className="text-xs text-amber-400 font-medium mt-0.5">
                        Especialista em Dados & BI
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 mb-4 max-w-[220px]">
                        Servidor Público · DPO · Analista de Sistemas
                      </span>

                      {/* One-click button to load the user's attached photo */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Carregar Foto (1779411378191.jpg)</span>
                      </button>
                      <span className="text-[10px] text-slate-400 mt-1.5">
                        ou arraste a foto para esta área
                      </span>
                    </div>
                  )}

                  {/* Verified Badge Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800/90 rounded-lg px-3 py-2 flex items-center justify-between pointer-events-none">
                    <div>
                      <span className="text-xs font-bold text-white block">Marcos Silveira</span>
                      <span className="text-[10px] text-slate-400 block">Dados, Governança & BI</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      <span>DPO / Oficial</span>
                    </div>
                  </div>
                </div>

                {/* Social & Contact Handover */}
                <div className="p-3 pt-4 flex items-center gap-2">
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#0a66c2] hover:bg-[#095196] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>Perfil no LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 opacity-80" />
                  </a>

                  <button
                    onClick={onOpenContact}
                    className="py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    title="Iniciar contato"
                  >
                    Contato
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mini-Curriculum Banner & Competencies Grid */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Highlighted Mini-Curriculum Block */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl mb-6">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-2">
                Mini Currículo & Qualificação Técnica
              </span>
              
              <blockquote className="text-sm sm:text-base md:text-lg font-medium text-slate-100 leading-relaxed border-l-2 border-amber-400 pl-4 py-1 italic bg-amber-500/5 rounded-r-lg">
                &ldquo;Servidor Público | Analista de Sistemas | DPO | LGPD | LAI | Compliance | Data Analyst | Accountability | Auditoria | Correição | Intervenções Administrativas | Projetos Corporativos&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                Com trajetória multidisciplinar, atuo na concepção e execução de projetos analíticos que exigem alto padrão de compliance, segurança da informação e auditoria. Da arquitetura técnica de bancos de dados à garantia de integridade em processos licitatórios, correicionais e decisões corporativas de alta gestão.
              </p>

              {/* Tag Cloud of Credentials */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-2">
                {miniCurriculoTags.map((tag, idx) => {
                  const Icon = tag.icon;
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        tag.highlight 
                          ? 'bg-amber-400/10 text-amber-300 border border-amber-400/25' 
                          : 'bg-slate-800/80 text-slate-200 border border-slate-700/80'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 opacity-80" />
                      <span>{tag.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Quick stats snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
                <span className="text-lg sm:text-xl font-bold text-white block">LGPD & LAI</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Conformidade Legal</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
                <span className="text-lg sm:text-xl font-bold text-white block">DPO Certificado</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Privacidade de Dados</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
                <span className="text-lg sm:text-xl font-bold text-white block">Auditoria Ativa</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Controle & Correição</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center">
                <span className="text-lg sm:text-xl font-bold text-white block">Power BI & SQL</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Engenharia Analítica</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed 4-Pillar Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl bg-slate-900/40 border ${pillar.borderColor} hover:border-slate-700 transition-all flex flex-col justify-between`}
            >
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${pillar.accentColor} mb-2.5 flex items-center gap-2`}>
                  <span>{pillar.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {pillar.tags.map((t, tidx) => (
                  <span 
                    key={tidx} 
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
