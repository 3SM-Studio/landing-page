export const sanityTags = {
  blog: 'sanity:blog',
  work: 'sanity:work',
  caseStudies: 'sanity:case-studies',
  clients: 'sanity:clients',
  partners: 'sanity:partners',
  services: 'sanity:services',
  teamMembers: 'sanity:team-members',
} as const;

export type SanityTag = (typeof sanityTags)[keyof typeof sanityTags];
