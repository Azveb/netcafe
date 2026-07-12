import { useTranslations as useNextIntlTranslations } from 'next-intl';

export function useTranslation() {
  const t = useNextIntlTranslations();
  return t;
}