import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';
import { TechnicalArticle } from '../types';
import { ArticleModal } from './ArticleModal';

export const ArticlesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedArticle, setSelectedArticle] = useState<TechnicalArticle | null>(null);

  const categories = ['Todos', 'Setor Público', 'Setor Privado', 'Engenharia & DAX', 'Automação'];

  const filteredArticles = activeCategory === 'Todos'
    ? TECHNICAL_ARTICLES
    : TECHNICAL_ARTICLES.filter((art) => art.category === activeCategory);

  return (
    <section id="artigos" className="py-20 bg-slate-950 border-t border-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Autoridade Técnica & Artigos
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Artigos Técnicos & Metodologia Aplicada
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Análises aprofundadas sobre governança, auditoria contínua no setor público, modelagem dimensional para C-Level e automações de alta produtividade.
            </p>
          </div>

          {/* Category Filter Buttons (Rule 1.A interactive tabs) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="p-6 sm:p-7 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Unboxed metadata line with typographic separators (Rule 1.A) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                  <span className="text-amber-400 font-semibold">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{article.readTime}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {article.summary}
                </p>

                {/* Key Takeaways Mini Box */}
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-6">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>Neste artigo você verá:</span>
                  </div>
                  <ul className="space-y-1">
                    {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">›</span>
                        <span className="line-clamp-1">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>{article.techStack.slice(0, 2).join(' · ')}</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
