import Image from 'next/image';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import type { TeamMember } from '../model/team-member.types';

type TeamMemberCardProps = {
  locale: Locale;
  member: TeamMember;
  ctaLabel: string;
};

export function TeamMemberCard({ locale, member, ctaLabel }: TeamMemberCardProps) {
  const avatarUrl = member.avatar
    ? urlFor(member.avatar).width(640).height(640).fit('crop').url()
    : null;

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="aspect-square overflow-hidden bg-white/5">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={member.avatarAlt || member.name}
            width={640}
            height={640}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            {member.name}
          </div>
        )}
      </div>

      <div className="p-6 md:p-7">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300">
          {member.role}
        </p>

        <h3 className="mb-3 text-2xl font-bold text-white">{member.name}</h3>

        <p className="mb-4 text-sm leading-relaxed text-slate-300">{member.tagline}</p>

        {member.shortBio ? (
          <p className="mb-6 text-sm leading-relaxed text-slate-400">{member.shortBio}</p>
        ) : null}

        <Link
          href={{ pathname: '/team/[slug]', params: { slug: member.slug } }}
          locale={locale}
          className="inline-flex items-center text-sm font-medium text-sky-300 transition hover:text-white"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
