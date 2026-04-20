import { groq } from 'next-sanity';

const localizedImageProjection = `{
  image{
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    }
  },
  alt,
  caption
}`;

export const STATIC_PAGE_BY_KEY_QUERY = groq`
  *[
    _type == "staticPage" &&
    pageKey == $pageKey &&
    isActive == true &&
    contentStatus == "ready"
  ][0]{
    pageKey,
    title,
    eyebrow,
    hero{
      badge,
      title,
      description,
      primaryCta{
        label,
        href,
        openInNewTab
      },
      secondaryCta{
        label,
        href,
        openInNewTab
      }
    },
    heroSummary,
    intro,
    showPageNavigation,
    sections[]{
      key,
      variant,
      eyebrow,
      title,
      summary,
      body,
      highlights,
      showInPageNavigation,
      items[]{
        key,
        eyebrow,
        title,
        subtitle,
        summary,
        listItems,
        href,
        isHighlighted
      }
    },
    seo{
      title,
      description,
      noIndex,
      keywords,
      "ogImage": ogImage${localizedImageProjection}
    }
  }
`;
