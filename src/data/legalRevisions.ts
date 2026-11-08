export const legalRevisions = {
  privacyPolicy: '2025-04-26',
  termsOfUse: '2025-04-26',
} as const;

export type LegalDocument = keyof typeof legalRevisions;
