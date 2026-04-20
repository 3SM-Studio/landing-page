import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ContactSection } from '@/widgets/home-contact-cta/ui/ContactCtaSection';
import { getTrustedClients } from '@/entities/client/api/client.repository';
import { HeroSection } from '@/widgets/home-hero/ui/HeroSection';
import { PortfolioSection } from '@/widgets/home-portfolio/ui/PortfolioSection';
import { ProcessSection } from '@/widgets/home-process/ui/ProcessSection';
import { ServicesSection } from '@/widgets/home-services/ui/ServicesSection';
import { TrustedBySection } from '@/widgets/home-trusted-by/ui/TrustedBySection';
import { StudioSection } from '@/widgets/home-studio/ui/StudioSection';
import { type Locale, routing } from '@/shared/i18n/routing';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const resolvedLocale = locale as Locale;
  const trustedClients = await getTrustedClients(resolvedLocale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StudioSection />
      <TrustedBySection locale={resolvedLocale} clients={trustedClients} />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
