'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/shared/i18n/navigation';
import { routing, type Locale } from '@/shared/i18n/routing';
import { routes } from '@/shared/lib/routes';
import { cn } from '@/shared/lib/utils';

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

type LocaleSwitchResponse = {
  ok: boolean;
  route?: LocaleSwitchResolvedRoute;
  message?: string;
};

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
  ) as Record<string, string>;
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

async function resolveLocalizedRoute(
  pathname: string,
  currentLocale: Locale,
  targetLocale: Locale,
  params: Record<string, string>,
) {
  const response = await fetch('/api/locale-switch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pathname, currentLocale, targetLocale, params }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as LocaleSwitchResponse;
  return data.ok && data.route ? data.route : null;
}

export function FooterLocaleSelect() {
  const t = useTranslations('Footer');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const normalizedParams = normalizeParams(params);

  function replaceStaticPath(targetLocale: Locale, targetPathname: StaticPathname) {
    router.replace({ pathname: targetPathname }, { locale: targetLocale, scroll: false });
  }

  function replaceDynamicPath(
    targetLocale: Locale,
    targetPathname: DynamicDetailPathname,
    slug: string,
  ) {
    router.replace(
      { pathname: targetPathname, params: { slug } },
      { locale: targetLocale, scroll: false },
    );
  }

  function handleValueChange(nextLocale: Locale) {
    if (!routing.locales.includes(nextLocale) || nextLocale === locale) {
      return;
    }

    startTransition(() => {
      void (async () => {
        if (isDynamicDetailPathname(pathname)) {
          const resolvedRoute = await resolveLocalizedRoute(
            pathname,
            locale,
            nextLocale,
            normalizedParams,
          );
          if (resolvedRoute && 'params' in resolvedRoute) {
            replaceDynamicPath(nextLocale, resolvedRoute.pathname, resolvedRoute.params.slug);
            return;
          }

          switch (pathname) {
            case routes.blogDetail:
              replaceStaticPath(nextLocale, routes.blog);
              return;
            case routes.caseStudyDetail:
              replaceStaticPath(nextLocale, routes.caseStudies);
              return;
            case routes.serviceDetail:
              replaceStaticPath(nextLocale, routes.services);
              return;
            case routes.clientDetail:
              replaceStaticPath(nextLocale, routes.clients);
              return;
            case routes.partnerDetail:
              replaceStaticPath(nextLocale, routes.partners);
              return;
            case routes.teamDetail:
              replaceStaticPath(nextLocale, routes.home);
              return;
          }
        }

        if (isStaticPathname(pathname)) {
          replaceStaticPath(nextLocale, pathname);
          return;
        }

        replaceStaticPath(nextLocale, routes.home);
      })();
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-xl border border-white/8 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
      aria-label={t('language.label')}
      role="group"
    >
      <span className="sr-only">{t('language.label')}</span>
      {routing.locales.map((item) => {
        const isActive = item === locale;
        return (
          <button
            key={item}
            type="button"
            onClick={() => handleValueChange(item)}
            aria-pressed={isActive}
            aria-label={t(`language.options.${item}`)}
            disabled={isPending}
            className={cn(
              'min-w-11 rounded-lg px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.22em] transition-all duration-200',
              'disabled:pointer-events-none disabled:opacity-60',
              isActive
                ? 'bg-3sm-cyan text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.28)]'
                : 'text-white/45 hover:text-white',
            )}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
