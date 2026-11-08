import { useTranslation } from 'react-i18next';

import { LegalDocument, legalRevisions } from '@/data/legalRevisions';
import { toAppLanguage } from '@/i18n/languages';

export function useLegalRevisionDate(document: LegalDocument) {
  const { i18n } = useTranslation();
  const language = toAppLanguage(i18n.resolvedLanguage);

  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(legalRevisions[document]));
}
