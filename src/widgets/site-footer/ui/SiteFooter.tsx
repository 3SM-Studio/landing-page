import { getLocale, getTranslations } from 'next-intl/server';
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLink,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import { getClients } from '@/entities/client/api/client.repository';
import { getLegalDocumentByType } from '@/entities/legal-document/api/legal-document.repository';
import { getPartners } from '@/entities/partner/api/partner.repository';
import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';
import type { Locale } from '@/shared/i18n/routing';
import { Link } from '@/shared/i18n/navigation';
import { routes } from '@/shared/lib/routes';
import { Container } from '@/shared/ui/Container';
import { Separator } from '@/shared/ui/Separator';
import { FooterLocaleSelect } from './FooterLocaleSelect';
import { FooterThemeToggle } from './FooterThemeToggle';
import { BrandLogoLink } from '@/shared/ui/BrandLogoLink';

const MAX_FOOTER_SOCIAL_LINKS = 5;

function getDisplayCountryName(
  locale: Locale,
  siteConfig: Awaited<ReturnType<typeof resolvePublicSiteConfig>>,
) {
  const countryCode = siteConfig.address?.addressCountry;

  if (countryCode) {
    try {
      const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
      const localizedCountry = displayNames.of(countryCode);

      if (localizedCountry) {
        return localizedCountry;
      }
    } catch {
      // fallback niżej
    }
  }

  return siteConfig.location.country;
}

function buildRegistryRows(siteConfig: Awaited<ReturnType<typeof resolvePublicSiteConfig>>) {
  const company = siteConfig.company;

  return [
    {
      key: 'nip',
      value: company?.nip || company?.taxId || company?.vatId,
    },
    {
      key: 'regon',
      value: company?.regon,
    },
    {
      key: 'krs',
      value: company?.krs || company?.registrationNumber,
    },
  ].filter((item) => item.value?.trim());
}

type LegalFooterLink =
  | { key: 'privacy'; href: typeof routes.privacy }
  | { key: 'cookies'; href: typeof routes.cookies }
  | { key: 'legalNotice'; href: typeof routes.legalNotice };

type ExploreFooterLink =
  | { key: 'services'; href: typeof routes.services }
  | { key: 'caseStudies'; href: typeof routes.caseStudies }
  | { key: 'clients'; href: typeof routes.clients }
  | { key: 'partners'; href: typeof routes.partners }
  | { key: 'about'; href: typeof routes.about }
  | { key: 'blog'; href: typeof routes.blog }
  | { key: 'contact'; href: typeof routes.contact };

