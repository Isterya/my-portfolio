export interface ExperienceDataItem {
  key: string;
  hasJSX?: boolean;
}

export const dataLeft: ExperienceDataItem[] = [
  { key: 'education' },
  { key: 'college' },
  { key: 'specialization' },
  { key: 'work' },
];

export const dataRight: ExperienceDataItem[] = [
  { key: 'lyceum' },
  { key: 'technician' },
  { key: 'courses', hasJSX: true },
  { key: 'frontend' },
];
