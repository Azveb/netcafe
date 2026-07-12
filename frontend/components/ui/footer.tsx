'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('nav');
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">EduPlatform</h3>
            <p className="text-sm text-slate-400">Gənclərin beynəlxalq təhsil, Erasmus+, ESC və karyera inkişafı üçün aparıcı rəqəmsal platforması.</p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-primary transition-colors"><Icon size={20} /></a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Sürətli Keçidlər</h3>
            <ul className="space-y-2 text-sm">
              {[['/', t('home')], ['/programs', t('programs')], ['/blog', t('blog')], ['/events', t('events')]].map(([href, label]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Hüquqi</h3>
            <ul className="space-y-2 text-sm">
              {[['Məxfilik Siyasəti', '/privacy'], ['İstifadə Şərtləri', '/terms'], ['Tez-tez Verilən Suallar', '/faq'], ['Bizimlə Əlaqə', '/contact']].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-4">Əlaqə</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin size={16} className="text-primary shrink-0 mt-0.5" /><span>Bakı şəhəri, Nizami küçəsi 142</span></li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-primary" /><span>+994 12 400 00 00</span></li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-primary" /><span>info@eduplatform.az</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {currentYear} EduPlatform. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
}
