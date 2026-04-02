'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Container } from '@/shared/ui/Container';

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isProd = process.env.NODE_ENV === 'production';

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-60 w-60 rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute -left-10 top-0 select-none font-display text-[10rem] font-black leading-none text-white/[0.03] sm:text-[14rem]">
          500
        </div>
      </div>

      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-3sm-cyan">
              Something went wrong
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Unexpected error
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Something broke on our side. Try again. If the problem keeps showing up, go back to
              the homepage and try from there.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-3sm-cyan px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:opacity-95"
              >
                Try again
              </button>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Go to homepage
              </Link>
            </div>

            {!isProd ? (
              <div className="mt-10 rounded-2xl border border-red-500/20 bg-black/40 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300/80">
                  Debug
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-white/75">
                  {String(error?.stack ?? error?.message ?? error)}
                </pre>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
