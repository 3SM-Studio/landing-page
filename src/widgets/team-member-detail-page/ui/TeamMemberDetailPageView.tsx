import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { Link } from '@/shared/i18n/navigation';
import { PageBreadcrumbs } from '@/shared/ui/PageBreadcrumbs';
import type { Locale } from '@/shared/i18n/routing';
import { urlFor } from '@/shared/sanity/image';
import { Container } from '@/shared/ui/Container';
import { PageTopSection } from '@/shared/ui/page-top-section/PageTopSection';
import type {
  TeamMember,
  TeamMemberFeaturedProject,
} from '@/entities/team-member/model/team-member.types';

const linkLabels = {
  website: 'Website',
  instagram: 'Instagram',
  x: 'X',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  github: 'GitHub',
  linkedin: 'LinkedIn',
} as const;

type TeamMemberDetailCopy = {
  backToAbout: string;
  introTitle: string;
  experienceTitle: string;
  specialtiesTitle: string;
  contactTitle: string;
  featuredProjectsTitle: string;
  emptyExperience: string;
  emptyFeaturedProjects: string;
  quoteTitle: string;
  emailLabel: string;
  viewProject: string;
};

type TeamMemberDetailPageViewProps = {
  locale: Locale;
  member: TeamMember;
  copy: TeamMemberDetailCopy;
};

function getProjectPathname(project: TeamMemberFeaturedProject) {
  switch (project._type) {
    case 'caseStudy':
      return '/case-studies/[slug]' as const;
    case 'post':
      return '/blog/[slug]' as const;
    default:
      return '/case-studies/[slug]' as const;
  }
}

export function TeamMemberDetailPageView({ locale, member, copy }: TeamMemberDetailPageViewProps) {
  const avatarUrl = member.avatar
    ? urlFor(member.avatar).width(900).height(1100).fit('crop').url()
    : null;

  return (
    <PageTopSection className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-96 w-96 rounded-full bg-sky-500/15 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-5%] h-80 w-80 rounded-full bg-indigo-500/15 blur-[140px]" />
      </div>

      <Container className="relative z-10">
        <PageBreadcrumbs
          locale={locale}
          items={[
            { label: locale === 'pl' ? 'o nas' : 'about', href: '/about' },
            { label: member.name },
          ]}
        />

        <article className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={member.avatarAlt || member.name}
                width={900}
                height={1100}
                className="h-auto w-full object-cover"
                priority
              />
            ) : (
              <div className="flex min-h-[32rem] items-center justify-center text-sm text-slate-500">
                {member.name}
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-sky-300">
              {member.role}
            </p>
            <h1 className="mb-4 text-4xl font-black leading-tight text-white md:text-6xl">
              {member.name}
            </h1>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              {member.tagline}
            </p>

            {member.specialties?.length ? (
              <div className="mb-10 flex flex-wrap gap-3">
                {member.specialties.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <section className="mb-8 rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                {copy.introTitle}
              </p>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
                {member.intro?.length ? <PortableText value={member.intro} /> : null}
              </div>
            </section>

            {member.quote ? (
              <section className="mb-8 rounded-[28px] border border-sky-400/15 bg-sky-400/10 p-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-200">
                  {copy.quoteTitle}
                </p>
                <blockquote className="text-lg leading-relaxed text-white">
                  “{member.quote}”
                </blockquote>
              </section>
            ) : null}

            <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
              <section className="rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                  {copy.experienceTitle}
                </p>
                <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
                  {member.experience?.length ? (
                    <PortableText value={member.experience} />
                  ) : (
                    <p>{copy.emptyExperience}</p>
                  )}
                </div>
              </section>

              <div className="space-y-8">
                <section className="rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                    {copy.specialtiesTitle}
                  </p>
                  {member.specialties?.length ? (
                    <ul className="space-y-3 text-sm text-slate-300">
                      {member.specialties.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>

                <section className="rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                    {copy.contactTitle}
                  </p>

                  <div className="space-y-3 text-sm text-slate-300">
                    {member.email ? (
                      <div>
                        <span className="mr-2 text-slate-500">{copy.emailLabel}:</span>
                        <a href={`mailto:${member.email}`} className="transition hover:text-white">
                          {member.email}
                        </a>
                      </div>
                    ) : null}

                    {member.links
                      ? Object.entries(member.links).map(([key, value]) => {
                          if (!value) {
                            return null;
                          }

                          return (
                            <div key={key}>
                              <a
                                href={value}
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                              >
                                {linkLabels[key as keyof typeof linkLabels]}
                              </a>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-14 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="mb-6 text-2xl font-bold text-white">{copy.featuredProjectsTitle}</h2>

          {member.featuredProjects?.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {member.featuredProjects.map((project) => (
                <article
                  key={project._id}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5"
                >
                  <h3 className="mb-3 text-lg font-semibold text-white">{project.title}</h3>
                  {project.description ? (
                    <p className="mb-4 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>
                  ) : null}
                  <Link
                    href={{ pathname: getProjectPathname(project), params: { slug: project.slug } }}
                    locale={locale}
                    className="inline-flex items-center text-sm font-medium text-sky-300 transition hover:text-white"
                  >
                    {copy.viewProject}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-slate-400">{copy.emptyFeaturedProjects}</p>
          )}
        </section>
      </Container>
    </PageTopSection>
  );
}
