'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { LanguageSwitcher } from './language-switcher';
import {
  Menu, X, Moon, Sun, Search, Bell, ChevronDown,
  GraduationCap, Globe, Users, Award, Briefcase, BookOpen, Calendar, ArrowRight, LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProgramsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const programs = [
    { name: 'Erasmus+ KA1', desc: 'Gənclər mübadiləsi və təlim kursları', icon: Users, color: 'text-blue-400 bg-blue-500/10', href: '/erasmus' },
    { name: 'ESC Könüllülük', desc: 'Avropada 12 ayadək pulsuz yaşayış', icon: Globe, color: 'text-purple-400 bg-purple-500/10', href: '/esc' },
    { name: 'Xaricdə Magistr', desc: 'Avropa universitetlərinə tam təqaüdlü qəbul', icon: GraduationCap, color: 'text-pink-400 bg-pink-500/10', href: '/scholarships' },
    { name: 'Karyera Dəstəyi', desc: 'CV, motivasiya məktubu və müsahibə hazırlığı', icon: Award, color: 'text-amber-400 bg-amber-500/10', href: '/jobs' },
  ];

  const navLinks = [
    { label: t('blog'), href: '/blog', icon: BookOpen },
    { label: t('events'), href: '/events', icon: Calendar },
    { label: t('jobs'), href: '/jobs', icon: Briefcase },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-white/10 shadow-premium'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        )}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary via-purple-500 to-pink-500 flex items-center justify-center shadow-glow">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">EduPlatform</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                {t('home')}
              </Link>

              {/* Programs Mega Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-xl transition-all inline-flex items-center gap-1.5',
                    isProgramsOpen ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {t('programs')}
                  <ChevronDown className={cn('h-4 w-4 transition-transform', isProgramsOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {isProgramsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[500px] p-4 rounded-2xl glass-muffled border border-white/10 shadow-premium-hover"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Proqramlar</span>
                        <Link href="/programs" onClick={() => setIsProgramsOpen(false)} className="text-xs text-primary hover:underline flex items-center gap-1">
                          Hamısına bax <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {programs.map((p, i) => (
                          <Link
                            key={i}
                            href={p.href}
                            onClick={() => setIsProgramsOpen(false)}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <div className={cn('p-2 rounded-lg shrink-0', p.color)}>
                              <p.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors">{p.name}</h4>
                              <p className="text-xs text-white/40 mt-0.5">{p.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <div className="w-px h-5 bg-white/10" />
              <Link href="/login">
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl gap-2">
                  <LogIn className="h-4 w-4" />
                  {t('signIn')}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5">
                  {t('signUp')}
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}><X className="h-6 w-6" /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}><Menu className="h-6 w-6" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden glass border-t border-white/5 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                <Link href="/" onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                  {t('home')}
                </Link>

                {/* Mobile Programs Section */}
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">{t('programs')}</p>
                  <div className="space-y-1">
                    {programs.map((p, i) => (
                      <Link key={i} href={p.href} onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
                        <div className={cn('p-1.5 rounded-lg', p.color)}>
                          <p.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{p.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {navLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}

                <div className="pt-3 mt-3 border-t border-white/5 flex flex-col gap-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-white/10 text-white bg-transparent hover:bg-white/10">
                      {t('signIn')}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary">{t('signUp')}</Button>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
