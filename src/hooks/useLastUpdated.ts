import { useTranslation } from 'react-i18next';
import { lastUpdated } from '@/data/lastUpdated';

export function useLastUpdated(section: keyof typeof lastUpdated) {
  const { i18n } = useTranslation();
  const locale = i18n.language as 'en' | 'ru' | 'pl';

  return lastUpdated[section]?.[locale] || '';
}
