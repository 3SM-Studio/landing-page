import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { client } from '@/shared/sanity/client';

const builder = createImageUrlBuilder(client);

function unwrapImageSource(source: SanityImageSource) {
  if (source && typeof source === 'object' && 'image' in source) {
    const nestedSource = (source as { image?: SanityImageSource | null }).image;

    if (nestedSource) {
      return nestedSource;
    }
  }

  return source;
}

export function urlFor(source: SanityImageSource) {
  return builder.image(unwrapImageSource(source));
}
