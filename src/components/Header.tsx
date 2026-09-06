import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { PageView, CategorySlug } from '../types';
import { TEKNOGEN_LOGO_URL } from '../data/articles';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView, category?: CategorySlug, articleSlug?: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: PageView; category?: CategorySlug }[] = [
    { label: 'Beranda', view: 'home' },
    { label: 'Artikel', view: 'articles' },
    { label: 'Kategori', view: 'category', category: 'ai' },
    { label: 'Tentang', view: 'about' },
    { label: 'Kontak', view: 'contact' },
  ];

  const handleNavClick = (view: PageView, category?: CategorySlug) => {
    onNavigate(view, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo TeknoGen */}
          <div className="flex items-center gap-8">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              id="logo-button"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs ring-1 ring-slate-200 dark:ring-slate-700 group-hover:scale-105 transition-transform shrink-0 bg-white flex items-center justify-center p-0.5">
                <img
                  src={TEKNOGEN_LOGO_URL}
                  alt="TeknoGen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Tekno<span className="text-blue-600 dark:text-blue-400">Gen</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.label}
                    id={`nav-${link.view}`}
                    onClick={() => handleNavClick(link.view, link.category)}
                    className={`transition-colors cursor-pointer ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Actions: Search, Dark Mode, & CTA Button */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="Cari artikel"
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-500 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Signature Pill Button "Mulai Baca" */}
            <button
              id="header-cta-btn"
              onClick={() => onNavigate('articles')}
              className="hidden sm:inline-flex items-center bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
            >
              Mulai Baca
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu navigasi"
              className="md:hidden p-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.view, link.category)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Fokus bahasan: AI, Aplikasi Terkini, & Perkembangan Teknologi Indonesia.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
