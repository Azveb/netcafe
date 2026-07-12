'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  { title: 'Erasmus+ 2025 müraciət tarixi açıqlandı', date: '12 İyul 2025', category: 'Xəbər' },
  { title: 'Almaniyanın ən yaxşı 10 universiteti', date: '8 İyul 2025', category: 'Rehber' },
  { title: 'ESC könüllülüyü necə müraciət edilir?', date: '5 İyul 2025', category: 'Rehber' },
];

export function BlogSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Son Yazılar</h2>
          <a href="/blog" className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
            Hamısı <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all cursor-pointer group">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{p.category}</span>
              <h3 className="font-semibold mt-3 mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
