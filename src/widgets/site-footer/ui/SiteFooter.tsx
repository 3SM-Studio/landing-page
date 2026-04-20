import { getLocale, getTranslations } from 'next-intl/server';
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { getLegalDocumentByType } from '@/entities/legal-document/api/legal-document.repository';
import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';
import type { Locale } from '@/shared/i18n/routing';
import { Link } from '@/shared/i18n/navigation';
import { routes } from '@/shared/lib/routes';
import { Container } from '@/shared/ui/Container';
import { Separator } from '@/shared/ui/Separator';

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

export async function SiteFooter() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: 'Footer' });
  const siteConfig = await resolvePublicSiteConfig();
  const currentYear = new Date().getFullYear();
  const displayCountryName = getDisplayCountryName(locale, siteConfig);
  const companyRows = buildCompanyRows(siteConfig);

  const [privacyDocument, cookiesDocument, legalNoticeDocument] = await Promise.all([
    getLegalDocumentByType(locale, 'privacy-policy'),
    getLegalDocumentByType(locale, 'cookies-policy'),
    getLegalDocumentByType(locale, 'legal-notice'),
  ]);

  const legalLinks: LegalFooterLink[] = [];

  if (privacyDocument) {
    legalLinks.push({
      key: 'privacy',
      href: routes.privacy,
    });
  }

  if (cookiesDocument) {
    legalLinks.push({
      key: 'cookies',
      href: routes.cookies,
    });
  }

  if (legalNoticeDocument) {
    legalLinks.push({
      key: 'legalNotice',
      href: routes.legalNotice,
    });
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
      key: 'discord',
      href: siteConfig.links.discord,
      icon: FaDiscord,
    },
  ].filter((item) => item.href);

  return (
    <footer className="relative">
      <Separator className="bg-white/5" />
      <Container>
        <div className="pb-16 pt-24 md:pt-28">
          <div className="mb-20 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-12 xl:gap-x-12 xl:gap-y-20">
            <div className="col-span-1 md:col-span-2 xl:col-span-4">
              <div className="mb-8 flex items-center gap-3 md:mb-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-3sm-cyan to-3sm-teal text-xl font-bold text-white shadow-lg shadow-sky-500/20">
                  3
                </div>

                <span className="text-3xl font-black tracking-tight text-white">
                  {siteConfig.shortName}
                </span>
              </div>

              <p className="mb-8 max-w-sm text-base font-medium leading-relaxed text-slate-500 md:mb-10 md:text-lg">
                {t('description')}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {socialLinks.map(({ key, href, icon: Icon }) => (
                  <a
                    key={key}
                    href={href}
                    aria-label={t(`social.${key}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel-luxe flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-colors hover:bg-slate-800 hover:text-3sm-cyan"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-1 xl:col-span-4">
              <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white md:mb-10 xl:mb-12">
                {t('contactTitle')}
              </p>

              <div className="space-y-6 text-sm text-slate-400">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    {t('contact.email')}
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-3sm-cyan"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    {t('contact.phone')}
                  </p>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="transition-colors hover:text-3sm-cyan"
                  >
                    {siteConfig.phone}
                  </a>
                </div>

                {siteConfig.address ? (
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
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

            <div className="col-span-1 xl:col-span-4">
              <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white md:mb-10 xl:mb-12">
                {t('companyTitle')}
              </p>

              <dl className="space-y-5 text-sm text-slate-400">
                {companyRows.map((row) => (
                  <div key={row.key}>
                    <dt className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                      {t(`company.${row.key}`)}
                    </dt>
                    <dd className="leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <Separator className="bg-white/5" />

          <div className="flex flex-col gap-6 pt-8 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 md:flex-row md:items-center md:justify-between md:pt-10 md:text-left">
            <div className="flex flex-col gap-2 md:flex-row">
              <p>
                &copy; {currentYear} {siteConfig.name}.
              </p>
              <p>{t('copyright')}</p>
            </div>

            {legalLinks.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:justify-end lg:gap-12">
                {legalLinks.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {t(`legal.${item.key}`)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
