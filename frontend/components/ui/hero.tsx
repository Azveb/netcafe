'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { ArrowRight, Play, Search, X, Sparkles, GraduationCap, MapPin, CheckCircle, Users } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  stats: {
    students: string;
    countries: string;
    successRate: string;
  };
}

export function Hero({ title, subtitle, cta, stats }: HeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchType, setSearchType] = useState('');

  // Counter states
  const [studentsCount, setStudentsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStudentsCount(Math.min(Math.floor((10000 / steps) * step), 10000));
      setCountriesCount(Math.min(Math.floor((50 / steps) * step), 50));
      setSuccessCount(Math.min(Math.floor((95 / steps) * step), 95));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCountry || searchType) {
      window.location.href = `/programs?country=${encodeURIComponent(searchCountry)}&type=${encodeURIComponent(searchType)}`;
    } else {
      window.location.href = '/programs';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 mesh-gradient-dark dark:mesh-gradient-dark light:mesh-gradient-light">
      {/* Decorative Grid and Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/25 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-purple-500/20 rounded-full blur-[140px] animate-float-delay" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Main Text & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs sm:text-sm font-medium text-primary shadow-glow mx-auto lg:mx-0"
            >
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin-slow" />
              <span>✨ 2026 Erasmus+ & ESC Müraciətləri Başladı</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 dark:from-white dark:to-slate-400 light:from-slate-900 light:to-slate-600"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* Premium Smart Search Input Box */}
            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-2 rounded-2xl glass border border-white/10 shadow-premium max-w-2xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-white/10">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="Ölkə (məs. Almaniya, Polşa)"
                  className="bg-transparent border-0 outline-none w-full text-sm text-foreground placeholder:text-muted-foreground focus:ring-0"
                  value={searchCountry}
                  onChange={(e) => setSearchCountry(e.target.value)}
                />
              </div>

              <div className="flex-1 flex items-center gap-2 px-3 py-2">
                <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                <select
                  className="bg-transparent border-0 outline-none w-full text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 appearance-none"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="" className="bg-background">Proqram növü</option>
                  <option value="erasmus" className="bg-background">Erasmus+</option>
                  <option value="esc" className="bg-background">ESC Könüllülük</option>
                  <option value="master" className="bg-background">Magistr təhsili</option>
                  <option value="scholarship" className="bg-background">Təqaüd proqramı</option>
                </select>
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-glow">
                <Search className="h-4 w-4 mr-2" />
                Axtar
              </Button>
            </motion.form>

            {/* Social Proof & Video trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
            >
              {/* Avatars group */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 backdrop-blur-md flex items-center justify-center text-xs font-bold text-primary">
                    +9k
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">9,820+ gənc</span>
                    <CheckCircle className="h-4 w-4 text-green-500 fill-green-500/20" />
                  </div>
                  <p className="text-xs text-muted-foreground">xaricdə təhsil və layihə qazanıb</p>
                </div>
              </div>

              {/* Video Modal Trigger Button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 group px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all border border-primary/20 shadow-glow">
                  <Play className="h-4 w-4 text-primary fill-primary/30 group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Uğur hekayələrimiz</span>
              </button>
            </motion.div>
          </div>

          {/* Right Hero Interactive 3D Mockup Card & Live floating widgets */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl glass border border-white/10 p-6 overflow-hidden group shadow-premium"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />

              {/* Mockup Premium Content inside Card */}
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">Təqaüd Tələbəsi</span>
                    <span className="text-xs text-slate-400">Dünən</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Fidan Aliyeva</h3>
                  <p className="text-xs text-slate-400 mb-4">Polşa, Vroslav Universiteti (Erasmus+ Program)</p>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Qəbul sənədi</span>
                      <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">Təsdiqləndi</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Aylıq təqaüd</span>
                      <span className="text-xs font-bold text-primary">€1,050 / ay</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Müraciət Hazırlığı</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating 3D Cards */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-6 sm:-left-12 p-3 sm:p-4 rounded-2xl glass border border-white/10 flex items-center gap-3 shadow-premium-hover backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                🌍
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Səyahət və Viza</div>
                <div className="text-sm font-bold text-white">Pulsuz Sığorta daxil</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -right-6 p-4 rounded-2xl glass border border-white/10 flex items-center gap-3 shadow-premium-hover backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Mentor Dəstəyi</div>
                <div className="text-sm font-bold text-white">Həftəlik 1-on-1 Görüş</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Counter Statistics Row */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-3xl glass border border-white/10 relative overflow-hidden shadow-premium">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center text-center p-4 relative z-10 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-4xl md:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              {studentsCount >= 10000 ? '10,000+' : studentsCount.toLocaleString() + '+'}
            </span>
            <span className="mt-2 text-sm md:text-base font-semibold text-slate-400 uppercase tracking-wider">{stats.students}</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 relative z-10 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-4xl md:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              {countriesCount >= 50 ? '50+' : countriesCount}+
            </span>
            <span className="mt-2 text-sm md:text-base font-semibold text-slate-400 uppercase tracking-wider">{stats.countries}</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 relative z-10">
            <span className="text-4xl md:text-5xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              {successCount}%
            </span>
            <span className="mt-2 text-sm md:text-base font-semibold text-slate-400 uppercase tracking-wider">{stats.successRate}</span>
          </div>
        </div>
      </div>

      {/* Video Modal (AnimatePresence) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden glass border border-white/10 shadow-premium"
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all border border-white/10"
              >
                <X className="h-5 w-5" />
              </button>
              
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="EduPlatform Success Stories"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
