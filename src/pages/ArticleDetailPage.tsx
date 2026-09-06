import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Bookmark, 
  Share2, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  Link2, 
  Check, 
  CheckCircle2, 
  Sparkles,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Article, CategorySlug, CommentItem } from '../types';
import { ARTICLES, MOCK_COMMENTS } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface ArticleDetailPageProps {
  article?: Article;
  onNavigate?: (view: any, category?: CategorySlug) => void;
  onSelectArticle?: (slug: string) => void;
  onSelectCategory?: (category: CategorySlug) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article: propArticle,
  onSelectArticle,
  onSelectCategory,
}) => {
  const { slug } = useParams<{ slug: string }>();

  // Find article by route slug or passed prop
  const article = propArticle || (slug ? ARTICLES.find((a) => a.slug === slug) : null) || ARTICLES[0];

  useDocumentTitle(
    article ? article.title : 'Artikel Tidak Ditemukan',
    article ? article.summary : undefined
  );

  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article ? article.likes : 0);
  const [bookmarked, setBookmarked] = useState(false);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>(MOCK_COMMENTS);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Artikel Tidak Ditemukan
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Artikel yang Anda cari tidak tersedia atau tautan salah.
        </p>
        <Link
          to="/artikel"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm"
        >
          Lihat Semua Artikel
        </Link>
      </div>
    );
  }

  // Related articles (same category or top others excluding current)
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title} - Baca selengkapnya di TeknoGen: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} via @TeknoGenID`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: commentName.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      date: 'Baru saja',
      content: commentText.trim(),
    };

    setComments([newComment, ...comments]);
    setCommentName('');
    setCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* 1. BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap pb-1">
        <Link
          to="/"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link
          to="/artikel"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          Artikel
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link
          to={`/kategori/${article.category}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
        >
          {article.categoryLabel}
        </Link>
      </nav>

      {/* 2. HEADER ARTIKEL */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            to={`/kategori/${article.category}`}
            className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
          >
            {article.categoryLabel}
          </Link>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Eye className="w-3.5 h-3.5" />
            {article.views.toLocaleString('id-ID')} Pembaca
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
          {article.title}
        </h1>

        {/* Author Bio Row & Share Actions */}
        <div className="pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {article.author.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{article.author.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {article.publishedAt}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                liked
                  ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current text-rose-500' : ''}`} />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              aria-label="Simpan artikel"
              className={`p-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                bookmarked
                  ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-300'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-blue-600' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. GAMBAR UTAMA */}
      <figure className="space-y-2">
        <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="text-center text-xs text-slate-400 dark:text-slate-400 italic">
          Ilustrasi visual: {article.title} (Dokumentasi Riset TeknoGen / Unsplash)
        </figcaption>
      </figure>

      {/* 4. EXECUTIVE SUMMARY & KEY POINTS */}
      <div className="bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-5 sm:p-6 rounded-r-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          <Sparkles className="w-4 h-4" />
          <span>Poin Intisari Redaksi</span>
        </div>
        <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
          "{article.summary}"
        </p>

        {article.keyPoints && (
          <ul className="pt-2 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {article.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 5. ISI ARTIKEL LENGKAP */}
      <div className="space-y-6 text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
        {article.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Tag Terkait:</span>
        {article.tags.map((tag) => (
          <Link
            key={tag}
            to={`/artikel?cari=${encodeURIComponent(tag)}`}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* 6. TOMBOL SHARE (Facebook, X, WhatsApp, Copy Link) */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Bagikan Artikel Ini:</span>
          </div>
          {copied && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" /> Tautan Berhasil Disalin!
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handleShareWhatsApp}
            id="share-whatsapp-btn"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareTwitter}
            id="share-x-btn"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Twitter className="w-4 h-4" />
            <span>X (Twitter)</span>
          </button>

          <button
            onClick={handleShareFacebook}
            id="share-facebook-btn"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-600/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </button>

          <button
            onClick={handleCopyLink}
            id="share-copy-btn"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Link2 className="w-4 h-4" />
            <span>Salin Tautan</span>
          </button>
        </div>
      </div>

      {/* 7. AUTHOR SPOTLIGHT CARD */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img
          src={article.author.avatar}
          alt={article.author.name}
          className="w-16 h-16 rounded-2xl object-cover shrink-0 ring-2 ring-blue-500/20 shadow-md"
        />
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {article.author.name}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
              Penulis TeknoGen
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {article.author.role}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.author.bio}
          </p>
        </div>
      </div>

      {/* 8. KOMENTAR & DISKUSI */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Diskusi &amp; Komentar ({comments.length})
          </h3>
        </div>

        {/* Input Form Komentar */}
        <form onSubmit={handleAddComment} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3.5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Tinggalkan tanggapan atau analisis Anda:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Nama lengkap Anda..."
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            required
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Bagikan opini konstruktif Anda mengenai artikel ini..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between">
            {commentSubmitted ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Komentar Anda berhasil dipublikasikan!
              </span>
            ) : <span className="text-xs text-slate-400">Komentar akan langsung ditampilkan pada prototype ini.</span>}

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Kirim Tanggapan</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Daftar Komentar */}
        <div className="space-y-3.5">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {c.author}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">{c.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-9 leading-relaxed">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SECTION ARTIKEL TERKAIT */}
      <section className="space-y-6 pt-10 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Rekomendasi Lanjutan
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Artikel Terkait
            </h3>
          </div>

          <Link
            to="/artikel"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Lihat Semua Arsip
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <ArticleCard
              key={rel.id}
              article={rel}
              onSelectArticle={onSelectArticle}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
