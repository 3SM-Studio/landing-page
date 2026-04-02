import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ContactSection } from '@/widgets/home-contact-cta/ui/ContactCtaSection';
import { HeroSection } from '@/widgets/home-hero/ui/HeroSection';
import { PortfolioSection } from '@/widgets/home-portfolio/ui/PortfolioSection';
import { ProcessSection } from '@/widgets/home-process/ui/ProcessSection';
import { ServicesSection } from '@/widgets/home-services/ui/ServicesSection';
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

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StudioSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
