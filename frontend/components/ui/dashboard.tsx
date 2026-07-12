'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, 
  ArrowRight, Download, Upload, Eye, User, Settings, Award, MapPin 
} from 'lucide-react';
import { Button } from './button';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const applicationStats = [
    { label: 'Ümumi Müraciətlər', value: '4', icon: FileText, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Qəbul edilən', value: '2', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Gözləmədə', value: '1', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Uğur nisbəti', value: '85%', icon: TrendingUp, color: 'text-purple-500 bg-purple-500/10' },
  ];

  const applications = [
    {
      id: 'APP-2026-001',
      program: 'Erasmus+ Gənclər Mübadiləsi',
      country: 'Almaniya, Berlin',
      date: '10 İyul 2026',
      status: 'Qəbul',
      statusColor: 'text-emerald-400 bg-emerald-400/10',
      progress: 100,
    },
    {
      id: 'APP-2026-002',
      program: 'ESC Könüllülük Proqramı',
      country: 'Polşa, Krakov',
      date: '05 İyul 2026',
      status: 'Gözləmədə',
      statusColor: 'text-amber-400 bg-amber-400/10',
      progress: 65,
    },
    {
      id: 'APP-2026-003',
      program: 'Fulbright Magistr Təqaüdü',
      country: 'Amerika Birləşmiş Ştatları',
      date: '28 İyun 2026',
      status: 'Sənəd Yoxlanışı',
      statusColor: 'text-blue-400 bg-blue-400/10',
      progress: 35,
    },
  ];

  const deadlines = [
    { title: 'Almaniya Erasmus+ Motivasiya Videosu', date: '15 İyul 2026', time: '23:59', daysLeft: '3 gün qalıb', type: 'critical' },
    { title: 'Polşa ESC Səyahət sənədlərinin yüklənməsi', date: '20 İyul 2026', time: '18:00', daysLeft: '8 gün qalıb', type: 'warning' },
    { title: 'DAAD Təqaüdü Dil Sertifikatı (IELTS)', date: '30 İyul 2026', time: '12:00', daysLeft: '18 gün qalıb', type: 'info' },
  ];

  const activities = [
    { user: 'Sistem', action: 'Profil məlumatlarınız uğurla yeniləndi.', date: 'Dünən, 18:32', icon: User, color: 'text-slate-400 bg-white/5' },
    { user: 'Mentor Fərid', action: 'Erasmus+ motivasiya məktubunuza rəy bildirdi.', date: '08 İyul, 14:15', icon: Award, color: 'text-primary bg-primary/10' },
    { user: 'Sistem', action: 'ESC Könüllülük sənəd mərhələsi "Təsdiqləndi" olaraq dəyişdirildi.', date: '05 İyul, 09:40', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-400/10' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header and User Profile Card */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="User profile photo"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/40 shadow-glow"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Xoş gəldin, Leyla! 👋</h1>
            <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              Bakı, Azərbaycan | Premium Üzv
            </p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" size="lg" className="flex-1 md:flex-initial rounded-xl bg-white/5 hover:bg-white/10 border-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Parametrlər
          </Button>
          <Button size="lg" className="flex-1 md:flex-initial bg-primary hover:bg-primary/90 text-white rounded-xl shadow-glow">
            Yeni Müraciət
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {applicationStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-5 rounded-2xl glass border border-white/10 shadow-premium flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`p-3.5 rounded-xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid content (Applications list + Deadlines & activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Live Applications Progress */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Aktiv Müraciətlərim</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground">
              Hamısına bax
            </Button>
          </div>

          <div className="space-y-4">
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 rounded-2xl glass border border-white/10 shadow-premium hover:border-white/20 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-primary">{app.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-xs text-slate-400">{app.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{app.program}</h3>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                      {app.country}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.statusColor}`}>
                      {app.status}
                    </span>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5">
                      <Eye className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </div>

                {/* Progress bar tracking */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Müraciət Mərhələsi</span>
                    <span>{app.progress}% tamamlanıb</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${app.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Upcoming Deadlines & Recent Activities */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Critical Deadlines box */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Yaxınlaşan Vaxtlar</h2>
            <div className="p-4 rounded-2xl glass border border-white/10 shadow-premium space-y-4">
              {deadlines.map((dl, i) => (
                <div key={i} className="flex gap-3 pb-3 border-b border-white/5 last:border-b-0 last:pb-0">
                  <div className={`p-2.5 rounded-xl h-fit shrink-0 ${
                    dl.type === 'critical' ? 'bg-red-500/10 text-red-400' :
                    dl.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-semibold text-white line-clamp-1">{dl.title}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{dl.date} | {dl.time}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        dl.type === 'critical' ? 'bg-red-500/20 text-red-400' :
                        dl.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>{dl.daysLeft}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Son Fəaliyyət</h2>
            <div className="p-4 rounded-2xl glass border border-white/10 shadow-premium space-y-4">
              {activities.map((act, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`p-2 rounded-xl shrink-0 h-fit ${act.color}`}>
                    <act.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">
                      <span className="font-bold text-white">{act.user}: </span>
                      {act.action}
                    </p>
                    <span className="text-[10px] text-slate-500">{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
