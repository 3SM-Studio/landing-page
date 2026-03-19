import { ContactSection } from '@/components/sections/ContactSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StudioSection } from '@/components/sections/StudioSection';

export default function HomePage() {
  return (
    <main className="relative z-0">
      <HeroSection />
      <ServicesSection />
      <StudioSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
