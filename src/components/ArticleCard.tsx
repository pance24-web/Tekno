import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Bookmark, 
  ArrowRight,
  Eye,
  Heart
} from 'lucide-react';
import { Article, CategorySlug } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (slug: string) => void;
  onSelectCategory?: (category: CategorySlug) => void;
  layout?: 'grid' | 'horizontal' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  onSelectCategory,
  layout = 'grid',
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const getCategoryBadgeClass = (category: CategorySlug) => {
    switch (category) {
      case 'ai':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200/80 dark:border-blue-800';
      case 'aplikasi':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800';
      case 'perkembangan-teknologi':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border-orange-200/80 dark:border-orange-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getCategoryTextClass = (category: CategorySlug) => {
    switch (category) {
      case 'ai':
        return 'text-blue-600 dark:text-blue-400';
      case 'aplikasi':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'perkembangan-teknologi':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  if (layout === 'horizontal') {
    return (
      <div 
        id={`article-card-${article.slug}`}
        onClick={() => onSelectArticle(article.slug)}
        className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col md:flex-row cursor-pointer"
      >
        <div className="md:w-5/12 h-56 md:h-auto relative overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(article.category)}`}>
              {article.categoryLabel}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-7 flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmarkToggle}
                aria-label="Simpan artikel"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  bookmarked 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' 
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>

              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Baca <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`article-card-${article.slug}`}
      onClick={() => onSelectArticle(article.slug)}
      className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail with Sleek 16:9 Aspect Video */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800/80">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span 
            onClick={(e) => {
              if (onSelectCategory) {
                e.stopPropagation();
                onSelectCategory(article.category);
              }
            }}
            className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(article.category)} hover:opacity-90`}
          >
            {article.categoryLabel}
          </span>
        </div>

        <button
          onClick={handleBookmarkToggle}
          aria-label="Simpan artikel"
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
            bookmarked
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${getCategoryTextClass(article.category)}`}>
              {article.categoryLabel}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              {article.author.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1 text-xs cursor-pointer ${
                liked ? 'text-red-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
            
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Baca <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
