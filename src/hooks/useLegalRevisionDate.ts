import { useTranslation } from 'react-i18next';

import { LegalDocument, legalRevisions } from '@/data/legalRevisions';
import { toAppLanguage } from '@/i18n/languages';

/** Revision date of a legal page, formatted for the active language (e.g. "26 апреля 2025 г."). */
export function useLegalRevisionDate(document: LegalDocument) {
  const { i18n } = useTranslation();
  const language = toAppLanguage(i18n.resolvedLanguage);

  // The ISO date is parsed as UTC midnight; format in UTC so it never shifts to the previous day.
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(legalRevisions[document]));
}
