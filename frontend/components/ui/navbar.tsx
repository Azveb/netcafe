'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Button } from './button';
import { LanguageSwitcher } from './language-switcher';
import { 
  Menu, X, Moon, Sun, User, Search,
  GraduationCap, Globe, Users, Award, Briefcase, BookOpen, Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('home'), href: '/', icon: null },
    { label: t('programs'), href: '/programs', icon: GraduationCap },
    { label: t('erasmus'), href: '/erasmus', icon: Globe },
    { label: t('esc'), href: '/esc', icon: Users },
    { label: t('scholarships'), href: '/scholarships', icon: Award },
    { label: t('jobs'), href: '/jobs', icon: Briefcase },
    { label: t('blog'), href: '/blog', icon: BookOpen },
    { label: t('events'), href: '/events', icon: Calendar },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'glass border-b border-white/10' : 'bg-transparent'
    )}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500" />
            <span className="font-bold text-xl">EduPlatform</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              {t('signIn')}
            </Button>
            <Button>
              {t('signUp')}
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-primary/10"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                <LanguageSwitcher />
                <Button variant="outline" className="w-full justify-center">
                  <User className="h-4 w-4 mr-2" />
                  {t('signIn')}
                </Button>
                <Button className="w-full justify-center">
                  {t('signUp')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}