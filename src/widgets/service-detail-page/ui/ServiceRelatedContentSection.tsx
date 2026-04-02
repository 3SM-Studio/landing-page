import { Link } from '@/shared/i18n/navigation';
import type { Locale, AppPathname } from '@/shared/i18n/routing';
import type { ServiceLinkedItem } from '@/entities/service/model/service.types';

type ServiceRelatedContentSectionProps = {
  locale: Locale;
  title: string;
  emptyLabel: string;
  viewLabel: string;
  items?: ServiceLinkedItem[];
  hrefPathname: Extract<AppPathname, '/case-studies/[slug]'>;
};

export function ServiceRelatedContentSection({
  locale,
  title,
  emptyLabel,
  viewLabel,
  items,
  hrefPathname,
}: ServiceRelatedContentSectionProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-semibold text-white">{title}</h2>

      {items?.length ? (
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item._id}
              className="rounded-[24px] border border-white/10 bg-black/20 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>

              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              ) : null}

              <div className="mt-4">
                <Link
                  href={{ pathname: hrefPathname, params: { slug: item.slug } }}
                  locale={locale}
                  className="inline-flex items-center text-sm font-medium text-sky-300 transition hover:text-white"
                >
                  {viewLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-slate-400">{emptyLabel}</p>
      )}
    </section>
  );
}
