import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import '@/app/globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const locales = ['az', 'ru', 'tr', 'en'];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const titles: Record<string, string> = {
    az: 'EduPlatform - Beynəlxalq Təhsil və İnkişaf Portalı',
    en: 'EduPlatform - International Education & Development Portal',
    ru: 'EduPlatform - Международный образовательный портал',
    tr: 'EduPlatform - Uluslararası Eğitim ve Gelişim Portalı',
  };
  const descriptions: Record<string, string> = {
    az: 'Erasmus+, ESC, beynəlxalq təqaüdlər, xaricdə təhsil və karyera imkanları bir platformada.',
    en: 'Erasmus+, ESC, international scholarships, study abroad, and career opportunities in one platform.',
    ru: 'Erasmus+, ESC, международные стипендии, обучение за рубежом и карьерные возможности на одной платформе.',
    tr: 'Erasmus+, ESC, uluslararası burslar, yurt dışı eğitim ve kariyer fırsatları tek bir platformda.',
  };
  return {
    title: titles[locale] || titles['az'],
    description: descriptions[locale] || descriptions['az'],
    robots: 'index, follow',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sansFont.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
            <Toaster position="bottom-right" richColors closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
