import { PageTopScene } from '../PageTopScene';
import { cn } from '@/shared/lib/utils';

type PageTopSectionProps = {
  children: React.ReactNode;
  className?: string;
  sceneVariant?: 'cyan' | 'violet' | 'mixed';
};

export function PageTopSection({
  children,
  className,
  sceneVariant = 'mixed',
}: PageTopSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden -mt-(--header-total-offset) pt-(--header-total-offset)',
        className,
      )}
    >
      <PageTopScene variant={sceneVariant} />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
