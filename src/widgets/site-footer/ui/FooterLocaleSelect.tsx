'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useSyncExternalStore, useTransition } from 'react';

import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { routing, type Locale } from '@/shared/i18n/routing';
import { routes } from '@/shared/lib/routes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select';

type ParamsValue = string | string[] | undefined;

type DynamicDetailPathname =
  | typeof routes.blogDetail
  | typeof routes.caseStudyDetail
  | typeof routes.serviceDetail
  | typeof routes.clientDetail
  | typeof routes.partnerDetail
  | typeof routes.teamDetail;

type StaticPathname =
  | typeof routes.home
  | typeof routes.blog
  | typeof routes.caseStudies
  | typeof routes.services
  | typeof routes.clients
  | typeof routes.partners
  | typeof routes.links
  | typeof routes.about
  | typeof routes.contact
  | typeof routes.privacy
  | typeof routes.cookies
  | typeof routes.legalNotice;

type LocaleSwitchResolvedRoute =
  | { pathname: typeof routes.home }
  | { pathname: typeof routes.blog }
  | { pathname: typeof routes.caseStudies }
  | { pathname: typeof routes.services }
  | { pathname: typeof routes.clients }
  | { pathname: typeof routes.partners }
  | { pathname: typeof routes.blogDetail; params: { slug: string } }
  | { pathname: typeof routes.caseStudyDetail; params: { slug: string } }
  | { pathname: typeof routes.serviceDetail; params: { slug: string } }
  | { pathname: typeof routes.clientDetail; params: { slug: string } }
  | { pathname: typeof routes.partnerDetail; params: { slug: string } }
  | { pathname: typeof routes.teamDetail; params: { slug: string } };

type LocaleSwitchResponse = {
  ok: boolean;
  route?: LocaleSwitchResolvedRoute;
  message?: string;
};

const DYNAMIC_DETAIL_PATHNAMES = new Set<DynamicDetailPathname>([
  routes.blogDetail,
  routes.caseStudyDetail,
  routes.serviceDetail,
  routes.clientDetail,
  routes.partnerDetail,
  routes.teamDetail,
]);

const STATIC_PATHNAMES = new Set<StaticPathname>([
  routes.home,
  routes.blog,
  routes.caseStudies,
  routes.services,
  routes.clients,
  routes.partners,
  routes.links,
  routes.about,
  routes.contact,
  routes.privacy,
  routes.cookies,
  routes.legalNotice,
]);

function normalizeParams(params: Record<string, ParamsValue>) {
  return Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) => {
      if (typeof value === 'string') {
        return [[key, value]];
      }

      if (Array.isArray(value) && value[0]) {
        return [[key, value[0]]];
      }

      return [];
    }),
  );
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function isDynamicDetailPathname(pathname: string): pathname is DynamicDetailPathname {
  return DYNAMIC_DETAIL_PATHNAMES.has(pathname as DynamicDetailPathname);
}

function isStaticPathname(pathname: string): pathname is StaticPathname {
  return STATIC_PATHNAMES.has(pathname as StaticPathname);
}

export function FooterLocaleSelect() {
  const t = useTranslations('Footer');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isClient = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const normalizedParams = normalizeParams(params);

  async function resolveLocalizedRoute(nextLocale: Locale) {
    const response = await fetch('/api/locale-switch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pathname,
        currentLocale: locale,
        targetLocale: nextLocale,
        params: normalizedParams,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as LocaleSwitchResponse;
    return data.ok && data.route ? data.route : null;
  }

  function handleValueChange(nextLocale: string) {
    const targetLocale = nextLocale as Locale;

    if (!routing.locales.includes(targetLocale) || targetLocale === locale) {
      return;
    }

    startTransition(() => {
      void (async () => {
        if (isDynamicDetailPathname(pathname)) {
          const resolvedRoute = await resolveLocalizedRoute(targetLocale);

          if (!resolvedRoute) {
            return;
          }

          switch (resolvedRoute.pathname) {
            case routes.blogDetail:
            case routes.caseStudyDetail:
            case routes.serviceDetail:
            case routes.clientDetail:
            case routes.partnerDetail:
            case routes.teamDetail: {
              router.replace(
                {
                  pathname: resolvedRoute.pathname,
                  params: { slug: resolvedRoute.params.slug },
                },
                { locale: targetLocale, scroll: false },
              );
              return;
            }

            case routes.home:
            case routes.blog:
            case routes.caseStudies:
            case routes.services:
            case routes.clients:
            case routes.partners: {
              router.replace(
                {
                  pathname: resolvedRoute.pathname,
                },
                { locale: targetLocale, scroll: false },
              );
              return;
            }
          }

          return;
        }

        if (isStaticPathname(pathname)) {
          router.replace(
            {
              pathname,
            },
            { locale: targetLocale, scroll: false },
          );
        }
      })();
    });
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center gap-3 md:justify-end">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {t('language.label')}
        </span>

        <div className="h-10 w-[124px] shrink-0 rounded-2xl border border-white/10 bg-white/5" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 md:justify-end">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {t('language.label')}
      </span>

      <Select value={locale} onValueChange={handleValueChange} disabled={isPending}>
        <SelectTrigger
          aria-label={t('language.label')}
          className="h-10 w-[124px] rounded-2xl border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="min-w-[124px] rounded-2xl">
          {routing.locales.map((item) => (
            <SelectItem key={item} value={item} className="rounded-xl">
              {t(`language.options.${item}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
