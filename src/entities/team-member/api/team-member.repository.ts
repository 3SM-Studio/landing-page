import type { Locale } from '@/shared/i18n/routing';
import { sanityFetch } from '@/shared/sanity/fetch';
import { sanityTags } from '@/shared/sanity/tags';
import { TEAM_MEMBERS_REVALIDATE_SECONDS } from '../model/team-member.constants';
import type { TeamMember } from '../model/team-member.types';
import {
  mapRawTeamMemberSlugsToTeamMemberSlugs,
  mapRawTeamMemberToTeamMember,
  mapRawTeamMembersToTeamMembers,
  type RawTeamMember,
  type RawTeamMemberSlug,
} from './team-member.mappers';
import {
  TEAM_MEMBER_BY_SLUG_QUERY,
  TEAM_MEMBER_SLUGS_QUERY,
  TEAM_MEMBERS_QUERY,
} from './team-member.queries';

const teamMemberFetchOptions = {
  revalidate: TEAM_MEMBERS_REVALIDATE_SECONDS,
  tags: [sanityTags.teamMembers],
} as const;

export async function getTeamMembers(locale: Locale) {
  const items = await sanityFetch<RawTeamMember[]>(
    TEAM_MEMBERS_QUERY,
    { locale },
    teamMemberFetchOptions,
  );

  return mapRawTeamMembersToTeamMembers(items);
}

export async function getTeamMemberBySlug(locale: Locale, slug: string) {
  const item = await sanityFetch<RawTeamMember | null>(
    TEAM_MEMBER_BY_SLUG_QUERY,
    { locale, slug },
    teamMemberFetchOptions,
  );

  return item ? mapRawTeamMemberToTeamMember(item) : null;
}

export async function getTeamMemberSlugs(locale: Locale) {
  const items = await sanityFetch<RawTeamMemberSlug[]>(
    TEAM_MEMBER_SLUGS_QUERY,
    { locale },
    teamMemberFetchOptions,
  );

  return mapRawTeamMemberSlugsToTeamMemberSlugs(items);
}

export async function getTeamMemberOrThrow(locale: Locale, slug: string): Promise<TeamMember> {
  const item = await getTeamMemberBySlug(locale, slug);

  if (!item) {
    throw new Error(`Team member not found for locale "${locale}" and slug "${slug}"`);
  }

  return item;
}
