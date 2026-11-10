export interface ExperienceStage {
  place: string;
  details: string;
  hasCertificateLinks?: boolean;
}

export const experienceStages: ExperienceStage[] = [
  { place: 'education', details: 'lyceum' },
  { place: 'college', details: 'technician' },
  { place: 'specialization', details: 'courses', hasCertificateLinks: true },
  { place: 'work', details: 'frontend' },
];

export const certificateLinks = [
  'https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg',
  'https://udemy-certificate.s3.amazonaws.com/image/UC-00bc5d87-e2f1-448f-9126-ae957f694436.jpg',
  'https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg',
  'https://udemy-certificate.s3.amazonaws.com/image/UC-6a2a853e-2363-4ace-93e0-2a3b0b386d0c.jpg',
];
