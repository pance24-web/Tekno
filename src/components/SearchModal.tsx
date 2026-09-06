import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag, Clock } from 'lucide-react';
import { CategorySlug } from '../types';
import { ARTICLES } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle?: (slug: string) => void;
  onSelectCategory?: (cat: CategorySlug) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.summary.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          a.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleArticleClick = (slug: string) => {
    onSelectArticle?.(slug);
    navigate(`/artikel/${slug}`);
    onClose();
  };

  const handleCategoryClick = (cat: CategorySlug) => {
    onSelectCategory?.(cat);
    navigate(`/kategori/${cat}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel, topik AI, aplikasi, atau hardware..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md font-mono hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.trim() === '' ? (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Kategori Populer
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryClick('ai')}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 cursor-pointer transition-colors"
                  >
                    Artificial Intelligence
                  </button>
                  <button
                    onClick={() => handleCategoryClick('aplikasi')}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 cursor-pointer transition-colors"
                  >
                    Aplikasi & Software
                  </button>
                  <button
                    onClick={() => handleCategoryClick('perkembangan-teknologi')}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 cursor-pointer transition-colors"
                  >
                    Perkembangan Teknologi
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Topik Hangat
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Agentic AI', 'Semikonduktor 2nm', 'Local LLM', 'Open Banking', 'Kriptografi Kuantum', '5.5G'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-2 py-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Ditemukan {filtered.length} Artikel
              </span>
              <div className="space-y-2">
                {filtered.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article.slug)}
                    className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex items-start gap-3.5 group"
                  >
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="w-16 h-14 object-cover rounded-lg shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {article.categoryLabel}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {article.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 self-center" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Tidak ada artikel yang cocok dengan "{query}"
              </p>
              <p className="text-xs text-slate-400">
                Coba gunakan kata kunci umum seperti "AI", "Software", atau "Chip".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
