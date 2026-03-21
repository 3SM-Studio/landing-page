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
    <footer className="relative border-t border-white/5 px-6 pb-16 pt-32">
      <Container>
        <div className="mb-32 grid grid-cols-1 gap-20 md:grid-cols-12">
          <div className="col-span-1 md:col-span-5">
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-3sm-cyan to-3sm-teal text-xl font-bold text-white shadow-lg shadow-sky-500/20">
                3
              </div>

              <span className="text-3xl font-black tracking-tight text-white">SM</span>
            </div>

            <p className="mb-12 max-w-sm text-lg font-medium leading-relaxed text-slate-500">
              {t('description')}
            </p>

            <div className="flex items-center gap-4">
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

          <div className="col-span-1 md:col-span-3">
            <h5 className="mb-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white">
              {t('navigationTitle')}
            </h5>

            <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-slate-500">
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

          <div className="col-span-1 md:col-span-4" id="global-presence">
            <h5 className="mb-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white">
              {t('nodesTitle')}
            </h5>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
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

        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 md:flex-row">
          <p>
            &copy; {currentYear} 3SM Studio. {t('copyright')}
          </p>

          <div className="mt-8 flex gap-12 md:mt-0">
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
