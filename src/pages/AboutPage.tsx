import React from 'react';
import { 
  Cpu, 
  Target, 
  Compass, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Award,
  Globe2,
  BookOpenCheck
} from 'lucide-react';
import { PageView } from '../types';
import { AUTHORS, TEKNOGEN_LOGO_URL } from '../data/articles';

interface AboutPageProps {
  onNavigate: (view: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      title: 'Akurasi & Integritas',
      description: 'Setiap klaim teknologi, benchmark chip, dan evaluasi model AI diuji dengan data empiris serta metodologi yang transparan.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: 'Bebas Clickbait',
      description: 'Kami menolak judul bombastis yang menyesatkan. Kami berkomitmen menyajikan substansi berbobot untuk pembaca cerdas.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      title: 'Perspektif Lokal & Global',
      description: 'Mengontekstualisasikan inovasi kecerdasan buatan dunia ke dalam regulasi, potensi talenta, dan implementasi nyata di Indonesia.',
      icon: <Globe2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      title: 'Aksesibilitas Bahasa',
      description: 'Menerjemahkan konsep teknis rumit (seperti kuantisasi bobot model atau GAA nanosheet) menjadi bahasa Indonesia yang mudah dipahami.',
      icon: <BookOpenCheck className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
    },
  ];

  const milestones = [
    { number: '150K+', label: 'Pembaca Aktif Bulanan' },
    { number: '500+', label: 'Artikel & Riset Terkurasi' },
    { number: '100%', label: 'Konten Original Terverifikasi' },
    { number: '3', label: 'Pilar Fokus (AI, App, Tech)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION TENTANG KAMI */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mengenal TeknoGen</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Menghadirkan Literasi Teknologi Mutakhir untuk Generasi Indonesia
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          TeknoGen lahir dari sebuah visi sederhana: menyediakan portal wawasan teknologi yang mendalam, berimbang, dan berintegritas tinggi dalam bahasa Indonesia.
        </p>
      </section>

      {/* 2. CERITA TEKNOGEN & GAMBAR / ILUSTRASI */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Kisah Kami
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Menjembatani Lompatan Cepat Inovasi Global ke Ranah Nusantara
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Dunia komputasi sedang bertransformasi dengan laju tercepat dalam sejarah manusia. Mulai dari model Artificial Intelligence yang mampu bernalar mandiri, perubahan paradigma pengembangan software, hingga fabrikasi silikon sub-2 nanometer.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Sering kali, informasi berkualitas tinggi mengenai topik ini hanya tersedia dalam literatur bahasa asing yang sarat jargon. TeknoGen hadir untuk membedah, menganalisis, dan menyajikan kembali pengetahuan mutakhir tersebut agar dapat dimanfaatkan oleh para insinyur perangkat lunak, mahasiswa, pendiri startup, dan penentu kebijakan di Indonesia.
          </p>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="Tim riset dan kolaborasi teknologi TeknoGen"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Badge Overlay */}
          <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 shrink-0 bg-white flex items-center justify-center p-0.5 shadow-xs">
              <img
                src={TEKNOGEN_LOGO_URL}
                alt="TeknoGen Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">TeknoGen Research</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pusat Analisis &amp; Pengujian Mandiri</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="bg-slate-50/80 dark:bg-slate-900/50 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Arah &amp; Tujuan
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Visi dan Misi TeknoGen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-white dark:bg-slate-900 p-7 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Visi Kami
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Menjadi rujukan media dan pusat wawasan teknologi berbahasa Indonesia nomor satu yang paling kredibel, objektif, dan menginspirasi percepatan kedaulatan teknologi bangsa di panggung internasional.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white dark:bg-slate-900 p-7 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Misi Kami
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Menyajikan laporan mendalam mengenai AI, software, dan infrastruktur komputasi secara komprehensif.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Melakukan uji komparasi dan benchmark perangkat lunak serta perangkat keras secara transparan.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>Mendorong adopsi teknologi yang aman, etis, dan mematuhi etika pelindungan data pribadi di tanah air.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. NILAI-NILAI REDAKSI */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Prinsip Jurnalisme
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Nilai Inti yang Kami Pegang Teguh
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs"
            >
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl w-fit">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {v.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TIM REDAKSI & KONTRIBUTOR */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Orang di Balik Layar
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Tim Editorial &amp; Riset TeknoGen
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Terdiri atas praktisi machine learning, arsitek software, dan analis perangkat keras berpengalaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(AUTHORS).map((author) => (
            <div
              key={author.name}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xs"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-blue-500/10 shadow-md"
              />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {author.name}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {author.role}
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {author.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STATISTIK METRIK */}
      <section className="bg-blue-600 text-white p-8 sm:p-12 rounded-3xl shadow-xl shadow-blue-600/20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-blue-500/40">
          {milestones.map((m, idx) => (
            <div key={m.label} className={idx > 0 ? 'pt-6 sm:pt-0' : ''}>
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {m.number}
              </div>
              <div className="text-xs sm:text-sm font-medium text-blue-100 mt-2">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
