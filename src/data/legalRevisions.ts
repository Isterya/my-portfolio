/**
 * Date of the current wording of each legal page (ISO 8601, YYYY-MM-DD).
 * Update it in the same commit that changes the page text in the locales.
 */
export const legalRevisions = {
  privacyPolicy: '2025-04-26',
  termsOfUse: '2025-04-26',
} as const;

export type LegalDocument = keyof typeof legalRevisions;
