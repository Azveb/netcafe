'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Aynur M.', country: '🇩🇪 Almaniya', text: 'Erasmus+ proqramı sayəsində Münhen Universitetində oxudum. Bu platforma olmadan mümkün olmazdı!', stars: 5 },
  { name: 'Rauf H.', country: '🇵🇱 Polşa', text: 'ESC könüllülük proqramı həyatımı dəyişdirdi. Əla dəstək aldım.', stars: 5 },
  { name: 'Leyla K.', country: '🇮🇹 İtaliya', text: 'Təqaüd müraciəti prosesi çox asan idi. 2 həftəyə nəticəni aldım!', stars: 5 },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Tələbələrimiz Deyir</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex mb-3">
                {[...Array(t.stars)].map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <p className="text-muted-foreground text-sm mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.country}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
