'use client';
import { motion } from 'framer-motion';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-purple-600 p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Səyahətinizə Başlayın</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Minlərlə tələbə ilə birlikdə beynəlxalq təhsil imkanlarından yararlanın</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                İndi Başla <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                Ətraflı Məlumat
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
