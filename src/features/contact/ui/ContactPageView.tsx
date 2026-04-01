import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/shared/i18n/routing';
import { Container } from '@/shared/ui/Container';
import { ContactForm } from './ContactForm';
import { ContactHero } from './ContactHero';
import { ContactSidebar } from './ContactSidebar';

type ContactPageViewProps = {
  locale: Locale;
};

export async function ContactPageView({ locale }: ContactPageViewProps) {
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return (
    <section className="relative -mt-(--header-offset) pb-40 pt-48">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.10),transparent_30%)]" />

      <Container>
        <ContactHero
          badge={t('badge')}
          titleStart={t('titleStart')}
          titleAccent={t('titleAccent')}
          description={t('description')}
        />

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <ContactForm locale={locale} />
          <ContactSidebar locale={locale} />
        </div>
      </Container>
    </section>
  );
}
