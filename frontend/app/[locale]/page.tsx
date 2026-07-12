import { useTranslations } from 'next-intl';
import { Hero } from '@/components/ui/hero';
import { Stats } from '@/components/ui/stats';
import { Programs } from '@/components/ui/programs';
import { Features } from '@/components/ui/features';
import { Testimonials } from '@/components/ui/testimonials';
import { Partners } from '@/components/ui/partners';
import { BlogSection } from '@/components/ui/blog-section';
import { CTA } from '@/components/ui/cta';

export default function HomePage() {
  const t = useTranslations('hero');

  return (
    <main>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        cta={t('cta')}
        stats={{
          students: t('stats.students'),
          countries: t('stats.countries'),
          successRate: t('stats.successRate'),
        }}
      />
      <Stats />
      <Programs />
      <Features />
      <Testimonials />
      <Partners />
      <BlogSection />
      <CTA />
    </main>
  );
}