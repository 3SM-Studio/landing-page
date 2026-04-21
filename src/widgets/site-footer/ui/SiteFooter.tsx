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

function buildCompanyRows(siteConfig: Awaited<ReturnType<typeof resolvePublicSiteConfig>>) {
  const company = siteConfig.company;

  return [
    {
      key: 'legalName',
      value: siteConfig.legalName,
    },
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
  const companyRows = buildCompanyRows(siteConfig);

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
    <footer className="relative overflow-hidden">
      <Separator className="bg-white/5" />

      <Container>
        <div className="pb-12 pt-20 md:pb-14 md:pt-24 xl:pb-16 xl:pt-28">
          <div className="mb-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:mb-16 xl:grid-cols-12 xl:gap-x-12 xl:gap-y-14">
            <div className="col-span-1 md:col-span-2 xl:col-span-4">
              <div className="mb-6 md:mb-7">
                <BrandLogoLink
                  shortName={siteConfig.shortName}
                  svgLogo={siteConfig.seo?.organizationLogo}
                  rasterLogo={siteConfig.seo?.organizationLogoFallback}
                  variant="footer"
                  priority
                />
              </div>

              <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
                {t('description')}
              </p>

              {socialLinks.length > 0 ? (
                <div className="mt-8 md:mt-10">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-900 dark:text-white">
                    {t('socialTitle')}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    {visibleSocialLinks.map(({ key, href, icon: Icon }) => (
                      <a
                        key={key}
                        href={href}
                        aria-label={t(`social.${key}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-panel-luxe flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/70 text-slate-700 transition-colors hover:bg-slate-100 hover:text-3sm-cyan dark:border-white/10 dark:text-white/70 dark:hover:bg-slate-800"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    ))}

                    {shouldShowAllLinks ? (
                      <a
                        href={routes.links}
                        aria-label={t('allLinks')}
                        title={t('allLinks')}
                        className="glass-panel-luxe flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/70 text-slate-700 transition-colors hover:bg-slate-100 hover:text-3sm-cyan dark:border-white/10 dark:text-white/70 dark:hover:bg-slate-800"
                      >
                        <FaLink className="h-4.5 w-4.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-span-1 xl:col-span-2">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-900 dark:text-white md:mb-8 xl:mb-10">
                {t('exploreTitle')}
              </p>

              <nav aria-label={t('exploreTitle')}>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  {exploreLinks.map((link) => (
                    <li key={link.key}>
                      <Link href={link.href} className="transition-colors hover:text-3sm-cyan">
                        {t(`explore.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="col-span-1 xl:col-span-3">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-900 dark:text-white md:mb-8 xl:mb-10">
                {t('contactTitle')}
              </p>

              <div className="space-y-6 text-sm text-slate-600 dark:text-slate-400">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
                    {t('contact.email')}
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex break-all transition-colors hover:text-3sm-cyan"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
                    {t('contact.phone')}
                  </p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="inline-flex transition-colors hover:text-3sm-cyan"
                  >
                    {siteConfig.phone}
                  </a>
                </div>

                {siteConfig.address ? (
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
                      {t('contact.address')}
                    </p>

                    <p className="leading-relaxed">
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
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-900 dark:text-white md:mb-8 xl:mb-10">
                {t('companyTitle')}
              </p>

              <dl className="space-y-5 text-sm text-slate-600 dark:text-slate-400">
                {companyRows.map((row) => (
                  <div key={row.key}>
                    <dt className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
                      {t(`company.${row.key}`)}
                    </dt>
                    <dd className="break-words leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <Separator className="bg-slate-200/70 dark:bg-white/5" />

          <div className="flex flex-col gap-5 pt-6 text-center text-xs text-slate-500 md:pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:text-left">
              <div className="space-y-1">
                <p className="font-medium text-slate-700 dark:text-slate-400">
                  &copy; {currentYear} {siteConfig.name}
                </p>
                <p>{t('copyright')}</p>
              </div>

              <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-end">
                {legalLinks.length > 0 ? (
                  <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 md:justify-end md:gap-6">
                    {legalLinks.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="transition-colors hover:text-slate-900 dark:hover:text-white"
                      >
                        {t(`legal.${item.key}`)}
                      </Link>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <FooterLocaleSelect />
                  <FooterThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