export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: 'Footer' });
  const siteConfig = await resolvePublicSiteConfig();
  const currentYear = new Date().getFullYear();
  const displayCountryName = getDisplayCountryName(locale, siteConfig);
  const registryRows = buildRegistryRows(siteConfig);

  const [privacyDocument, cookiesDocument, legalNoticeDocument, clients, partners] =
    await Promise.all([
      getLegalDocumentByType(locale, 'privacy-policy'),
      getLegalDocumentByType(locale, 'cookies-policy'),
      getLegalDocumentByType(locale, 'legal-notice'),
      getClients(locale),
      getPartners(locale),
    ]);

  const legalLinks: LegalFooterLink[] = [];

  if (privacyDocument) {
    legalLinks.push({ key: 'privacy', href: routes.privacy });
  }

  if (cookiesDocument) {
    legalLinks.push({ key: 'cookies', href: routes.cookies });
  }

  if (legalNoticeDocument) {
    legalLinks.push({ key: 'legalNotice', href: routes.legalNotice });
  }

  const socialLinks = [
    {
      key: 'instagram',
      href: siteConfig.links.instagram,
      icon: FaInstagram,
    },
    {
      key: 'x',
      href: siteConfig.links.x,
      icon: FaXTwitter,
    },
    {
      key: 'youtube',
      href: siteConfig.links.youtube,
      icon: FaYoutube,
    },
    {
      key: 'tiktok',
      href: siteConfig.links.tiktok,
      icon: FaTiktok,
    },
    {
      key: 'facebook',
      href: siteConfig.links.facebook,
      icon: FaFacebook,
    },
    {
      key: 'linkedin',
      href: siteConfig.links.linkedin,
      icon: FaLinkedin,
    },
    {
      key: 'discord',
      href: siteConfig.links.discord,
      icon: FaDiscord,
    },
  ].filter((item) => item.href);

  const visibleSocialLinks = socialLinks.slice(0, MAX_FOOTER_SOCIAL_LINKS);
  const shouldShowAllLinks = socialLinks.length > MAX_FOOTER_SOCIAL_LINKS;

  const exploreLinks: ExploreFooterLink[] = [
    { key: 'services', href: routes.services },
    { key: 'caseStudies', href: routes.caseStudies },
    ...(clients.length > 0 ? [{ key: 'clients', href: routes.clients } as const] : []),
    ...(partners.length > 0 ? [{ key: 'partners', href: routes.partners } as const] : []),
    { key: 'blog', href: routes.blog },
    { key: 'about', href: routes.about },
    { key: 'contact', href: routes.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#05102a]">
      <Container>
        <div className="pb-10 pt-20 md:pb-12 md:pt-24 xl:pb-14 xl:pt-28">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-12 xl:gap-x-14 xl:gap-y-16">
            <div className="col-span-1 md:col-span-2 xl:col-span-4">
              <BrandLogoLink
                shortName={siteConfig.shortName}
                svgLogo={siteConfig.seo.organizationLogo}
                rasterLogo={siteConfig.seo.organizationLogoFallback}
                className="inline-flex w-fit shrink-0 flex-none leading-none"
                imageClassName="block h-9 w-auto shrink-0 object-contain md:h-10"
                textClassName="text-[2rem] sm:text-[2.25rem]"
              />

              <p className="mt-8 max-w-[26rem] text-lg font-light leading-[1.65] tracking-[-0.03em] text-slate-300 md:text-[1.2rem]">
                {t('description')}
              </p>

              {socialLinks.length > 0 ? (
                <div className="mt-10">
                  <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/35">
                    {t('socialTitle')}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {visibleSocialLinks.map(({ key, href, icon: Icon }) => (
                      <a
                        key={key}
                        href={href}
                        aria-label={t(`social.${key}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03] text-slate-400 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.08] hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}

                    {shouldShowAllLinks ? (
                      <Link
                        href={routes.links}
                        aria-label={t('allLinks')}
                        title={t('allLinks')}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03] text-slate-400 transition-all duration-200 hover:border-3sm-cyan/30 hover:bg-white/[0.08] hover:text-3sm-cyan"
                      >
                        <FaLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-span-1 xl:col-span-2 xl:pl-4">
              <p className="mb-8 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/35">
                {t('exploreTitle')}
              </p>

              <nav aria-label={t('exploreTitle')}>
                <ul className="space-y-[1.125rem] text-[1.05rem] font-medium tracking-[-0.02em] text-slate-300">
                  {exploreLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="inline-flex transition-colors duration-200 hover:text-white"
                      >
                        {t(`explore.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="col-span-1 xl:col-span-3 @container">
              <p className="mb-8 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/35">
                {t('contactTitle')}
              </p>

              <div className="space-y-9">
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">
                    {t('contact.email')}
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block w-full min-w-0 text-[clamp(1rem,7cqw,1.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white transition-colors [overflow-wrap:anywhere] hover:text-3sm-cyan"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">
                    {t('contact.phone')}
                  </p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="block w-full min-w-0 text-[clamp(1rem,7cqw,1.75rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white transition-colors [overflow-wrap:anywhere] hover:text-3sm-cyan"
                  >
                    {siteConfig.phone}
                  </a>
                </div>

                {siteConfig.address ? (
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">
                      {t('contact.address')}
                    </p>

                    <p className="text-base font-medium leading-relaxed text-slate-300">
                      {siteConfig.address.streetAddress ? (
                        <>
                          {siteConfig.address.streetAddress}
                          <br />
                        </>
                      ) : null}
                      {siteConfig.address.postalCode ? `${siteConfig.address.postalCode} ` : ''}
                      {siteConfig.address.addressLocality}
                      {siteConfig.address.addressRegion
                        ? `, ${siteConfig.address.addressRegion}`
                        : ''}
                      <br />
                      {displayCountryName}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-span-1 xl:col-span-3">
              <p className="mb-8 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/35">
                {t('companyTitle')}
              </p>

              <div className="rounded-2xl border border-white/6 bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <p className="mb-5 text-sm font-bold text-white">{siteConfig.legalName}</p>

                <dl className="space-y-3">
                  {registryRows.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em]"
                    >
                      <dt className="text-white/28">{t(`company.${row.key}`)}</dt>
                      <dd className="font-semibold text-slate-200">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {legalLinks.length > 0 ? (
                <div className="mt-8 space-y-3 pl-1">
                  {legalLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="group flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-white/32 transition-colors duration-200 hover:text-3sm-cyan"
                    >
                      <span>{t(`legal.${item.key}`)}</span>
                      <span className="translate-x-0 text-xs opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <Separator className="mt-16 bg-white/5" />

          <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/34">
              &copy; {currentYear} {siteConfig.name} · {t('copyright')}
            </p>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <FooterLocaleSelect />
              <FooterThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
