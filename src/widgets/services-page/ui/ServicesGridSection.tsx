import { Link } from '@/shared/i18n/navigation';
import type { Service } from '@/entities/service/model/service.types';

type ServicesGridSectionProps = {
  items: Service[];
};

export function ServicesGridSection({ items }: ServicesGridSectionProps) {
  return (
    <section className="py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="glass-card-premium rounded-[40px] p-10">
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>

            {item.shortDescription ? (
              <p className="mt-4 text-slate-300">{item.shortDescription}</p>
            ) : null}

            {item.deliverables?.length ? (
              <ul className="mt-6 space-y-2 text-sm text-slate-400">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable}>- {deliverable}</li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8">
              <Link href={{ pathname: '/services/[slug]', params: { slug: item.slug } }}>
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
