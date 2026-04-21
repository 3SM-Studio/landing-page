import { NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/entities/blog/api/blog.repository';
import { getCaseStudyBySlug } from '@/entities/case-study/api/case-studies.repository';
import { getClientBySlug } from '@/entities/client/api/client.repository';
import { getPartnerBySlug } from '@/entities/partner/api/partner.repository';
import { getServiceBySlug } from '@/entities/service/api/service.repository';
import { getTeamMemberBySlug } from '@/entities/team-member/api/team-member.repository';
import type { Locale } from '@/shared/i18n/routing';
import { routes } from '@/shared/lib/routes';

type DynamicDetailPathname =
  | typeof routes.blogDetail
  | typeof routes.caseStudyDetail
  | typeof routes.serviceDetail
  | typeof routes.clientDetail
  | typeof routes.partnerDetail
  | typeof routes.teamDetail;

type StaticPathname =
  | typeof routes.home
  | typeof routes.services
  | typeof routes.caseStudies
  | typeof routes.blog
  | typeof routes.clients
  | typeof routes.partners
  | typeof routes.links
  | typeof routes.about
  | typeof routes.contact
  | typeof routes.privacy
  | typeof routes.cookies
  | typeof routes.legalNotice;

type LocaleSwitchResolvedRoute =
  | { pathname: StaticPathname }
  | { pathname: DynamicDetailPathname; params: { slug: string } };

type LocaleSwitchRequestBody = {
  pathname?: string;
  currentLocale?: Locale;
  targetLocale?: Locale;
  params?: Record<string, string>;
};

function isLocale(value: string | undefined): value is Locale {
  return value === 'pl' || value === 'en';
}

function isStaticPathname(value: string): value is StaticPathname {
  return [
    routes.home,
    routes.services,
    routes.caseStudies,
    routes.blog,
    routes.clients,
    routes.partners,
    routes.links,
    routes.about,
    routes.contact,
    routes.privacy,
    routes.cookies,
    routes.legalNotice,
  ].includes(value as StaticPathname);
}

function isDynamicDetailPathname(value: string): value is DynamicDetailPathname {
  return [
    routes.blogDetail,
    routes.caseStudyDetail,
    routes.serviceDetail,
    routes.clientDetail,
    routes.partnerDetail,
    routes.teamDetail,
  ].includes(value as DynamicDetailPathname);
}

function findTargetSlug(
  translations: { language?: string; slug?: string }[] | undefined,
  targetLocale: Locale,
) {
  return translations?.find((item) => item.language === targetLocale)?.slug;
}

async function resolveDynamicRoute(
  pathname: DynamicDetailPathname,
  currentLocale: Locale,
  targetLocale: Locale,
  slug: string,
): Promise<LocaleSwitchResolvedRoute | null> {
  switch (pathname) {
    case routes.blogDetail: {
      const item = await getBlogPostBySlug(currentLocale, slug);
      const targetSlug = findTargetSlug(item?.translations, targetLocale);
      return targetSlug ? { pathname, params: { slug: targetSlug } } : null;
    }
    case routes.caseStudyDetail: {
      const item = await getCaseStudyBySlug(currentLocale, slug);
      const targetSlug = findTargetSlug(item?.translations, targetLocale);
      return targetSlug ? { pathname, params: { slug: targetSlug } } : null;
    }
    case routes.serviceDetail: {
      const item = await getServiceBySlug(currentLocale, slug);
      const targetSlug = findTargetSlug(item?.translations, targetLocale);
      return targetSlug ? { pathname, params: { slug: targetSlug } } : null;
    }
    case routes.clientDetail: {
      const item = await getClientBySlug(currentLocale, slug);
      const targetSlug = findTargetSlug(item?.translations, targetLocale);
      return targetSlug ? { pathname, params: { slug: targetSlug } } : null;
    }
    case routes.partnerDetail: {
      const item = await getPartnerBySlug(currentLocale, slug);
      const targetSlug = findTargetSlug(item?.translations, targetLocale);
      return targetSlug ? { pathname, params: { slug: targetSlug } } : null;
    }
    case routes.teamDetail: {
      const item = await getTeamMemberBySlug(currentLocale, slug);
      const targetSlug = findTargetSlug(item?.translations, targetLocale);
      return targetSlug ? { pathname, params: { slug: targetSlug } } : null;
    }
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as LocaleSwitchRequestBody;

  if (!body.pathname || !isLocale(body.currentLocale) || !isLocale(body.targetLocale)) {
    return NextResponse.json(
      { ok: false, message: 'Invalid locale switch payload.' },
      { status: 400 },
    );
  }

  if (isStaticPathname(body.pathname)) {
    return NextResponse.json({
      ok: true,
      route: { pathname: body.pathname } satisfies LocaleSwitchResolvedRoute,
    });
  }

  if (!isDynamicDetailPathname(body.pathname)) {
    return NextResponse.json({ ok: false, message: 'Unsupported pathname.' }, { status: 400 });
  }

  const slug = body.params?.slug?.trim();
  if (!slug) {
    return NextResponse.json({ ok: false, message: 'Missing slug.' }, { status: 400 });
  }

  const route = await resolveDynamicRoute(
    body.pathname,
    body.currentLocale,
    body.targetLocale,
    slug,
  );
  if (!route) {
    return NextResponse.json({ ok: false, message: 'Translation not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, route });
}
