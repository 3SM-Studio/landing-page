export const sanityTags = {
  blog: 'sanity:blog',
  caseStudies: 'sanity:case-studies',
  clients: 'sanity:clients',
  partners: 'sanity:partners',
  services: 'sanity:services',
  teamMembers: 'sanity:team-members',
  staticPages: 'sanity:static-pages',
  legalDocuments: 'sanity:legal-documents',
} as const;

export type SanityTag = (typeof sanityTags)[keyof typeof sanityTags];
