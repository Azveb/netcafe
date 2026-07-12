import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Hero } from '@/components/ui/hero';
import { Stats } from '@/components/ui/stats';
import { Programs } from '@/components/ui/programs';
import { Features } from '@/components/ui/features';
import { Testimonials } from '@/components/ui/testimonials';
import { Partners } from '@/components/ui/partners';
import { BlogSection } from '@/components/ui/blog-section';
import { CTA } from '@/components/ui/cta';

function ComponentLoader() {
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-4/5">
        <div className="h-12 bg-muted rounded w-1/3 mx-auto"></div>
        <div className="h-6 bg-muted rounded w-2/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="h-40 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations('hero');
  return (
    <main className="overflow-x-hidden">
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        cta={t('cta')}
        stats={{ students: t('stats.students'), countries: t('stats.countries'), successRate: t('stats.successRate') }}
      />
      <Suspense fallback={<ComponentLoader />}><Stats /></Suspense>
      <Suspense fallback={<ComponentLoader />}><Programs /></Suspense>
      <Suspense fallback={<ComponentLoader />}><Features /></Suspense>
      <Suspense fallback={<ComponentLoader />}><Testimonials /></Suspense>
      <Suspense fallback={<ComponentLoader />}><Partners /></Suspense>
      <Suspense fallback={<ComponentLoader />}><BlogSection /></Suspense>
      <Suspense fallback={<ComponentLoader />}><CTA /></Suspense>
    </main>
  );
}
