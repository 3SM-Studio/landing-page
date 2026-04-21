import { getBlogPostBySlug } from '@/entities/blog/api/blog.repository';
import { getCaseStudyBySlug } from '@/entities/case-study/api/case-studies.repository';
import { getClientBySlug } from '@/entities/client/api/client.repository';
import { getPartnerBySlug } from '@/entities/partner/api/partner.repository';
import { getServiceBySlug } from '@/entities/service/api/service.repository';
import { getTeamMemberBySlug } from '@/entities/team-member/api/team-member.repository';
import { routes } from '@/shared/lib/routes';
import type { AppPathname, Locale } from './routing';

type LocaleSwitchParams = Record<string, string | undefined>;

type LocaleTranslation = {
  language?: string | null;
  slug?: string | null;
};

type LocaleSwitchInput = {
  pathname: string;
  currentLocale: Locale;
  targetLocale: Locale;
  params?: LocaleSwitchParams;
};

type LocaleSwitchResolvedRoute = {
  pathname: AppPathname;
  params?: Record<string, string>;
} | null;

const DYNAMIC_DETAIL_PATHNAMES = new Set<AppPathname>([
  routes.blogDetail,
  routes.caseStudyDetail,
  routes.serviceDetail,
  routes.clientDetail,
  routes.partnerDetail,
  routes.teamDetail,
]);

function isAppPathname(value: string): value is AppPathname {
  return Object.values(routes).includes(value as AppPathname);
}

function pickTargetSlug(
  translations: LocaleTranslation[] | null | undefined,
  targetLocale: Locale,
) {
  if (!Array.isArray(translations) || translations.length === 0) {
    return undefined;
  }

  const match = translations.find((item) => item?.language === targetLocale)?.slug?.trim();
  return match || undefined;
}

async function resolveDynamicDetailRoute(
  pathname: AppPathname,
  currentLocale: Locale,
  targetLocale: Locale,
  currentSlug: string,
): Promise<LocaleSwitchResolvedRoute> {
  switch (pathname) {
    case routes.blogDetail: {
      const item = await getBlogPostBySlug(currentLocale, currentSlug);
      const targetSlug = pickTargetSlug(item?.translations, targetLocale);

      if (!targetSlug) {
        return { pathname: routes.blog };
      }

      return {
        pathname: routes.blogDetail,
        params: { slug: targetSlug },
      };
    }

    case routes.caseStudyDetail: {
      const item = await getCaseStudyBySlug(currentLocale, currentSlug);
      const targetSlug = pickTargetSlug(item?.translations, targetLocale);

      if (!targetSlug) {
        return { pathname: routes.caseStudies };
      }

      return {
        pathname: routes.caseStudyDetail,
        params: { slug: targetSlug },
      };
    }

    case routes.serviceDetail: {
      const item = await getServiceBySlug(currentLocale, currentSlug);
      const targetSlug = pickTargetSlug(item?.translations, targetLocale);

      if (!targetSlug) {
        return { pathname: routes.services };
      }

      return {
        pathname: routes.serviceDetail,
        params: { slug: targetSlug },
      };
    }

    case routes.clientDetail: {
      const item = await getClientBySlug(currentLocale, currentSlug);
      const targetSlug = pickTargetSlug(item?.translations, targetLocale);

      if (!targetSlug) {
        return { pathname: routes.clients };
      }

      return {
        pathname: routes.clientDetail,
        params: { slug: targetSlug },
      };
    }

    case routes.partnerDetail: {
      const item = await getPartnerBySlug(currentLocale, currentSlug);
      const targetSlug = pickTargetSlug(item?.translations, targetLocale);

      if (!targetSlug) {
        return { pathname: routes.partners };
      }

      return {
        pathname: routes.partnerDetail,
        params: { slug: targetSlug },
      };
    }

    case routes.teamDetail: {
      const item = await getTeamMemberBySlug(currentLocale, currentSlug);
      const targetSlug = pickTargetSlug(item?.translations, targetLocale);

      if (!targetSlug) {
        return { pathname: routes.home };
      }

      return {
        pathname: routes.teamDetail,
        params: { slug: targetSlug },
      };
    }

    default:
      return null;
  }
}

export async function resolveLocaleSwitchRoute({
  pathname,
  currentLocale,
  targetLocale,
  params = {},
}: LocaleSwitchInput): Promise<LocaleSwitchResolvedRoute> {
  if (!isAppPathname(pathname)) {
    return null;
  }

  if (!DYNAMIC_DETAIL_PATHNAMES.has(pathname)) {
    const normalizedParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => typeof value === 'string' && value.trim()),
    ) as Record<string, string>;

    if (Object.keys(normalizedParams).length > 0) {
      return {
        pathname,
        params: normalizedParams,
      };
    }

    return { pathname };
  }

  const currentSlug = params.slug?.trim();

  if (!currentSlug) {
    return { pathname: routes.home };
  }

  return resolveDynamicDetailRoute(pathname, currentLocale, targetLocale, currentSlug);
}
