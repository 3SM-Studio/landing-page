export const BRAND_SOCIAL_LINK_KEYS = [
  'instagram',
  'facebook',
  'x',
  'linkedin',
  'youtube',
  'tiktok',
] as const;

export type BrandSocialLinkKey = (typeof BRAND_SOCIAL_LINK_KEYS)[number];

export type BrandSocialLinks = Partial<Record<BrandSocialLinkKey, string>>;

export function isBrandSocialLinkKey(value: string): value is BrandSocialLinkKey {
  return (BRAND_SOCIAL_LINK_KEYS as readonly string[]).includes(value);
}

export function normalizeBrandSocialLinks(
  links?: Partial<Record<string, string | null | undefined>> | null,
) {
  if (!links) {
    return undefined;
  }

  const normalized: BrandSocialLinks = {};

  for (const [key, value] of Object.entries(links)) {
    if (!isBrandSocialLinkKey(key)) {
      continue;
    }

    const href = value?.trim();

    if (!href) {
      continue;
    }

    normalized[key] = href;
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function hasAnyBrandSocialLink(links?: BrandSocialLinks) {
  return Boolean(normalizeBrandSocialLinks(links));
}
