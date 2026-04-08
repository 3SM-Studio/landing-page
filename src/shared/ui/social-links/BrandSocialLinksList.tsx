import type { ComponentType } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import {
  BRAND_SOCIAL_LINK_KEYS,
  normalizeBrandSocialLinks,
  type BrandSocialLinks,
  type BrandSocialLinkKey,
} from '@/shared/model/social-links';

const SOCIAL_LINK_LABELS: Record<BrandSocialLinkKey, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  x: 'X',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

const SOCIAL_LINK_ICONS: Record<BrandSocialLinkKey, ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

type BrandSocialLinksListProps = {
  links?: BrandSocialLinks;
};

export function BrandSocialLinksList({ links }: BrandSocialLinksListProps) {
  const normalizedLinks = normalizeBrandSocialLinks(links);

  if (!normalizedLinks) {
    return null;
  }

  const entries = BRAND_SOCIAL_LINK_KEYS.flatMap((key) => {
    const href = normalizedLinks[key];

    if (!href) {
      return [];
    }

    return [
      {
        key,
        href,
        label: SOCIAL_LINK_LABELS[key],
        Icon: SOCIAL_LINK_ICONS[key],
      },
    ];
  });

  if (!entries.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {entries.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
