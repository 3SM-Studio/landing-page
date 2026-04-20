import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/shared/i18n/routing';
import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';
import { LocationMapSection } from './LocationMapSection';

type ContactSidebarProps = {
  locale: Locale;
};

export async function ContactSidebar({ locale }: ContactSidebarProps) {
  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale, namespace: 'ContactPage' }),
    resolvePublicSiteConfig(),
  ]);

  return (
    <aside className="space-y-14 lg:col-span-5">
      <div className="glass-card-premium rounded-[40px] border border-white/5 p-10">
        <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.4em] text-3sm-cyan">
          {t('sidebarHeading')}
        </span>

        <p className="mb-8 text-lg font-medium leading-relaxed text-slate-400">
          {t('sidebarText')}
        </p>

        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-3sm-cyan">
            {t('emailLabel')}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-display text-2xl font-bold text-white underline decoration-3sm-cyan/30 underline-offset-8 transition-colors hover:text-3sm-cyan md:text-4xl"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>

      <LocationMapSection />
    </aside>
  );
}
