export const sanityTags = {
  blog: 'sanity:blog',
  work: 'sanity:work',
  caseStudies: 'sanity:case-studies',
  services: 'sanity:services',
} as const;

export type SanityTag = (typeof sanityTags)[keyof typeof sanityTags];
