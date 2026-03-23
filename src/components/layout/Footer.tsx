import { useTranslations } from 'next-intl';
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/navigation';
import { routes } from '@/lib/routes';
import { siteConfig } from '@/lib/site-config';

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
] as const;

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 pb-16 pt-24 md:pt-28">
      <Container>
        <div className="mb-20 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 xl:mb-32 xl:grid-cols-12 xl:gap-x-12 xl:gap-y-20">
          <div className="col-span-1 md:col-span-2 xl:col-span-5">
            <div className="mb-8 flex items-center gap-3 md:mb-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-3sm-cyan to-3sm-teal text-xl font-bold text-white shadow-lg shadow-sky-500/20">
                3
              </div>

              <span className="text-3xl font-black tracking-tight text-white">SM</span>
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
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 xl:col-span-3">
            <h5 className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white md:mb-10 xl:mb-12">
              {t('navigationTitle')}
            </h5>

            <ul className="space-y-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 md:space-y-6">
              <li>
                <a href="#portfolio" className="transition-colors hover:text-3sm-cyan">
                  {t('navigation.portfolio')}
                </a>
              </li>
              <li>
                <a href="#services" className="transition-colors hover:text-3sm-cyan">
                  {t('navigation.services')}
                </a>
              </li>
              <li>
                <a href="#studio" className="transition-colors hover:text-3sm-cyan">
                  {t('navigation.aboutStudio')}
                </a>
              </li>
              <li>
                <a href="#global-presence" className="transition-colors hover:text-3sm-cyan">
                  {t('navigation.globalPresence')}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 xl:col-span-4" id="global-presence">
            <h5 className="mb-8 text-[10px] font-bold uppercase tracking-[0.35em] text-white md:mb-10 xl:mb-12">
              {t('nodesTitle')}
            </h5>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-2 xl:gap-10">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {siteConfig.address?.addressLocality}, {siteConfig.address?.addressCountry}
                </p>
                <p className="text-[11px] font-medium leading-relaxed text-slate-500">
                  {siteConfig.address?.streetAddress} <br />
                  {siteConfig.address?.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/5 pt-8 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 md:pt-10 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="flex flex-col gap-2">
            <p>&copy; {currentYear} 3SM Studio.</p>
            <p>{t('copyright')}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:justify-end lg:gap-12">
            <Link href={routes.privacy} className="transition-colors hover:text-white">
              {t('legal.privacy')}
            </Link>
            <Link href={routes.terms} className="transition-colors hover:text-white">
              {t('legal.terms')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
