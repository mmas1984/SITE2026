export type SectorType = 'publico' | 'privado' | 'geral';

export interface CaseStudy {
  id: string;
  title: string;
  sector: 'publico' | 'privado';
  clientType: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  stack: string[];
  architecture: {
    sources: string;
    etl: string;
    model: string;
    viz: string;
  };
  sampleDaxOrSql?: {
    type: 'DAX' | 'SQL' | 'GAS';
    title: string;
    code: string;
    explanation: string;
  };
}

export interface TechnicalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sector: SectorType;
  category: 'Setor Público' | 'Setor Privado' | 'Engenharia & DAX' | 'Automação';
  readTime: string;
  publishedDate: string;
  summary: string;
  content: string; // Markdown-formatted rich text
  keyTakeaways: string[];
  techStack: string[];
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: 'dax' | 'sql' | 'javascript' | 'powerquery';
  badge: string;
  description: string;
  code: string;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  description: string;
  sector: 'all' | 'publico' | 'privado';
  options: {
    label: string;
    points: number;
    description: string;
  }[];
}

export interface DiagnosticResult {
  score: number;
  tier: string;
  executiveDiagnosis: string;
  keyGaps: string[];
  priorityActions: string[];
}
