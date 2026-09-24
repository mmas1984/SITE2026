import React, { useEffect, useState } from 'react';
import { X, Clock, Calendar, Share2, Check, ArrowLeft, BookOpen } from 'lucide-react';
import { TechnicalArticle } from '../types';

interface ArticleModalProps {
  article: TechnicalArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + article.slug);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to parse simple markdown headers, codeblocks, lists, and quotes
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let currentKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={currentKey++} className="my-5 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={currentKey++} className="text-lg sm:text-xl font-bold text-white mt-8 mb-3 tracking-tight">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={currentKey++} className="border-l-2 border-amber-400 pl-4 py-1 my-4 text-sm text-slate-300 italic bg-slate-900/40 rounded-r">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={currentKey++} className="ml-5 list-disc text-sm text-slate-300 my-1 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={currentKey++} className="my-8 border-slate-800" />);
      } else if (line.trim() !== '') {
        elements.push(
          <p key={currentKey++} className="text-sm sm:text-base text-slate-300 leading-relaxed my-3">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Sticky Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Artigos</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copiar link do artigo"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
          
          {/* Unboxed Metadata (Rule 1.A zero-pill) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
            <span className="text-amber-400 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span>{article.publishedDate}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Por Marcos Silveira</span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 font-medium">
            {article.subtitle}
          </p>

          {/* Tech Stack Pills in Drawer */}
          <div className="flex flex-wrap gap-1.5 mb-8 pb-6 border-b border-slate-800">
            {article.techStack.map((tech) => (
              <span key={tech} className="text-xs font-mono text-slate-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                {tech}
              </span>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 mb-8">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Pontos-Chave & Metodologia Executiva</span>
            </div>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Main Prose */}
          <div className="prose prose-invert max-w-none text-slate-200">
            {renderFormattedContent(article.content)}
          </div>

          {/* Author Signature & CTA */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/40 p-6 rounded-xl border">
            <div>
              <h4 className="text-sm font-bold text-white">Precisa implementar esta arquitetura na sua organização?</h4>
              <p className="text-xs text-slate-400 mt-1">
                Converse diretamente com Marcos Silveira para um diagnóstico de viabilidade técnica.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                const contactEl = document.getElementById('contato');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap cursor-pointer"
            >
              Falar com Marcos Silveira
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
