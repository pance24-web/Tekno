import React, { useState, useEffect } from 'react';
import { PageView, CategorySlug, Article } from './types';
import { ARTICLES } from './data/articles';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>('ai');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(
    ARTICLES[0].slug
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dark mode state with persistence & system preference fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('teknogen_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('teknogen_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('teknogen_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Navigation Handler
  const handleNavigate = (
    view: PageView,
    category?: CategorySlug,
    articleSlug?: string
  ) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category);
    }
    if (articleSlug) {
      setSelectedArticleSlug(articleSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Article & Open Detail
  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentView('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Category & Open Category Page
  const handleSelectCategory = (category: CategorySlug) => {
    setSelectedCategory(category);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active article for detail view
  const currentArticle =
    ARTICLES.find((a) => a.slug === selectedArticleSlug) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Global Sticky Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'articles' && (
          <ArticlesPage
            initialCategory={selectedCategory}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'article-detail' && (
          <ArticleDetailPage
            article={currentArticle}
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'category' && (
          <CategoryPage
            categorySlug={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectArticle={handleSelectArticle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
