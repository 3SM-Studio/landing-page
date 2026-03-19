import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const alt = siteConfig.socialImageAlt;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 52%, #111827 100%)',
        color: 'white',
        padding: '64px',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 28,
          opacity: 0.78,
          letterSpacing: 4,
        }}
      >
        <div>{siteConfig.name.toUpperCase()}</div>
        <div>{siteConfig.location.city}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -2,
          }}
        >
          {siteConfig.socialImageTitle}
        </div>

        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            opacity: 0.84,
            maxWidth: 820,
          }}
        >
          {siteConfig.socialImageSubtitle}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 24,
          opacity: 0.66,
        }}
      >
        <div>{siteConfig.domain}</div>
        <div>Content - Visuals - Digital</div>
      </div>
    </div>,
    size,
  );
}
