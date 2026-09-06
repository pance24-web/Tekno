import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  LayoutGrid, 
  Zap, 
  TrendingUp, 
  Flame, 
  CheckCircle,
  Award,
  ChevronRight
} from 'lucide-react';
import { Article, CategorySlug, PageView } from '../types';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';

interface HomePageProps {
  onNavigate: (view: PageView, category?: CategorySlug, articleSlug?: string) => void;
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (category: CategorySlug) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectArticle,
  onSelectCategory,
}) => {
  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  // 3 latest articles excluding the main featured if desired, or top 3 recent
  const latestArticles = ARTICLES.slice(0, 3);
  const popularArticles = [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 4);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      default:
        return <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION (Sleek Interface 12-column grid layout) */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[650px] h-96 sm:h-[450px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Hero Column (7 cols) */}
            <div className="lg:col-span-7">
              <span className="inline-block px-3.5 py-1 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Warta Teknologi Terkini
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
                Masa Depan AI: Lebih dari Sekadar Chatbot.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed">
                Jelajahi bagaimana kecerdasan buatan mengubah fundamental industri, cara kita bekerja, dan interaksi manusia dengan teknologi digital di Indonesia.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigate('articles')}
                  className="px-7 sm:px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none hover:translate-y-[-2px] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Jelajahi Artikel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-ai-btn"
                  onClick={() => onSelectCategory('ai')}
                  className="px-7 sm:px-8 py-3.5 sm:py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Tren AI 2025</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> 100% Bebas Clickbait
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Riset &amp; Pengujian Nyata
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Diperbarui Harian
                </span>
              </div>
            </div>

            {/* Right Hero Column: Sleek Featured Post & Floating Stats (5 cols) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div 
                onClick={() => onSelectArticle(featuredArticle.slug)}
                className="aspect-4/3 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 overflow-hidden shadow-2xl relative cursor-pointer group"
              >
                {featuredArticle.imageUrl && (
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                
                <div className="p-6 sm:p-8 h-full flex flex-col justify-end relative z-10">
                  <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/20">
                    <p className="text-white/80 text-xs sm:text-sm mb-2 uppercase tracking-widest font-bold">
                      Featured Post
                    </p>
                    <h3 className="text-white text-lg sm:text-xl font-bold leading-snug group-hover:text-blue-200 transition-colors line-clamp-2">
                      {featuredArticle.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Signature Sleek Floating Growth Stat */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 items-center gap-4 z-20">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Statistik AI</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">+142% Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION ARTIKEL TERBARU (Grid 3 Kolom) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Artikel Terbaru
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Liputan terhangat seputar perkembangan industri AI dan software global.
            </p>
          </div>

          <button
            onClick={() => onNavigate('articles')}
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      </section>

      {/* 3. SECTION KATEGORI UTAMA */}
      <section className="bg-slate-50/80 dark:bg-slate-900/50 py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Fokus Pembahasan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Kategori Utama TeknoGen
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Pilih bidang yang ingin Anda eksplorasi lebih dalam sesuai kebutuhan riset dan produktivitas Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getCategoryIcon(cat.iconName)}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 mt-1">
                      {cat.articleCount} Artikel Terpublikasi
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Jelajahi Kategori Ini</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION ARTIKEL POPULER / REKOMENDASI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
              <span>Paling Banyak Dibaca</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Artikel Populer &amp; Rekomendasi
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Wawasan teknologi dengan tingkat keterbacaan dan diskusi tertinggi bulan ini.
            </p>
          </div>
        </div>

        {/* Split Layout: Featured Highlight + Numbered List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Highlight Card (5 cols) */}
          <div className="lg:col-span-5">
            {popularArticles[0] && (
              <ArticleCard
                article={popularArticles[0]}
                onSelectArticle={onSelectArticle}
                onSelectCategory={onSelectCategory}
              />
            )}
          </div>

          {/* Right: Numbered List 02 - 04 (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
            {popularArticles.slice(1, 4).map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art.slug)}
                className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 group cursor-pointer"
              >
                <span className="text-3xl font-extrabold text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0 w-8 font-mono">
                  0{idx + 2}
                </span>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {art.categoryLabel}
                    </span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {art.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {art.summary}
                  </p>
                </div>

                <img
                  src={art.imageUrl}
                  alt=""
                  className="w-20 h-16 object-cover rounded-xl shrink-0 hidden sm:block group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
