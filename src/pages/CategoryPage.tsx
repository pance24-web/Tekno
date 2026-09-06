import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Cpu, 
  LayoutGrid, 
  Sparkles, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  BookOpen
} from 'lucide-react';
import { CategorySlug } from '../types';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface CategoryPageProps {
  categorySlug?: CategorySlug;
  onSelectCategory?: (category: CategorySlug) => void;
  onSelectArticle?: (slug: string) => void;
  onNavigate?: (view: any) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug: propCategorySlug,
  onSelectArticle,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = (slug as CategorySlug) || propCategorySlug || 'ai';

  const currentCategory = CATEGORIES.find((c) => c.id === activeSlug) || CATEGORIES[0];

  useDocumentTitle(
    `Kategori: ${currentCategory.name}`,
    currentCategory.description
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;

  // Filter articles by this category + optional local search
  const categoryArticles = ARTICLES.filter((a) => a.category === currentCategory.id);
  const filteredArticles = searchQuery.trim()
    ? categoryArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryArticles;

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-sky-600 dark:text-sky-400" />;
      default:
        return <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Category Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === currentCategory.id;
          return (
            <Link
              key={cat.id}
              to={`/kategori/${cat.id}`}
              onClick={() => {
                setCurrentPage(1);
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 no-underline ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-200 dark:bg-slate-700'
              }`}>
                {cat.articleCount}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Category Header Banner */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 flex items-center justify-center">
            {getCategoryIcon(currentCategory.iconName)}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Kategori Terpilih
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentCategory.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {currentCategory.description}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {categoryArticles.length} Publikasi dalam Topik Ini
            </span>
          </div>
        </div>
      </div>

      {/* Local Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white self-start sm:self-auto">
          Daftar Artikel {currentCategory.shortName}
        </h2>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Cari dalam kategori ${currentCategory.shortName}...`}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelectArticle={onSelectArticle}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Tidak ada artikel yang cocok dengan pencarian "{searchQuery}"
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
