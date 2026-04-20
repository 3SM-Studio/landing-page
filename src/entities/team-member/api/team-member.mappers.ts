import type { TeamMember, TeamMemberFeaturedProject } from '../model/team-member.types';

type RawFeaturedProject = TeamMemberFeaturedProject;

export type RawTeamMember = Omit<TeamMember, 'featured' | 'isActive' | 'featuredProjects'> & {
  featured?: boolean | null;
  isActive?: boolean | null;
  featuredCaseStudies?: RawFeaturedProject[] | null;
  featuredPosts?: RawFeaturedProject[] | null;
};

export type RawTeamMemberSlug = {
  slug: string;
};

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizePortableText<T>(value: T[] | null | undefined) {
  return Array.isArray(value) && value.length > 0 ? value : undefined;
}

function normalizeStringArray(value: string[] | null | undefined) {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  const normalized = value
    .map((item) => item?.trim())
    .filter((item): item is string => Boolean(item));
  return normalized.length > 0 ? normalized : undefined;
}

function mergeFeaturedProjects(item: RawTeamMember): TeamMemberFeaturedProject[] | undefined {
  const values = [...(item.featuredCaseStudies ?? []), ...(item.featuredPosts ?? [])].filter(
    (project): project is TeamMemberFeaturedProject =>
      Boolean(project?._id && project.slug && project.title),
  );

  return values.length > 0 ? values : undefined;
}

export function mapRawTeamMemberToTeamMember(item: RawTeamMember): TeamMember {
  return {
    _id: item._id,
    name: item.name,
    slug: item.slug,
    memberKey: item.memberKey,
    role: item.role,
    tagline: item.tagline,
    avatar: item.avatar ?? null,
    avatarAlt: cleanOptionalString(item.avatarAlt),
    shortBio: cleanOptionalString(item.shortBio),
    intro: normalizePortableText(item.intro),
    specialties: normalizeStringArray(item.specialties),
    experience: normalizePortableText(item.experience),
    quote: cleanOptionalString(item.quote),
    email: cleanOptionalString(item.email),
    links: item.links ?? undefined,
    featuredProjects: mergeFeaturedProjects(item),
    featured: Boolean(item.featured),
    isActive: Boolean(item.isActive),
    translations:
      Array.isArray(item.translations) && item.translations.length > 0
        ? item.translations
        : undefined,
    seo: item.seo ?? undefined,
  };
}

export function mapRawTeamMembersToTeamMembers(items: RawTeamMember[]) {
  return items.map(mapRawTeamMemberToTeamMember);
}

export function mapRawTeamMemberSlugsToTeamMemberSlugs(items: RawTeamMemberSlug[]) {
  return items.map((item) => ({ slug: item.slug }));
}
