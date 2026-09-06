import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, AlertCircle } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('Halaman Tidak Ditemukan (404)', 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.');

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center space-y-8">
      <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/10">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
          Kesalahan 404
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Maaf, halaman yang Anda tuju mungkin sudah dipindahkan, dihapus, atau tautan yang Anda masukkan salah.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <Link
          to="/artikel"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Jelajahi Artikel</span>
        </Link>
      </div>
    </div>
  );
};
