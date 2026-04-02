'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isProd = process.env.NODE_ENV === 'production';

  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-16">
          <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
            Critical error
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-neutral-900">
            The application failed to load
          </h1>

          <p className="mt-3 max-w-prose text-base text-neutral-600">
            Refresh the page. If it keeps happening, it may be a temporary outage.
          </p>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Reload app
            </button>

            <Link
              href={'/'}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
            >
              Go to homepage
            </Link>
          </div>

          {!isProd ? (
            <pre className="mt-10 overflow-auto rounded-lg bg-neutral-950 p-4 text-xs text-neutral-100">
              {String(error?.stack ?? error?.message ?? error)}
            </pre>
          ) : null}
        </main>
      </body>
    </html>
  );
}
