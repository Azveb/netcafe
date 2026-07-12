'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Globe, Users, Award } from 'lucide-react';
import { Button } from './button';

const programs = [
  { icon: Globe, title: 'Erasmus+', desc: 'Avropa universitetlərində təhsil imkanları', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, title: 'ESC', desc: 'Könüllülük fəaliyyəti proqramları', color: 'from-green-500 to-emerald-500' },
  { icon: Award, title: 'Təqaüdlər', desc: 'Beynəlxalq təqaüd imkanları', color: 'from-purple-500 to-violet-500' },
  { icon: GraduationCap, title: 'Treninqlər', desc: 'Peşəkar inkişaf kursları', color: 'from-orange-500 to-amber-500' },
];

export function Programs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Proqramlarımız</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Beynəlxalq təhsil və inkişaf üçün geniş imkanlar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
