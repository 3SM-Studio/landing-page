import type { Locale } from '@/shared/i18n/routing';
import type { TeamMember } from '@/entities/team-member/model/team-member.types';
import { TeamMemberCard } from '@/entities/team-member/ui/TeamMemberCard';

type AboutTeamSectionProps = {
  locale: Locale;
  title: string;
  description: string;
  ctaLabel: string;
  members: TeamMember[];
};

export function AboutTeamSection({
  locale,
  title,
  description,
  ctaLabel,
  members,
}: AboutTeamSectionProps) {
  if (!members.length) {
    return null;
  }

  return (
    <div className="mb-20">
      <div className="mb-8 max-w-3xl">
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
        <p className="text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {members.map((member) => (
          <TeamMemberCard key={member._id} locale={locale} member={member} ctaLabel={ctaLabel} />
        ))}
      </div>
    </div>
  );
}
