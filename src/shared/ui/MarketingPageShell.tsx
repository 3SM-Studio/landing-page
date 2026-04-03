import type { ReactNode } from 'react';
import { Container } from '@/shared/ui/Container';
import { PageTopSection } from './page-top-section/PageTopSection';

type MarketingPageShellProps = {
  children: ReactNode;
};

export function MarketingPageShell({ children }: MarketingPageShellProps) {
  return (
    <PageTopSection className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <Container className="relative z-10">{children}</Container>
    </PageTopSection>
  );
}
