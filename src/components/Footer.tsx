import React, { useState } from 'react';
import { 
  Cpu, 
  Send, 
  CheckCircle2, 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube, 
  Instagram, 
  ArrowUpRight, 
  Heart,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { PageView, CategorySlug } from '../types';
import { CATEGORIES, TEKNOGEN_LOGO_URL } from '../data/articles';

interface FooterProps {
  onNavigate: (view: PageView, category?: CategorySlug) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner / Newsletter */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Mail className="w-3.5 h-3.5" /> Newsletter TeknoGen
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Dapatkan Rangkuman Teknologi & AI Setiap Pekan
              </h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Bergabunglah bersama ribuan pengembang, peneliti, dan penggiat industri teknologi di Indonesia. Bebas spam, berhenti berlangganan kapan saja.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>Terima kasih! Anda telah terdaftar dalam buletin mingguan TeknoGen.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan alamat email Anda..."
                    className="flex-1 px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    id="footer-subscribe-btn"
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                  >
                    <span>Langganan</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-3 cursor-pointer group select-none inline-flex"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md ring-1 ring-slate-700 group-hover:scale-105 transition-transform shrink-0 bg-slate-800 flex items-center justify-center">
                <img
                  src={TEKNOGEN_LOGO_URL}
                  alt="TeknoGen Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Tekno<span className="text-blue-400">Gen</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TeknoGen adalah portal jurnalisme teknologi independen berbahasa Indonesia yang berfokus pada perkembangan Artificial Intelligence (AI), ulasan aplikasi produktivitas, serta inovasi hardware dan sains komputasi mutakhir.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter) TeknoGen"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn TeknoGen"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub TeknoGen"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube TeknoGen"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram TeknoGen"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kategori */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Kategori Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('category', cat.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group text-left cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 text-left cursor-pointer font-medium"
                >
                  <span>Semua Artikel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Navigasi / Halaman */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Daftar Artikel
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Kontak & Kerjasama
                </button>
              </li>
            </ul>
          </div>

          {/* Informasi Redaksi */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Redaksi & Standar
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diterbitkan dengan komitmen integritas jurnalisme teknologi, verifikasi sumber fakta, dan bebas sensasionalisme.
            </p>
            <div className="p-3 bg-slate-800/70 border border-slate-700/60 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pedoman Siber Terverifikasi</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Mematuhi UU ITE dan Kode Etik Jurnalistik Dewan Pers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TeknoGen. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Syarat & Ketentuan</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Pedoman Editorial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
