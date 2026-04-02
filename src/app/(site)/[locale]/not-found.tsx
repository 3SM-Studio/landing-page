import { getTranslations } from 'next-intl/server';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/navigation';
import { routes } from '@/shared/lib/routes';

export default async function NotFoundPage() {
  const t = await getTranslations('Common');

  return (
    <Container className="flex flex-1 items-center py-32">
      <div className="mx-auto max-w-2xl rounded-[40px] border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-sm md:p-14">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-3sm-cyan">404</p>
        <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
          {t('notFoundTitle')}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-300">
          {t('notFoundDescription')}
        </p>
        <Button asChild size="lg">
          <Link href={routes.home}>{t('backToHome')}</Link>
        </Button>
      </div>
    </Container>
  );
}
