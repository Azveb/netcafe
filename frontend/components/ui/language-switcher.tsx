'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

const locales: Record<string, string> = {
  az: 'AZ',
  ru: 'RU',
  tr: 'TR',
  en: 'EN',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${path}`);
  };

  return (
    <div className="flex items-center gap-1 border border-border rounded-lg p-1">
      <Globe className="h-4 w-4 text-muted-foreground ml-1" />
      {Object.entries(locales).map(([code, label]) => (
        <button
          key={code}
          onClick={() => handleChange(code)}
          className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
            locale === code
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted text-muted-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
