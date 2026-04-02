import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/navigation';
import { routes } from '@/shared/lib/routes';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export function SiteHeader() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 py-4 sm:py-6">
      <Container>
        <nav
          aria-label={t('primaryNavigation')}
          className="glass-panel-luxe nav-blur flex items-center justify-between rounded-3xl border border-white/10 px-4 py-3 lg:px-8 lg:py-4"
        >
          <Link href={routes.home} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-3sm-cyan to-3sm-teal text-xl font-bold text-white shadow-lg shadow-sky-500/40">
              3
            </div>

            <span className="text-2xl font-black tracking-tight text-white">SM</span>
          </Link>

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

          <MobileNav />
        </nav>
      </Container>
    </header>
  );
}
