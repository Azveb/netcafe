'use client';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, HeartHandshake, BookOpen, TrendingUp } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Sürətli Müraciət', desc: 'Proqramlara onlayn müraciət, real-time status izləmə' },
  { icon: Shield, title: 'Etibarlı', desc: 'Rəsmi Erasmus+ və ESC akkreditasiyası' },
  { icon: Globe, title: 'Beynəlxalq Şəbəkə', desc: '50+ ölkədə tərəfdaş universitetlər' },
  { icon: HeartHandshake, title: 'Mentorluq', desc: 'Təcrübəli mentorlardan şəxsi dəstək' },
  { icon: BookOpen, title: 'Resurslar', desc: 'Visa, sənəd, hazırlıq materialları' },
  { icon: TrendingUp, title: 'Karyera', desc: 'İş imkanları və staj proqramları' },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Niyə Biz?</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Beynəlxalq təhsil yolunuzda hər addımda yanınızdayıq</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                <div className="p-2 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
