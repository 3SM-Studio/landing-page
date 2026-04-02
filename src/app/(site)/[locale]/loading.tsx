import { Container } from '@/shared/ui/Container';

export default function LocaleLoadingPage() {
  return (
    <Container className="flex flex-1 items-center justify-center py-32">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-3sm-cyan" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Loading</p>
      </div>
    </Container>
  );
}
