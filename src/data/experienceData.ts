export type ExperienceSide = 'left' | 'right';

export interface ExperienceDataItem {
  key: string;
  /** The description contains <link1>…</link1>-style placeholders filled with `certificateLinks`. */
  hasLinks?: boolean;
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
  { key: 'courses', hasLinks: true },
  { key: 'frontend' },
];

/** Certificates for <link1>…<link4> in `experience.dataRight.courses.descr`, in order. */
export const certificateLinks = [
  // JavaScript
  'https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg',
  // TypeScript
  'https://udemy-certificate.s3.amazonaws.com/image/UC-00bc5d87-e2f1-448f-9126-ae957f694436.jpg',
  // React: currently the same file as the JavaScript certificate (docs/v2-review.md, BUG-8)
  'https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg',
  // Front-end
  'https://udemy-certificate.s3.amazonaws.com/image/UC-6a2a853e-2363-4ace-93e0-2a3b0b386d0c.jpg',
];
