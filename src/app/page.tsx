import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/Footer';
import { SiteHeader } from '@/components/layout/Header';
import { ContactSection } from '@/components/sections/ContactSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StudioSection } from '@/components/sections/StudioSection';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Video, Foto i Strony Internetowe',
  description:
    '3SM tworzy video, zdjęcia, social content i nowoczesne strony internetowe dla marek, twórców i firm.',
  canonical: routes.home,
});

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main className="relative z-0">
        <HeroSection />
        <ServicesSection />
        <StudioSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
