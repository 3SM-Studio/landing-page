import { setRequestLocale } from 'next-intl/server';
import { ContactSection } from '@/features/home/ui/ContactCtaSection';
import { HeroSection } from '@/features/home/ui/HeroSection';
import { PortfolioSection } from '@/features/home/ui/PortfolioSection';
import { ProcessSection } from '@/features/home/ui/ProcessSection';
import { ServicesSection } from '@/features/home/ui/ServicesSection';
import { StudioSection } from '@/features/home/ui/StudioSection';
import { type Locale, routing } from '@/shared/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

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
