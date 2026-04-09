import { Fragment } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from '@/shared/i18n/navigation';
import type { Locale } from '@/shared/i18n/routing';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/Breadcrumb';

type LinkHref = React.ComponentProps<typeof Link>['href'];

type BreadcrumbEntry = {
  label: string;
  href?: LinkHref;
};

type PageBreadcrumbsProps = {
  locale: Locale;
  items: BreadcrumbEntry[];
  homeLabel?: string;
  className?: string;
};

export function PageBreadcrumbs({
  locale,
  items,
  homeLabel,
  className = 'mb-10',
}: PageBreadcrumbsProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-sm text-slate-400">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              locale={locale}
              aria-label={homeLabel || (locale === 'pl' ? 'Strona główna' : 'Home')}
              className="inline-flex items-center text-slate-400 transition hover:text-white"
            >
              <FaHome className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <BreadcrumbSeparator className="text-slate-600" />

              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="capitalize text-white">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      locale={locale}
                      className="capitalize text-slate-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
