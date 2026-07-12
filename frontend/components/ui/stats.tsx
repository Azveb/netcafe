'use client';
import { motion } from 'framer-motion';
import { Users, Globe, Award, BookOpen } from 'lucide-react';

const stats = [
  { value: '10,000+', label: 'Tələbə', icon: Users },
  { value: '50+', label: 'Ölkə', icon: Globe },
  { value: '95%', label: 'Uğur nisbəti', icon: Award },
  { value: '200+', label: 'Proqram', icon: BookOpen },
];

export function Stats() {
  return (
    <section className="py-20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
