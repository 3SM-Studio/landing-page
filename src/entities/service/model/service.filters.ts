import type { Service, LinkedService } from './service.types';

export type ServiceFilterItem = {
  key: string;
  label: string;
};

type BuildServiceFiltersOptions = {
  allLabel: string;
  allKey?: string;
};

type ServiceFilterSource = Pick<Service, 'serviceKey' | 'title'> | LinkedService;

export function buildServiceFilters(
  services: readonly ServiceFilterSource[],
  options: BuildServiceFiltersOptions,
): ServiceFilterItem[] {
  const allKey = options.allKey ?? 'all';
  const seen = new Set<string>();

  const normalizedServices = services.filter((service) => {
    const serviceKey = service.serviceKey?.trim();
    const title = service.title?.trim();

    if (!serviceKey || !title || seen.has(serviceKey)) {
      return false;
    }

    seen.add(serviceKey);
    return true;
  });

  return [
    {
      key: allKey,
      label: options.allLabel,
    },
    ...normalizedServices.map((service) => ({
      key: service.serviceKey,
      label: service.title,
    })),
  ];
}

export function resolveActiveServiceKey(
  rawServiceKey: string | undefined,
  filters: readonly ServiceFilterItem[],
  allKey = 'all',
) {
  if (!rawServiceKey) {
    return allKey;
  }

  const allowedKeys = new Set(filters.map((filter) => filter.key));
  return allowedKeys.has(rawServiceKey) ? rawServiceKey : allKey;
}
