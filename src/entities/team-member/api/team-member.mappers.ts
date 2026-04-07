import type { TeamMember, TeamMemberSlug } from '../model/team-member.types';

type RawTeamMember = Omit<TeamMember, 'featured' | 'isActive'> & {
  featured?: boolean | null;
  isActive?: boolean | null;
};

type RawTeamMemberSlug = TeamMemberSlug;

function cleanOptionalString(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeStringArray(value: string[] | null | undefined) {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  const normalized = value.map((item) => item.trim()).filter(Boolean);
  return normalized.length ? normalized : undefined;
}

function normalizePortableText<T>(value: T[] | null | undefined) {
  return Array.isArray(value) && value.length > 0 ? value : undefined;
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
    links: item.links,
    featuredProjects: item.featuredProjects?.filter(
      (project) => project?._type !== 'workProject' && project?.slug && project?.title,
    ),
    order: typeof item.order === 'number' ? item.order : undefined,
    featured: Boolean(item.featured),
    isActive: Boolean(item.isActive),
    translations:
      Array.isArray(item.translations) && item.translations.length > 0
        ? item.translations
        : undefined,
    seo: item.seo
      ? {
          title: cleanOptionalString(item.seo.title),
          description: cleanOptionalString(item.seo.description),
          socialImage: item.seo.socialImage ?? null,
          socialImageAlt: cleanOptionalString(item.seo.socialImageAlt),
        }
      : undefined,
  };
}

export function mapRawTeamMembersToTeamMembers(items: RawTeamMember[]) {
  return items.map(mapRawTeamMemberToTeamMember);
}

export function mapRawTeamMemberSlugsToTeamMemberSlugs(items: RawTeamMemberSlug[]) {
  return items.map((item) => ({ slug: item.slug }));
}

export type { RawTeamMember, RawTeamMemberSlug };
