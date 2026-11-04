import { useTranslation } from 'react-i18next';
import { lastUpdated } from '@/data/lastUpdated';
import { toAppLanguage } from '@/i18n/languages';

export function useLastUpdated(section: keyof typeof lastUpdated) {
  const { i18n } = useTranslation();
  const locale = toAppLanguage(i18n.resolvedLanguage);

  return lastUpdated[section]?.[locale] || '';
}
