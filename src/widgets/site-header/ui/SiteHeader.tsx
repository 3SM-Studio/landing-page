import { getLocale, getTranslations } from 'next-intl/server';
import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';
import type { Locale } from '@/shared/i18n/routing';
import { Link } from '@/shared/i18n/navigation';
import { routes } from '@/shared/lib/routes';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { BrandLogoLink } from '@/shared/ui/BrandLogoLink';

export async function SiteHeader() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const footerT = await getTranslations({ locale, namespace: 'Footer' });
  const siteConfig = await resolvePublicSiteConfig();

  return (
    <header className="sticky top-0 z-50 pt-[var(--header-top-gap)]">
      <Container>
        <nav
          aria-label={t('primaryNavigation')}
          className="glass-panel-luxe nav-blur flex min-h-[var(--header-height)] items-center justify-between rounded-3xl border border-white/10 px-4 py-3 lg:px-8 lg:py-4"
        >
          <BrandLogoLink
            shortName={siteConfig.shortName}
            svgLogo={siteConfig.seo?.organizationLogo}
            rasterLogo={siteConfig.seo?.organizationLogoFallback}
            variant="header"
            priority
          />

          <DesktopNav />

          <div className="hidden lg:block">
            <Button
              asChild
              variant="glossy"
              size="sm"
              className="px-6 text-xs uppercase tracking-[0.2em] lg:px-8"
            >
              <Link href={routes.contact}>{t('contact')}</Link>
            </Button>
          </div>

          <MobileNav
            shortName={siteConfig.shortName}
            eyebrow={footerT('eyebrow')}
            svgLogo={siteConfig.seo.organizationLogo}
            rasterLogo={siteConfig.seo.organizationLogoFallback}
          />
        </nav>
      </Container>
    </header>
  );
}
