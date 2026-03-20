import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { navItems } from '@/lib/data/site-content';
import { Button } from '../ui/Button';
import { routes } from '@/lib/routes';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-6">
      <Container>
        <nav className="glass-panel-luxe nav-blur flex items-center justify-between rounded-3xl px-6 py-4 md:px-8">
          <Link href={routes.home} className="flex items-center gap-3" aria-label="3SM home">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-3sm-cyan to-3sm-teal text-xl font-bold text-white shadow-lg shadow-sky-500/40">
              3
            </div>

            <span className="text-2xl font-black tracking-tight text-white">SM</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-3sm-cyan"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button
            asChild
            variant="glossy"
            size="sm"
            className="rounded-2xl! px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] md:px-8"
          >
            <Link href={routes.contact}>Start Project</Link>
          </Button>
        </nav>
      </Container>
    </header>
  );
}
