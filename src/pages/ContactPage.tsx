import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Youtube,
  Phone,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'redaksi',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'redaksi',
        message: '',
      });
    }, 600);
  };

  const faqs = [
    {
      q: 'Bagaimana cara mengirimkan siaran pers (press release)?',
      a: 'Kirimkan materi siaran pers, foto beresolusi tinggi, dan kontak juru bicara ke surel press@teknogen.id dengan subjek "[PRESS RELEASE] Nama Topik".',
    },
    {
      q: 'Apakah TeknoGen menerima artikel opini atau kontributor tamu?',
      a: 'Ya, kami membuka ruang kolaborasi untuk akademisi, insinyur perangkat lunak, dan praktisi industri teknologi. Sertakan draft lengkap dan portofolio Anda.',
    },
    {
      q: 'Berapa lama waktu balasan tim redaksi?',
      a: 'Tim kami merespons setiap surel yang masuk dalam kurun waktu 1x24 jam kerja.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Sleek 2-column Contact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Info & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="inline-block px-3.5 py-1 bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              Layanan Redaksi
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Hubungi Kami.
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Punya pertanyaan, tawaran kerjasama liputan, atau feedback? Tim redaksi TeknoGen siap mendengar suara Anda.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {/* Email item */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Redaksi</p>
                <a href="mailto:redaksi@teknogen.id" className="text-slate-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  redaksi@teknogen.id
                </a>
              </div>
            </div>

            {/* Address item */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lokasi Kantor</p>
                <p className="text-slate-900 dark:text-white font-semibold">
                  Jakarta Selatan, Indonesia
                </p>
              </div>
            </div>

            {/* Operational hours item */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jam Kerja</p>
                <p className="text-slate-900 dark:text-white font-semibold">
                  Senin – Jumat, 09:00 – 18:00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Kanal Sosial Media
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shadow-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-800 hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shadow-xs"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Form Card (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Kirim Pesan
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Isi formulir berikut dan redaksi kami akan merespons dalam kurun waktu 1x24 jam kerja.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-3 animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Pesan Anda Berhasil Terkirim!
                </h3>
              </div>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Terima kasih telah menghubungi TeknoGen. Surel konfirmasi telah dikirimkan ke kotak masuk Anda. Tim redaksi kami akan meninjau pesan Anda secepatnya.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Kirim Pesan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama Lengkap */}
                <div>
                  <label 
                    htmlFor="contact-name" 
                    className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Budi Santoso"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Alamat Email */}
                <div>
                  <label 
                    htmlFor="contact-email" 
                    className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="budi@example.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Subjek & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="contact-category" 
                    className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider"
                  >
                    Tujuan Pesan
                  </label>
                  <select
                    id="contact-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="redaksi">Redaksi &amp; Tip Berita</option>
                    <option value="kemitraan">Kerjasama &amp; Sponsor</option>
                    <option value="kontributor">Artikel Kontributor Tamu</option>
                    <option value="lainnya">Pertanyaan Umum</option>
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="contact-subject" 
                    className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider"
                  >
                    Subjek
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Topik pesan Anda..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Pesan */}
              <div>
                <label 
                  htmlFor="contact-message" 
                  className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan pesan Anda..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <span>Mengirimkan Pesan...</span>
                ) : (
                  <>
                    <span>Kirim Pesan</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Pertanyaan Umum</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-slate-900 dark:text-white">
                {faq.q}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
