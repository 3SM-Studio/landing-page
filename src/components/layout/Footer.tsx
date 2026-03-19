import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaYoutube, FaTiktok } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: FaInstagram,
  },
  {
    label: 'X',
    href: '#',
    icon: FaXTwitter,
  },
  {
    label: 'YouTube',
    href: '#',
    icon: FaYoutube,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: FaTiktok,
  },
] as const;

export function Footer() {
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

              <span className="text-3xl font-black tracking-tight text-white">
                SM
              </span>
            </div>

            <p className="mb-12 max-w-sm text-lg font-medium leading-relaxed text-slate-500">
              The multidisciplinary studio for brands that refuse to be
              forgotten. Engineering icons through the synthesis of motion,
              image, and code.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
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
              Navigation
            </h5>

            <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-slate-500">
              <li>
                <Link
                  href="#portfolio"
                  className="transition-colors hover:text-3sm-cyan"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-3sm-cyan"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#studio"
                  className="transition-colors hover:text-3sm-cyan"
                >
                  About Studio
                </Link>
              </li>
              <li>
                <Link
                  href="#global-presence"
                  className="transition-colors hover:text-3sm-cyan"
                >
                  Global Presence
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4" id="global-presence">
            <h5 className="mb-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white">
              Nodes
            </h5>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                  Jaworzno, PL
                </p>
                <p className="text-[11px] font-medium leading-relaxed text-slate-500">
                  Ul. Gliniana 14
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 md:flex-row">
          <p>&copy; {currentYear} 3SM Studio. All Errors Reserved :]</p>

          <div className="mt-8 flex gap-12 md:mt-0">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
