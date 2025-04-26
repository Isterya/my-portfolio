const createSections = (prefix: string, ids: string[]) => {
  return ids.map((id) => ({
    id,
    title: `tableOfContents.${prefix}.${id}`,
  }));
};

const privacyPolicyIds = [
  'who',
  'data',
  'usage',
  'cookies',
  'sharing',
  'legal',
  'rights',
  'retention',
  'security',
  'children',
  'links',
  'changes',
  'contact',
];

const termsIds = [
  'about',
  'services',
  'intellectual',
  'limitations',
  'thirdParty',
  'disclaimer',
  'age',
  'privacy',
  'changes',
  'contact',
];

export const privacyPolicySections = createSections('privacyPolicy', privacyPolicyIds);
export const termsSections = createSections('terms', termsIds);
