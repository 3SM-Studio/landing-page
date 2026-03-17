import { SiteHeader } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StudioSection } from '@/components/sections/StudioSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SiteFooter } from '@/components/layout/Footer';

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
